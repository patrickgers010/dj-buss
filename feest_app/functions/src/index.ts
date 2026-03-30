import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

admin.initializeApp();
const db = admin.firestore();

// ── Stripe initialization ─────────────────────────────────────
// Set your Stripe secret key in Firebase config:
// firebase functions:config:set stripe.secret_key="sk_test_..."
// firebase functions:config:set stripe.webhook_secret="whsec_..."
const stripe = new Stripe(
  functions.config().stripe?.secret_key || "sk_test_PLACEHOLDER",
  { apiVersion: "2023-10-16" }
);

// ─────────────────────────────────────────────────────────────
// 1. CREATE PAYMENT INTENT
//    Called by the Flutter app when user wants to buy a ticket.
// ─────────────────────────────────────────────────────────────
export const createPaymentIntent = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    // Require authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Je moet ingelogd zijn om tickets te kopen."
      );
    }

    const { ticketTypeId, quantity } = data;

    if (!ticketTypeId || !quantity || quantity < 1 || quantity > 8) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Ongeldig ticket type of aantal (max 8)."
      );
    }

    // Fetch ticket type from Firestore
    const ticketDoc = await db.collection("ticketTypes").doc(ticketTypeId).get();
    if (!ticketDoc.exists) {
      throw new functions.https.HttpsError("not-found", "Ticket type niet gevonden.");
    }

    const ticketData = ticketDoc.data()!;

    // Check availability
    if (!ticketData.isAvailable) {
      throw new functions.https.HttpsError(
        "unavailable",
        "Dit ticket type is niet meer beschikbaar."
      );
    }

    const remaining = ticketData.totalAvailable - ticketData.sold;
    if (remaining < quantity) {
      throw new functions.https.HttpsError(
        "resource-exhausted",
        `Slechts ${remaining} tickets beschikbaar.`
      );
    }

    // Calculate amount in cents
    const unitPrice = ticketData.price as number;
    const amountCents = Math.round(unitPrice * 100 * quantity);

    // Get or create Stripe customer
    const userId = context.auth.uid;
    let customerId: string;

    const customerDoc = await db.collection("stripeCustomers").doc(userId).get();
    if (customerDoc.exists) {
      customerId = customerDoc.data()!.stripeCustomerId;
    } else {
      const userDoc = await db.collection("users").doc(userId).get();
      const userData = userDoc.data();
      const customer = await stripe.customers.create({
        email: userData?.email || "",
        name: userData?.displayName || "",
        metadata: { firebaseUid: userId },
      });
      customerId = customer.id;
      await db.collection("stripeCustomers").doc(userId).set({
        stripeCustomerId: customerId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "eur",
      customer: customerId,
      payment_method_types: ["card", "ideal"],
      metadata: {
        firebaseUid: userId,
        ticketTypeId: ticketTypeId,
        eventId: ticketData.eventId,
        quantity: String(quantity),
        unitPrice: String(unitPrice),
      },
      description: `FEEST – ${ticketData.name} × ${quantity}`,
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amountCents,
      currency: "eur",
    };
  });

// ─────────────────────────────────────────────────────────────
// 2. STRIPE WEBHOOK
//    Handles payment confirmation and creates tickets.
// ─────────────────────────────────────────────────────────────
export const stripeWebhook = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret = functions.config().stripe?.webhook_secret || "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle payment_intent.succeeded
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const metadata = paymentIntent.metadata;

      const userId = metadata.firebaseUid;
      const ticketTypeId = metadata.ticketTypeId;
      const eventId = metadata.eventId;
      const quantity = parseInt(metadata.quantity || "1", 10);
      const unitPrice = parseFloat(metadata.unitPrice || "0");

      // Fetch event and ticket type names
      const [eventDoc, ticketTypeDoc] = await Promise.all([
        db.collection("events").doc(eventId).get(),
        db.collection("ticketTypes").doc(ticketTypeId).get(),
      ]);

      const eventName = eventDoc.data()?.name || "FEEST";
      const eventEdition = eventDoc.data()?.edition || "";
      const ticketTypeName = ticketTypeDoc.data()?.name || "Ticket";

      // Create individual tickets
      const batch = db.batch();
      const ticketIds: string[] = [];

      for (let i = 0; i < quantity; i++) {
        const ticketId = uuidv4();
        const qrCode = `FEEST-${eventId.toUpperCase()}-${ticketId.substring(0, 8).toUpperCase()}`;

        const ticketRef = db.collection("purchasedTickets").doc(ticketId);
        batch.set(ticketRef, {
          userId,
          ticketTypeId,
          eventId,
          eventName: `${eventName} ${eventEdition}`.trim(),
          ticketTypeName,
          pricePaid: unitPrice,
          purchasedAt: admin.firestore.FieldValue.serverTimestamp(),
          qrCode,
          isUsed: false,
          isTransferable: true,
          stripePaymentIntentId: paymentIntent.id,
        });

        ticketIds.push(ticketId);
      }

      // Update sold count on ticket type
      const ticketTypeRef = db.collection("ticketTypes").doc(ticketTypeId);
      batch.update(ticketTypeRef, {
        sold: admin.firestore.FieldValue.increment(quantity),
      });

      // Update user's purchased ticket IDs
      const userRef = db.collection("users").doc(userId);
      batch.update(userRef, {
        purchasedTicketIds: admin.firestore.FieldValue.arrayUnion(...ticketIds),
      });

      await batch.commit();

      console.log(
        `✅ Created ${quantity} ticket(s) for user ${userId}, event ${eventId}`
      );

      // Create notification
      await db.collection("notifications").add({
        userId,
        title: "Ticket gekocht! 🎉",
        body: `Je ${ticketTypeName} ticket${quantity > 1 ? "s zijn" : " is"} klaar voor ${eventName} ${eventEdition}.`,
        type: "ticket_purchased",
        data: { eventId, ticketIds },
        isRead: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    // Handle payment_intent.payment_failed
    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error(
        `❌ Payment failed for ${paymentIntent.metadata.firebaseUid}:`,
        paymentIntent.last_payment_error?.message
      );
    }

    res.status(200).json({ received: true });
  });

