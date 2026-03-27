import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants.dart';
import '../../widgets/neon_button.dart';
import '../../widgets/gradient_text.dart';
import '../../widgets/neon_card.dart';

class FeestScreen extends StatelessWidget {
  const FeestScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        slivers: [
          // ── Hero ──────────────────────────────────────────────
          SliverToBoxAdapter(
            child: Container(
              height: 340,
              decoration: const BoxDecoration(color: AppColors.background),
              child: Stack(
                children: [
                  // Glow orbs
                  Positioned(
                    top: 40,
                    left: 20,
                    child: Container(
                      width: 180,
                      height: 180,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        boxShadow: [BoxShadow(color: AppColors.neonPink.withOpacity(0.25), blurRadius: 120, spreadRadius: 30)],
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 20,
                    right: 20,
                    child: Container(
                      width: 140,
                      height: 140,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        boxShadow: [BoxShadow(color: AppColors.neonAmber.withOpacity(0.2), blurRadius: 100, spreadRadius: 20)],
                      ),
                    ),
                  ),

                  SafeArea(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const SizedBox(height: AppSpacing.md),
                        const Text(
                          'SWOPSTER GATHERINGS PRESENTS',
                          style: TextStyle(
                            color: AppColors.neonPink,
                            fontSize: 10,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 2,
                          ),
                        ),
                        const SizedBox(height: 8),
                        const GradientText.feest(
                          'FEEST',
                          style: TextStyle(
                            fontFamily: 'Inter',
                            fontSize: 88,
                            fontWeight: FontWeight.w900,
                            letterSpacing: -3,
                            height: 0.9,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 6),
                        const Text(
                          'Edition 3',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: AppSpacing.md),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            _InfoPill(label: '📅 Datum TBA', color: AppColors.neonPink),
                            const SizedBox(width: 8),
                            _InfoPill(label: '📍 Locatie TBA', color: AppColors.neonAmber),
                            const SizedBox(width: 8),
                            _InfoPill(label: '18+', color: AppColors.neonPurple),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          // ── Ticket CTA ────────────────────────────────────────
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
              child: Column(
                children: [
                  NeonButton(
                    label: 'Koop Tickets',
                    variant: NeonButtonVariant.pink,
                    fullWidth: true,
                    onPressed: () => context.go(AppRoutes.tickets),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  NeonButton(
                    label: 'Stel me op de hoogte',
                    variant: NeonButtonVariant.outline,
                    fullWidth: true,
                    onPressed: () {},
                  ),
                ],
              ),
            ),
          ),

          const SliverToBoxAdapter(child: SizedBox(height: AppSpacing.xl)),

          // ── Features grid ─────────────────────────────────────
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'WAT KAN JE VERWACHTEN',
                    style: TextStyle(
                      color: AppColors.neonPurple,
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 2,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  GridView.count(
                    crossAxisCount: 2,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    mainAxisSpacing: AppSpacing.sm,
                    crossAxisSpacing: AppSpacing.sm,
                    childAspectRatio: 2.2,
                    children: const [
                      _FeatureItem(icon: '🎧', label: 'Live DJ Sets'),
                      _FeatureItem(icon: '🔊', label: 'Premium Sound'),
                      _FeatureItem(icon: '💡', label: 'Lichtshow'),
                      _FeatureItem(icon: '🥂', label: 'Volledig Bar'),
                      _FeatureItem(icon: '📸', label: 'Fotomomenten'),
                      _FeatureItem(icon: '🤝', label: 'Geweldig Publiek'),
                    ],
                  ),
                ],
              ),
            ),
          ),

          const SliverToBoxAdapter(child: SizedBox(height: AppSpacing.xl)),

          // ── Lineup ────────────────────────────────────────────
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'LINEUP',
                    style: TextStyle(
                      color: AppColors.neonPink,
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 2,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  _LineupItem(name: 'DJ GERS', role: 'Headliner', time: '22:00 – 00:00', isHeadliner: true),
                  const SizedBox(height: AppSpacing.sm),
                  _LineupItem(name: 'TBA', role: 'Support DJ', time: '20:00 – 22:00', isHeadliner: false),
                  const SizedBox(height: AppSpacing.sm),
                  _LineupItem(name: 'TBA', role: 'Opening DJ', time: '18:00 – 20:00', isHeadliner: false),
                ],
              ),
            ),
          ),

