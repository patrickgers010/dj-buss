import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
// Uncomment after running: flutterfire configure
// import 'firebase_options.dart';
import 'core/constants.dart';
import 'app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Lock to portrait mode
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  // Transparent status bar
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.light,
    systemNavigationBarColor: Color(0xFF10101C),
    systemNavigationBarIconBrightness: Brightness.light,
  ));

  // ── Firebase ───────────────────────────────────────────────
  // Uncomment after running: flutterfire configure
  // await Firebase.initializeApp(
  //   options: DefaultFirebaseOptions.currentPlatform,
  // );

  // ── Stripe ─────────────────────────────────────────────────
  // Uncomment after adding your Stripe publishable key in constants.dart
  // Stripe.publishableKey = StripeConfig.publishableKey;
  // Stripe.merchantIdentifier = 'merchant.nl.swopster.feest';
  // await Stripe.instance.applySettings();

  runApp(
    const ProviderScope(
      child: FeestApp(),
    ),
  );
}
