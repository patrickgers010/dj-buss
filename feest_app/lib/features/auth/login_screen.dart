import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants.dart';
import '../../widgets/neon_button.dart';
import '../../widgets/gradient_text.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;
  bool _isLoading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _isLoading = true);
    await Future.delayed(const Duration(milliseconds: 1200));
    if (mounted) {
      setState(() => _isLoading = false);
      context.go(AppRoutes.feed);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: AppSpacing.xxl),

                // Logo
                Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        gradient: AppColors.gradientFeest,
                        borderRadius: BorderRadius.circular(AppRadius.md),
                      ),
                      child: const Center(
                        child: Text(
                          'F',
                          style: TextStyle(
                            fontFamily: 'Inter',
                            fontSize: 22,
                            fontWeight: FontWeight.w900,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    const GradientText.feest(
                      'FEEST',
                      style: TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 26,
                        fontWeight: FontWeight.w900,
                        letterSpacing: -0.5,
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: AppSpacing.xxl),

                const Text(
                  'Welkom terug',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 32,
                    fontWeight: FontWeight.w900,
                    color: AppColors.textPrimary,
                    height: 1.1,
                  ),
                ),
                const SizedBox(height: AppSpacing.sm),
                const Text(
                  'Log in om tickets te kopen en de feed te bekijken.',
                  style: TextStyle(
                    color: AppColors.textMuted,
                    fontSize: 15,
                  ),
                ),

                const SizedBox(height: AppSpacing.xl),

                // Email
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  style: const TextStyle(color: AppColors.textPrimary),
                  decoration: const InputDecoration(
                    labelText: 'E-mailadres',
                    prefixIcon: Icon(Icons.email_outlined, color: AppColors.textMuted, size: 20),
                  ),
                  validator: (v) {
                    if (v == null || v.isEmpty) return 'Voer je e-mailadres in';
                    if (!v.contains('@')) return 'Ongeldig e-mailadres';
                    return null;
                  },
                ),

                const SizedBox(height: AppSpacing.md),

                // Password
                TextFormField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  style: const TextStyle(color: AppColors.textPrimary),
                  decoration: InputDecoration(
                    labelText: 'Wachtwoord',
                    prefixIcon: const Icon(Icons.lock_outline, color: AppColors.textMuted, size: 20),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscurePassword ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                        color: AppColors.textMuted,
                        size: 20,
                      ),
                      onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                    ),
                  ),
                  validator: (v) {
                    if (v == null || v.isEmpty) return 'Voer je wachtwoord in';
                    if (v.length < 6) return 'Wachtwoord is te kort';
                    return null;
                  },
                ),

                const SizedBox(height: AppSpacing.sm),

                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () {},
                    child: const Text(
                      'Wachtwoord vergeten?',
                      style: TextStyle(color: AppColors.neonPurple, fontSize: 13),
                    ),
                  ),
                ),

                const SizedBox(height: AppSpacing.md),

                NeonButton(
                  label: 'Inloggen',
                  onPressed: _login,
                  isLoading: _isLoading,
                  fullWidth: true,
                ),

                const SizedBox(height: AppSpacing.md),

                // Divider
                Row(
                  children: [
                    Expanded(child: Divider(color: AppColors.textMuted.withOpacity(0.2))),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      child: Text(
                        'of',
                        style: TextStyle(color: AppColors.textMuted.withOpacity(0.6), fontSize: 12),
                      ),
                    ),
                    Expanded(child: Divider(color: AppColors.textMuted.withOpacity(0.2))),
                  ],
                ),

                const SizedBox(height: AppSpacing.md),

                // Register CTA
                NeonButton(
                  label: 'Maak een account',
                  onPressed: () => context.push(AppRoutes.register),
                  variant: NeonButtonVariant.outline,
                  fullWidth: true,
                ),

                const SizedBox(height: AppSpacing.xl),

                // Skip for now
                Center(
                  child: TextButton(
                    onPressed: () => context.go(AppRoutes.feed),
                    child: const Text(
                      'Doorgaan als gast',
                      style: TextStyle(color: AppColors.textMuted, fontSize: 13),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
