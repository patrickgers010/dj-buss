import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants.dart';
import '../../models/event.dart';
import '../../widgets/neon_button.dart';

class EventDetailScreen extends StatelessWidget {
  final String eventId;

  const EventDetailScreen({super.key, required this.eventId});

  @override
  Widget build(BuildContext context) {
    final event = Event.samples.firstWhere(
      (e) => e.id == eventId,
      orElse: () => Event.samples.first,
    );

    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 220,
            pinned: true,
            backgroundColor: AppColors.background,
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: BoxDecoration(
                  gradient: event.isUpcoming
                      ? AppColors.gradientFeest
                      : AppColors.gradientPurpleBlue,
                ),
                child: Center(
                  child: Text(
                    event.name,
                    style: const TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 72,
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                      letterSpacing: -2,
                    ),
                  ),
                ),
              ),
            ),
          ),

          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.md),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header
                  Row(
                    children: [
                      Text(
                        '${event.name} — ${event.edition}',
                        style: const TextStyle(
                          color: AppColors.textPrimary,
                          fontWeight: FontWeight.w900,
                          fontSize: 22,
                        ),
                      ),
                      const Spacer(),
                      if (event.isUpcoming)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppColors.neonPink.withOpacity(0.15),
                            borderRadius: BorderRadius.circular(AppRadius.pill),
                            border: Border.all(color: AppColors.neonPink.withOpacity(0.4)),
                          ),
                          child: const Text(
                            'Upcoming',
                            style: TextStyle(
                              color: AppColors.neonPink,
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.sm),

                  Text(
                    event.description,
                    style: const TextStyle(
                      color: AppColors.textSecondary,
                      fontSize: 15,
                      height: 1.6,
                    ),
                  ),

                  const SizedBox(height: AppSpacing.lg),
                  const Divider(color: Color(0x1Affffff)),
                  const SizedBox(height: AppSpacing.md),

                  // Info grid
                  Row(
                    children: [
                      _InfoChip(icon: Icons.calendar_today_outlined, label: event.date != null ? '${event.date!.day}/${event.date!.month}/${event.date!.year}' : 'Datum TBA'),
                      const SizedBox(width: AppSpacing.sm),
                      _InfoChip(icon: Icons.location_on_outlined, label: event.venue ?? 'Locatie TBA'),
                    ],
                  ),

                  if (event.isUpcoming) ...[
                    const SizedBox(height: AppSpacing.xl),
                    NeonButton(
                      label: 'Koop Tickets',
                      variant: NeonButtonVariant.pink,
                      fullWidth: true,
                      onPressed: () => context.push('${AppRoutes.checkout}?ticketId=early-bird'),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    NeonButton(
                      label: 'Meer info over FEEST',
                      variant: NeonButtonVariant.outline,
                      fullWidth: true,
                      onPressed: () => context.go(AppRoutes.feest),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _InfoChip extends StatelessWidget {
  final IconData icon;
  final String label;

  const _InfoChip({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(AppRadius.md),
        border: Border.all(color: const Color(0x1Affffff)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 13, color: AppColors.neonPurple),
          const SizedBox(width: 6),
          Text(label, style: const TextStyle(color: AppColors.textSecondary, fontSize: 12)),
        ],
      ),
    );
  }
}
