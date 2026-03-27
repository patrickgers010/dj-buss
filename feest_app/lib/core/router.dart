import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../features/splash/splash_screen.dart';
import '../features/auth/login_screen.dart';
import '../features/auth/register_screen.dart';
import '../features/shell/app_shell.dart';
import '../features/feed/feed_screen.dart';
import '../features/events/events_screen.dart';
import '../features/events/event_detail_screen.dart';
import '../features/feest/feest_screen.dart';
import '../features/artists/artists_screen.dart';
import '../features/artists/artist_detail_screen.dart';
import '../features/tickets/tickets_screen.dart';
import '../features/tickets/checkout_screen.dart';
import '../features/tickets/my_tickets_screen.dart';
import '../features/community/community_screen.dart';
import '../features/profile/profile_screen.dart';
import 'constants.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();
final _shellNavigatorKey = GlobalKey<NavigatorState>();

final appRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: AppRoutes.splash,
  routes: [
    // ── Full-screen routes (no shell) ─────────────────────────
    GoRoute(
      path: AppRoutes.splash,
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: AppRoutes.login,
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: AppRoutes.register,
      builder: (context, state) => const RegisterScreen(),
    ),
    GoRoute(
      path: AppRoutes.checkout,
      builder: (context, state) {
        final ticketId = state.uri.queryParameters['ticketId'] ?? '';
        return CheckoutScreen(ticketTypeId: ticketId);
      },
    ),

    // ── Shell with bottom nav ─────────────────────────────────
    ShellRoute(
      navigatorKey: _shellNavigatorKey,
      builder: (context, state, child) => AppShell(child: child),
      routes: [
        GoRoute(
          path: AppRoutes.feed,
          builder: (context, state) => const FeedScreen(),
        ),
        GoRoute(
          path: AppRoutes.events,
          builder: (context, state) => const EventsScreen(),
          routes: [
            GoRoute(
              path: ':id',
              builder: (context, state) =>
                  EventDetailScreen(eventId: state.pathParameters['id']!),
            ),
          ],
        ),
        GoRoute(
          path: AppRoutes.feest,
          builder: (context, state) => const FeestScreen(),
        ),
        GoRoute(
          path: AppRoutes.artists,
          builder: (context, state) => const ArtistsScreen(),
          routes: [
            GoRoute(
              path: ':id',
              builder: (context, state) =>
                  ArtistDetailScreen(artistId: state.pathParameters['id']!),
            ),
          ],
        ),
        GoRoute(
          path: AppRoutes.tickets,
          builder: (context, state) => const TicketsScreen(),
        ),
        GoRoute(
          path: AppRoutes.myTickets,
          builder: (context, state) => const MyTicketsScreen(),
        ),
        GoRoute(
          path: AppRoutes.community,
          builder: (context, state) => const CommunityScreen(),
        ),
        GoRoute(
          path: AppRoutes.profile,
          builder: (context, state) => const ProfileScreen(),
        ),
      ],
    ),
  ],
);
