import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants.dart';
import '../../models/ticket.dart';
import '../../widgets/neon_button.dart';
import '../../widgets/neon_card.dart';
import '../../widgets/gradient_text.dart';

class CheckoutScreen extends StatefulWidget {
  final String ticketTypeId;

  const CheckoutScreen({super.key, required this.ticketTypeId});

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  int _quantity = 1;
  bool _isProcessing = false;
  bool _success = false;

  TicketType get _ticket => TicketType.samplesFeest3.firstWhere(
        (t) => t.id == widget.ticketTypeId,
        orElse: () => TicketType.samplesFeest3.first,
      );

  double get _total => _ticket.price * _quantity;

  Future<void> _pay() async {
    setState(() => _isProcessing = true);

    // In production:
    // 1. Call your Firebase Cloud Function to create a Stripe PaymentIntent
    // 2. Use flutter_stripe to present the payment sheet
    // 3. On success, save ticket to Firestore and generate QR code

    await Future.delayed(const Duration(seconds: 2));

    if (mounted) {
      setState(() {
        _isProcessing = false;
        _success = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_success) {
      return Scaffold(
        backgroundColor: AppColors.background,
        body: SafeArea(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.xl),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      gradient: AppColors.gradientPurpleBlue,
                      shape: BoxShape.circle,
                      boxShadow: [BoxShadow(color: AppColors.neonPurple.withOpacity(0.4), blurRadius: 20)],
                    ),
                    child: const Icon(Icons.check, color: Colors.white, size: 40),
                  ),
                  const SizedBox(height: AppSpacing.xl),
                  const GradientText.purpleBlue(
                    'Betaling gelukt!',
                    style: TextStyle(fontFamily: 'Inter', fontSize: 28, fontWeight: FontWeight.w900),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: AppSpacing.md),
                  Text(
                    'Je $_quantity ${_ticket.name} ticket${_quantity > 1 ? "s zijn" : " is"} gereserveerd voor FEEST Edition 3. Bekijk je tickets in de app.',
                    style: const TextStyle(color: AppColors.textSecondary, fontSize: 15, height: 1.5),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: AppSpacing.xl),
                  NeonButton(
                    label: 'Bekijk mijn tickets',
                    fullWidth: true,
                    onPressed: () => context.go(AppRoutes.myTickets),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  NeonButton(
                    label: 'Terug naar FEEST',
                    variant: NeonButtonVariant.outline,
                    fullWidth: true,
                    onPressed: () => context.go(AppRoutes.feest),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Afrekenen'),
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => context.pop(),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Order summary
            const Text(
              'BESTELLING',
              style: TextStyle(color: AppColors.neonPurple, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 2),
            ),
            const SizedBox(height: AppSpacing.md),

            NeonCard(
              child: Column(
                children: [
                  Row(
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          gradient: AppColors.gradientFeest,
                          borderRadius: BorderRadius.circular(AppRadius.md),
                        ),
                        child: const Center(child: Text('F', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 20))),
                      ),
                      const SizedBox(width: AppSpacing.md),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('FEEST Edition 3 — ${_ticket.name}',
                              style: const TextStyle(color: AppColors.textPrimary, fontWeight: FontWeight.w700, fontSize: 14)),
                            const Text('📅 Datum TBA · 📍 Locatie TBA',
                              style: TextStyle(color: AppColors.textMuted, fontSize: 12)),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.md),
                  const Divider(color: Color(0x1Affffff)),
                  const SizedBox(height: AppSpacing.md),

                  // Quantity
                  Row(
                    children: [
                      const Text('Aantal', style: TextStyle(color: AppColors.textSecondary, fontSize: 14)),
                      const Spacer(),
                      Row(
                        children: [
                          _QtyButton(
                            icon: Icons.remove,
                            onTap: () { if (_quantity > 1) setState(() => _quantity--); },
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 16),
                            child: Text(
                              '$_quantity',
                              style: const TextStyle(color: AppColors.textPrimary, fontWeight: FontWeight.w700, fontSize: 18),
                            ),
                          ),
                          _QtyButton(
                            icon: Icons.add,
                            onTap: () { if (_quantity < 8) setState(() => _quantity++); },
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.md),

                  Row(
                    children: [
                      Text('€${_ticket.price.toStringAsFixed(2)} × $_quantity', style: const TextStyle(color: AppColors.textMuted, fontSize: 13)),
                      const Spacer(),
                      GradientText.purpleBlue(
                        '€${_total.toStringAsFixed(2)}',
                        style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 20),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: AppSpacing.xl),

            const Text(
              'BETAALMETHODE',
              style: TextStyle(color: AppColors.neonPurple, fontSize: 11, fontWeight: FontWeight.w700, letterSpacing: 2),
            ),
            const SizedBox(height: AppSpacing.md),

            NeonCard(
              child: Column(
                children: [
                  _PaymentOption(label: 'iDEAL', icon: Icons.account_balance, selected: true),
                  const Divider(color: Color(0x0Dffffff), height: 1),
                  _PaymentOption(label: 'Creditcard', icon: Icons.credit_card, selected: false),
                  const Divider(color: Color(0x0Dffffff), height: 1),
                  _PaymentOption(label: 'Apple Pay', icon: Icons.apple, selected: false),
                  const Divider(color: Color(0x0Dffffff), height: 1),
                  _PaymentOption(label: 'Google Pay', icon: Icons.g_mobiledata, selected: false),
                ],
              ),
            ),

            const SizedBox(height: AppSpacing.xl),

            // Security notice
            Row(
              children: const [
                Icon(Icons.lock_outline, size: 14, color: AppColors.textMuted),
                SizedBox(width: 6),
                Text(
                  'Beveiligd door Stripe · PCI DSS compliant',
                  style: TextStyle(color: AppColors.textMuted, fontSize: 12),
                ),
              ],
            ),

            const SizedBox(height: AppSpacing.lg),

            NeonButton(
              label: 'Betaal nu · €${_total.toStringAsFixed(2)}',
              variant: NeonButtonVariant.pink,
              fullWidth: true,
              isLoading: _isProcessing,
              onPressed: _pay,
            ),

            const SizedBox(height: AppSpacing.xxl),
          ],
        ),
      ),
    );
  }
}

class _QtyButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;

  const _QtyButton({required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 32,
        height: 32,
        decoration: BoxDecoration(
          border: Border.all(color: AppColors.neonPurple.withOpacity(0.4)),
          borderRadius: BorderRadius.circular(AppRadius.sm),
        ),
        child: Icon(icon, size: 16, color: AppColors.neonPurple),
      ),
    );
  }
}

class _PaymentOption extends StatelessWidget {
  final String label;
  final IconData icon;
  final bool selected;

  const _PaymentOption({required this.label, required this.icon, required this.selected});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Row(
        children: [
          Icon(icon, color: selected ? AppColors.neonPurple : AppColors.textMuted, size: 20),
          const SizedBox(width: 12),
          Text(label, style: TextStyle(color: selected ? AppColors.textPrimary : AppColors.textSecondary, fontSize: 14, fontWeight: FontWeight.w600)),
          const Spacer(),
          Container(
            width: 20,
            height: 20,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: selected ? AppColors.neonPurple : AppColors.textMuted,
                width: selected ? 5 : 1.5,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
