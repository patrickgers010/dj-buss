import 'package:flutter/material.dart';

// ─── Brand Colors ──────────────────────────────────────────────────────────
class AppColors {
  AppColors._();

  // Backgrounds
  static const Color background   = Color(0xFF080810);
  static const Color card         = Color(0xFF10101C);
  static const Color card2        = Color(0xFF14141F);
  static const Color surface      = Color(0xFF1A1A2E);

  // Neon accents
  static const Color neonPurple   = Color(0xFFa855f7);
  static const Color neonBlue     = Color(0xFF3b82f6);
  static const Color neonPink     = Color(0xFFec4899);
  static const Color neonCyan     = Color(0xFF22d3ee);
  static const Color neonAmber    = Color(0xFFf59e0b);

  // Text
  static const Color textPrimary  = Color(0xFFe2e8f0);
  static const Color textSecondary = Color(0xFF9ca3af);
  static const Color textMuted    = Color(0xFF6b7280);

  // Gradients
  static const LinearGradient gradientPurpleBlue = LinearGradient(
    colors: [neonPurple, neonBlue],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient gradientFeest = LinearGradient(
    colors: [neonPink, neonPurple, neonAmber],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient gradientPink = LinearGradient(
    colors: [neonPink, neonPurple],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}

// ─── Spacing ──────────────────────────────────────────────────────────────
class AppSpacing {
  AppSpacing._();

  static const double xs   = 4;
  static const double sm   = 8;
  static const double md   = 16;
  static const double lg   = 24;
  static const double xl   = 32;
  static const double xxl  = 48;
}

// ─── Border Radius ────────────────────────────────────────────────────────
class AppRadius {
  AppRadius._();

  static const double sm   = 8;
  static const double md   = 12;
  static const double lg   = 16;
  static const double xl   = 24;
  static const double pill = 100;
}

// ─── Routes ───────────────────────────────────────────────────────────────
class AppRoutes {
  AppRoutes._();

  static const String splash      = '/';
  static const String login       = '/login';
  static const String register    = '/register';
  static const String feed        = '/feed';
  static const String events      = '/events';
  static const String eventDetail = '/events/:id';
  static const String feest       = '/feest';
  static const String artists     = '/artists';
  static const String artistDetail = '/artists/:id';
  static const String tickets     = '/tickets';
  static const String checkout    = '/checkout';
  static const String myTickets   = '/my-tickets';
  static const String community   = '/community';
  static const String profile     = '/profile';
}

// ─── Stripe ───────────────────────────────────────────────────────────────
class StripeConfig {
  StripeConfig._();

  // Replace with your actual publishable key
  static const String publishableKey =
      'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY';
}

// ─── Deep Links ───────────────────────────────────────────────────────────
class DeepLinks {
  DeepLinks._();

  static const String swopsterApp     = 'swopster://app';
  static const String swopsterWebsite = 'https://swopster.nl';
}

// ─── Dummy / Seed Data ────────────────────────────────────────────────────
class AppAssets {
  AppAssets._();

  static const String logo         = 'assets/images/feest_logo.png';
  static const String splashAnim   = 'assets/animations/splash.json';
  static const String placeholder  = 'assets/images/placeholder.png';
}
