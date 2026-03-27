import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants.dart';
import '../../widgets/bottom_nav.dart';

class AppShell extends StatelessWidget {
  final Widget child;

  const AppShell({super.key, required this.child});

  int _currentIndex(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;
    if (location.startsWith(AppRoutes.feed)) return 0;
    if (location.startsWith(AppRoutes.events)) return 1;
    if (location.startsWith(AppRoutes.feest)) return 2;
    if (location.startsWith(AppRoutes.tickets) || location.startsWith(AppRoutes.myTickets)) return 3;
    if (location.startsWith(AppRoutes.profile)) return 4;
    return 0;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: child,
      bottomNavigationBar: AppBottomNav(
        currentIndex: _currentIndex(context),
      ),
    );
  }
}