// ─────────────────────────────────────────────────────────────
// 3. VALIDATE TICKET (for door scanning)
//    Called by the scanner app at the event entrance.
// ─────────────────────────────────────────────────────────────
export const validateTicket = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    // Only admins can validate tickets
    if (!context.auth) {
      throw new functions.https.HttpsError("unauthenticated", "Niet ingelogd.");
    }

    const adminDoc = await db.collection("admins").doc(context.auth.uid).get();
    if (!adminDoc.exists) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Alleen admins kunnen tickets scannen."
      );
    }

    const { qrCode } = data;
    if (!qrCode) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "QR code is vereist."
      );
    }

    // Find ticket by QR code
    const ticketQuery = await db
      .collection("purchasedTickets")
      .where("qrCode", "==", qrCode)
      .limit(1)
      .get();

    if (ticketQuery.empty) {
      return { valid: false, message: "Ongeldig ticket — niet gevonden." };
    }

    const ticketDoc = ticketQuery.docs[0];
    const ticketData = ticketDoc.data();

    if (ticketData.isUsed) {
      return {
        valid: false,
        message: "Ticket al gebruikt.",
        usedAt: ticketData.usedAt?.toDate?.()?.toISOString(),
      };
    }

    // Mark ticket as used
    await ticketDoc.ref.update({
      isUsed: true,
      usedAt: admin.firestore.FieldValue.serverTimestamp(),
      scannedBy: context.auth.uid,
    });

    return {
      valid: true,
      message: "✅ Welkom bij FEEST!",
      ticket: {
        eventName: ticketData.eventName,
        ticketType: ticketData.ticketTypeName,
        userName: ticketData.userId,
      },
    };
  });

// ─────────────────────────────────────────────────────────────
// 4. TRANSFER TICKET
//    User can transfer a ticket to another user by email.
// ─────────────────────────────────────────────────────────────
export const transferTicket = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError("unauthenticated", "Niet ingelogd.");
    }

    const { ticketId, recipientEmail } = data;

    // Get ticket
    const ticketDoc = await db.collection("purchasedTickets").doc(ticketId).get();
    if (!ticketDoc.exists) {
      throw new functions.https.HttpsError("not-found", "Ticket niet gevonden.");
    }

    const ticketData = ticketDoc.data()!;

    // Verify ownership
    if (ticketData.userId !== context.auth.uid) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Dit is niet jouw ticket."
      );
    }

    if (!ticketData.isTransferable) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Dit ticket is niet overdraagbaar."
      );
    }

    if (ticketData.isUsed) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Gebruikt ticket kan niet worden overgedragen."
      );
    }

    // Find recipient
    const recipientQuery = await db
      .collection("users")
      .where("email", "==", recipientEmail)
      .limit(1)
      .get();

    if (recipientQuery.empty) {
      throw new functions.https.HttpsError(
        "not-found",
        "Gebruiker met dit e-mailadres niet gevonden in de app."
      );
    }

    const recipientDoc = recipientQuery.docs[0];
    const recipientId = recipientDoc.id;

    if (recipientId === context.auth.uid) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Je kunt niet naar jezelf overdragen."
      );
    }

    // Transfer
    const batch = db.batch();

    // Update ticket owner
    batch.update(ticketDoc.ref, {
      userId: recipientId,
      transferredFrom: context.auth.uid,
      transferredAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Update sender's ticket list
    batch.update(db.collection("users").doc(context.auth.uid), {
      purchasedTicketIds: admin.firestore.FieldValue.arrayRemove(ticketId),
    });

    // Update recipient's ticket list
    batch.update(db.collection("users").doc(recipientId), {
      purchasedTicketIds: admin.firestore.FieldValue.arrayUnion(ticketId),
    });

    await batch.commit();

    // Notify recipient
    await db.collection("notifications").add({
      userId: recipientId,
      title: "Ticket ontvangen! 🎟️",
      body: `Je hebt een ${ticketData.ticketTypeName} ticket ontvangen voor ${ticketData.eventName}.`,
      type: "ticket_transferred",
      data: { ticketId },
      isRead: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, message: "Ticket succesvol overgedragen!" };
  });