          const SliverToBoxAdapter(child: SizedBox(height: AppSpacing.xl)),

          // ── FAQ ───────────────────────────────────────────────
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'VEEL GESTELDE VRAGEN',
                    style: TextStyle(
                      color: AppColors.textMuted,
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 2,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  ...[
                    ('Waar vindt FEEST plaats?', 'Locatiedetails worden dichter bij de eventdatum bekend gemaakt.'),
                    ('Hoe kan ik tickets kopen?', 'Tickets koop je direct in de app via Stripe — iDEAL, creditcard, Apple Pay en Google Pay worden geaccepteerd.'),
                    ('Is er een leeftijdsgrens?', 'FEEST is een 18+ event. Geldig legitimatiebewijs verplicht bij de ingang.'),
                    ('Kan ik mijn ticket overdragen?', 'Ja, gekochte tickets zijn overdraagbaar via de app.'),
                  ].map((faq) => _FaqItem(question: faq.$1, answer: faq.$2)),
                ],
              ),
            ),
          ),

          const SliverToBoxAdapter(child: SizedBox(height: AppSpacing.xxl)),
        ],
      ),
    );
  }
}

class _InfoPill extends StatelessWidget {
  final String label;
  final Color color;

  const _InfoPill({required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(AppRadius.pill),
        border: Border.all(color: color.withOpacity(0.4)),
      ),
      child: Text(
        label,
        style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.w600),
      ),
    );
  }
}

class _FeatureItem extends StatelessWidget {
  final String icon;
  final String label;

  const _FeatureItem({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return NeonCard(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      child: Row(
        children: [
          Text(icon, style: const TextStyle(fontSize: 18)),
          const SizedBox(width: 8),
          Text(
            label,
            style: const TextStyle(
              color: AppColors.textPrimary,
              fontWeight: FontWeight.w600,
              fontSize: 13,
            ),
          ),
        ],
      ),
    );
  }
}

class _LineupItem extends StatelessWidget {
  final String name;
  final String role;
  final String time;
  final bool isHeadliner;

  const _LineupItem({
    required this.name,
    required this.role,
    required this.time,
    required this.isHeadliner,
  });

  @override
  Widget build(BuildContext context) {
    return NeonCard(
      borderColor: isHeadliner ? AppColors.neonPink.withOpacity(0.4) : null,
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              gradient: isHeadliner ? AppColors.gradientPink : null,
              color: isHeadliner ? null : AppColors.card2,
              borderRadius: BorderRadius.circular(AppRadius.md),
            ),
            child: Center(
              child: Text(
                name[0],
                style: TextStyle(
                  color: isHeadliner ? Colors.white : AppColors.textMuted,
                  fontWeight: FontWeight.w900,
                  fontSize: 18,
                ),
              ),
            ),
          ),
          const SizedBox(width: AppSpacing.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: TextStyle(
                    color: isHeadliner ? AppColors.textPrimary : AppColors.textSecondary,
                    fontWeight: FontWeight.w800,
                    fontSize: 15,
                  ),
                ),
                Text(
                  role,
                  style: const TextStyle(color: AppColors.textMuted, fontSize: 12),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                time,
                style: const TextStyle(
                  color: AppColors.textMuted,
                  fontSize: 12,
                  fontFamily: 'monospace',
                ),
              ),
              if (isHeadliner)
                const Text(
                  '★ Headliner',
                  style: TextStyle(color: AppColors.neonPink, fontSize: 11, fontWeight: FontWeight.w600),
                ),
            ],
          ),
        ],
      ),
    );
  }
}

class _FaqItem extends StatefulWidget {
  final String question;
  final String answer;

  const _FaqItem({required this.question, required this.answer});

  @override
  State<_FaqItem> createState() => _FaqItemState();
}

class _FaqItemState extends State<_FaqItem> {
  bool _open = false;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.sm),
      child: NeonCard(
        onTap: () => setState(() => _open = !_open),
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    widget.question,
                    style: const TextStyle(
                      color: AppColors.textPrimary,
                      fontWeight: FontWeight.w600,
                      fontSize: 14,
                    ),
                  ),
                ),
                Icon(
                  _open ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                  color: AppColors.neonPurple,
                  size: 20,
                ),
              ],
            ),
            if (_open) ...[
              const SizedBox(height: AppSpacing.sm),
              Text(
                widget.answer,
                style: const TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: 13,
                  height: 1.5,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
