# FEEST App — Setup & Deploy Instructies

## Vereisten

- Flutter SDK 3.x: https://flutter.dev/docs/get-started/install
- Node.js 18: https://nodejs.org
- Firebase CLI: `npm install -g firebase-tools`
- Stripe account: https://stripe.com
- Apple Developer Program ($99/jaar) — voor iOS
- Google Play Console ($25 eenmalig) — voor Android

---

## Stap 1: Firebase Project Aanmaken

1. Ga naar [console.firebase.google.com](https://console.firebase.google.com)
2. Klik **"Project toevoegen"** → noem het `feest-app`
3. Schakel **Google Analytics** in (optioneel)
4. Open het project

### Firebase services activeren:
- **Authentication** → Sign-in method → Schakel **Email/Password** in
- **Cloud Firestore** → Database aanmaken → Start in **production mode**
- **Storage** → Activeer Storage
- **Functions** → Upgrade naar Blaze plan (pay-as-you-go, gratis tier beschikbaar)

### Flutter koppelen:
```bash
# Installeer FlutterFire CLI
dart pub global activate flutterfire_cli

# Configureer (in feest_app/ map)
flutterfire configure --project=feest-app
```
Dit genereert automatisch `firebase_options.dart`, `google-services.json` en `GoogleService-Info.plist`.

### Update main.dart:
Uncomment de Firebase initialisatie regels in `lib/main.dart`.

---

## Stap 2: Firestore Data Seeden

```bash
# Installeer seed tool
npm install -g node-firestore-import-export

# Seed de database
firestore-import --accountCredentials serviceAccount.json --backupFile seed_firestore.json
```

Of handmatig via Firebase Console → Firestore → collections aanmaken.

### Firestore regels deployen:
```bash
cd feest_app
firebase deploy --only firestore:rules,firestore:indexes,storage
```

---

## Stap 3: Stripe Configureren

1. Maak een account op [stripe.com](https://stripe.com)
2. Activeer **iDEAL** onder Payment methods → Settings
3. Kopieer je keys:

```bash
# Stel Stripe keys in voor Cloud Functions
firebase functions:config:set stripe.secret_key="sk_test_xxx"
firebase functions:config:set stripe.webhook_secret="whsec_xxx"
```

4. Update `lib/core/constants.dart` met je **publishable key**:
```dart
static const String publishableKey = 'pk_test_xxx';
```

5. Maak een Stripe webhook aan:
   - Endpoint: `https://europe-west1-feest-app.cloudfunctions.net/stripeWebhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`

---

## Stap 4: Cloud Functions Deployen

```bash
cd feest_app/functions
npm install
npm run build
cd ..
firebase deploy --only functions
```

---

## Stap 5: App Lokaal Testen

```bash
cd feest_app
flutter pub get
flutter run
```

### Met Firebase Emulator (lokaal testen):
```bash
firebase emulators:start
# Flutter app verbinden met emulators (uncomment in main.dart)
```

---

## Stap 6: iOS Deployen (TestFlight)

### Vereisten:
- Mac met Xcode 15+
- Apple Developer Program lidmaatschap

### Stappen:
```bash
# 1. Open iOS project in Xcode
open ios/Runner.xcworkspace

# 2. Stel in Xcode:
#    - Bundle Identifier: nl.swopster.feest
#    - Team: jouw Apple Developer account
#    - Signing: Automatic

# 3. Build voor release
flutter build ios --release

# 4. Archive in Xcode
#    Product → Archive → Distribute App → App Store Connect

# 5. Ga naar App Store Connect → TestFlight
#    Voeg beta testers toe via e-mail
```

---

## Stap 7: Android Deployen (Google Play)

### Signing key aanmaken:
```bash
keytool -genkey -v -keystore feest-upload-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias feest-key
```

### Key properties:
Maak `android/key.properties`:
```properties
storePassword=<wachtwoord>
keyPassword=<wachtwoord>
keyAlias=feest-key
storeFile=../../feest-upload-key.jks
```

### Build:
```bash
flutter build appbundle --release
```

### Upload:
1. Ga naar [play.google.com/console](https://play.google.com/console)
2. Maak een nieuwe app "FEEST"
3. Upload de `.aab` file
4. Vul store listing in
5. Start intern test track → publiceer

---

## Nuttige Commando's

```bash
# Lokaal draaien
flutter run

# Release build iOS
flutter build ios --release

# Release build Android
flutter build appbundle --release

# Firebase deployen
firebase deploy

# Alleen functions deployen
firebase deploy --only functions

# Logs bekijken
firebase functions:log

# Stripe webhook testen
stripe listen --forward-to localhost:5001/feest-app/europe-west1/stripeWebhook
```

---

## Configuratie Checklist

- [ ] Firebase project aangemaakt
- [ ] FlutterFire CLI geconfigureerd
- [ ] Email/Password auth ingeschakeld
- [ ] Firestore database aangemaakt
- [ ] Firestore regels gedeployed
- [ ] Storage geactiveerd
- [ ] Blaze plan geactiveerd (voor Functions)
- [ ] Stripe account aangemaakt
- [ ] iDEAL geactiveerd in Stripe
- [ ] Stripe keys in Firebase config
- [ ] Stripe publishable key in constants.dart
- [ ] Stripe webhook aangemaakt
- [ ] Cloud Functions gedeployed
- [ ] Seed data geladen
- [ ] App getest op emulator
- [ ] iOS: Apple Developer account + TestFlight upload
- [ ] Android: Play Console + intern test track
