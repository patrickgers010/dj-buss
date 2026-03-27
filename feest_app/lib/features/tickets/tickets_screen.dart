import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants.dart';
import '../../models/ticket.dart';
import '../../widgets/neon_button.dart';
import '../../widgets/neon_card.dart';
import '../../widgets/gradient_text.dart';

class TicketsScreen extends StatelessWidget {
  const TicketsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final tickets = TicketType.samplesFeest3;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Tickets'),
        actions: [
          TextButton.icon(
            onPressed: () => context.go(AppRoutes.myTickets),
            icon: const Icon(Icons.confirmation_num, size: 16, color: AppColors.neonPurple),
            label: const Text('Mijn tickets', style: TextStyle(color: AppColors.neonPurple, fontSize: 13)),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.md),
        children: [
          // Event header
          Container(
            padding: const EdgeInsets.all(AppSpacing.lg),
            decoration: BoxDecoration(
              gradient: AppColors.gradientFeest,
              borderRadius: BorderRadius.circular(AppRadius.xl),
              boxShadow: [
                BoxShadow(
                  color: AppColors.neonPink.withOpacity(0.3),
                  blurRadius: 20,
                  offset: const Offset(0, 6),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text('TICKETS VOOR', style: TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.w600, letterSpacing: 1)),
                SizedBox(height: 4),
                Text('FEEST Edition 3', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 24, letterSpacing: -0.5)),
                SizedBox(height: 6),
                Text('📅 Datum TBA  ·  📍 Locatie TBA  ·  18+', style: TextStyle(color: Colors.white70, fontSize: 12)),
              ],
            ),
          ),

          const SizedBox(height: AppSpacing.xl),

          const Text(
            'KIES JE TICKET',
            style: TextStyle(
              color: AppColors.neonPurple,
              fontSize: 11,
              fontWeight: FontWeight.w700,
              letterSpacing: 2,
            ),
          ),

          const SizedBox(height: AppSpacing.md),

          // Ticket options
          ...tickets.map((ticket) => Padding(
            padding: const EdgeInsets.only(bottom: AppSpacing.md),
            child: _TicketCard(ticket: ticket),
          )),

          const SizedBox(height: AppSpacing.xl),

          // Payment info
          NeonCard(
            padding: const EdgeInsets.all(AppSpacing.md),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Icon(Icons.lock_outline, size: 14, color: AppColors.neonPurple),
                    SizedBox(width: 6),
                    Text(
                      'Veilig betalen via Stripe',
                      style: TextStyle(
                        color: AppColors.textPrimary,
                        fontWeight: FontWeight.w700,
                        fontSize: 13,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppSpacing.sm),
                const Text(
                  'We accepteren iDEAL, creditcard, Apple Pay en Google Pay. Je ticket wordt direct na betaling zichtbaar in de app.',
                  style: TextStyle(color: AppColors.textMuted, fontSize: 12, height: 1.5),
                ),
                const SizedBox(height: AppSpacing.md),
                Wrap(
                  spacing: 8,
                  children: ['iDEAL', 'Visa', 'Mastercard', 'Apple Pay', 'Google Pay'].map((m) =>
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.card2,
                        borderRadius: BorderRadius.circular(AppRadius.sm),
                        border: Border.all(color: const Color(0x1Affffff)),
                      ),
                      child: Text(m, style: const TextStyle(color: AppColors.textSecondary, fontSize: 11, fontWeight: FontWeight.w600)),
                    ),
                  ).toList(),
                ),
              ],
            ),
          ),

          const SizedBox(height: AppSpacing.xxl),
        ],
      ),
    );
  }
}

class _TicketCard extends StatelessWidget {
  final TicketType ticket;

  const _TicketCard({required this.ticket});

  @override
  Widget build(BuildContext context) {
    final bool isEarlyBird = ticket.id == 'early-bird';
    final int? remaining = ticket.remaining;
    final bool almostGone = remaining != null && remaining <= 20;

    return NeonCard(
      borderColor: isEarlyBird
          ? AppColors.neonPink.withOpacity(0.5)
          : AppColors.neonPurple.withOpacity(0.2),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          ticket.name,
                          style: const TextStyle(
                            color: AppColors.textPrimary,
                            fontWeight: FontWeight.w800,
                            fontSize: 17,
                          ),
                        ),
                        if (isEarlyBird) ...[
                          const SizedBox(width: 8),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              gradient: AppColors.gradientPink,
                              borderRadius: BorderRadius.circular(AppRadius.pill),
                            ),
                            child: const Text(
                              'HOT',
                              style: TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w800),
                            ),
                          ),
                        ],
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(
                      ticket.description,
                      style: const TextStyle(color: AppColors.textMuted, fontSize: 12),
                    ),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  GradientText.purpleBlue(
                    '€${ticket.price.toStringAsFixed(2)}',
                    style: const TextStyle(
                      fontWeight: FontWeight.w900,
                      fontSize: 22,
                    ),
                  ),
                  const Text('p.p.', style: TextStyle(color: AppColors.textMuted, fontSize: 11)),
                ],
              ),
            ],
          ),

          // Perks
          if (ticket.perks.isNotEmpty) ...[
            const SizedBox(height: AppSpacing.md),
            Wrap(
              spacing: 6,
              runSpacing: 4,
              children: ticket.perks.map((perk) => Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.check_circle, color: AppColors.neonPurple, size: 13),
                  const SizedBox(width: 4),
                  Text(perk, style: const TextStyle(color: AppColors.textSecondary, fontSize: 12)),
                ],
              )).toList(),
            ),
          ],

          const SizedBox(height: AppSpacing.md),

          Row(
            children: [
              if (remaining != null) ...[
                Text(
                  almostGone
                      ? '⚡ Nog $remaining beschikbaar!'
                      : '$remaining beschikbaar',
                  style: TextStyle(
                    color: almostGone ? AppColors.neonPink : AppColors.textMuted,
                    fontSize: 12,
                    fontWeight: almostGone ? FontWeight.w700 : FontWeight.w400,
                  ),
                ),
                const Spacer(),
              ] else
                const Spacer(),

              NeonButton(
                label: 'Koop nu',
                variant: isEarlyBird ? NeonButtonVariant.pink : NeonButtonVariant.filled,
                onPressed: ticket.isAvailable
                    ? () => context.push('${AppRoutes.checkout}?ticketId=${ticket.id}')
                    : null,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
