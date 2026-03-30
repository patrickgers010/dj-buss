import 'package:flutter/material.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:flutter_stripe/flutter_stripe.dart';

class StripeService {
  final FirebaseFunctions _functions =
      FirebaseFunctions.instanceFor(region: 'europe-west1');

  /// Create a PaymentIntent and present the Stripe payment sheet.
  /// Returns true if payment succeeded, false if cancelled/failed.
  Future<bool> purchaseTicket({
    required String ticketTypeId,
    required int quantity,
  }) async {
    // 1. Call Cloud Function to create PaymentIntent
    final result = await _functions
        .httpsCallable('createPaymentIntent')
        .call({
      'ticketTypeId': ticketTypeId,
      'quantity': quantity,
    });

    final data = result.data as Map<String, dynamic>;
    final clientSecret = data['clientSecret'] as String;

    // 2. Initialize the payment sheet
    await Stripe.instance.initPaymentSheet(
      paymentSheetParameters: SetupPaymentSheetParameters(
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'FEEST by Swopster Gatherings',
        style: ThemeMode.dark,
        appearance: const PaymentSheetAppearance(
          colors: PaymentSheetAppearanceColors(
            background: Color(0xFF080810),
            primary: Color(0xFFa855f7),
            componentBackground: Color(0xFF10101C),
            componentText: Color(0xFFe2e8f0),
            placeholderText: Color(0xFF6b7280),
            icon: Color(0xFFa855f7),
          ),
          shapes: PaymentSheetShape(
            borderRadius: 12,
            shadow: PaymentSheetShadowParams(color: Color(0x00000000)),
          ),
          primaryButton: PaymentSheetPrimaryButtonAppearance(
            colors: PaymentSheetPrimaryButtonTheme(
              light: PaymentSheetPrimaryButtonThemeColors(
                background: Color(0xFFa855f7),
                text: Color(0xFFFFFFFF),
              ),
              dark: PaymentSheetPrimaryButtonThemeColors(
                background: Color(0xFFa855f7),
                text: Color(0xFFFFFFFF),
              ),
            ),
          ),
        ),
      ),
    );

    // 3. Present the payment sheet to the user
    try {
      await Stripe.instance.presentPaymentSheet();
      // Payment succeeded — webhook will create the ticket in Firestore
      return true;
    } on StripeException catch (e) {
      if (e.error.code == FailureCode.Canceled) {
        // User cancelled
        return false;
      }
      rethrow;
    }
  }

  /// Transfer a ticket to another user
  Future<String> transferTicket({
    required String ticketId,
    required String recipientEmail,
  }) async {
    final result = await _functions
        .httpsCallable('transferTicket')
        .call({
      'ticketId': ticketId,
      'recipientEmail': recipientEmail,
    });

    return (result.data as Map<String, dynamic>)['message'] as String;
  }
}
