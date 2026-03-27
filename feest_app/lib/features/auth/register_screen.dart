import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/constants.dart';
import '../../widgets/neon_button.dart';
import '../../widgets/gradient_text.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;
  bool _isLoading = false;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _register() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _isLoading = true);
    await Future.delayed(const Duration(milliseconds: 1400));
    if (mounted) {
      setState(() => _isLoading = false);
      context.go(AppRoutes.feed);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 18),
          onPressed: () => context.pop(),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const GradientText.feest(
                  'Account aanmaken',
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 30,
                    fontWeight: FontWeight.w900,
                    height: 1.1,
                  ),
                ),
                const SizedBox(height: AppSpacing.sm),
                const Text(
                  'Maak een account en mis nooit een FEEST event.',
                  style: TextStyle(color: AppColors.textMuted, fontSize: 15),
                ),

                const SizedBox(height: AppSpacing.xl),

                TextFormField(
                  controller: _nameController,
                  style: const TextStyle(color: AppColors.textPrimary),
                  decoration: const InputDecoration(
                    labelText: 'Naam',
                    prefixIcon: Icon(Icons.person_outline, color: AppColors.textMuted, size: 20),
                  ),
                  validator: (v) =>
                      (v == null || v.isEmpty) ? 'Voer je naam in' : null,
                ),

                const SizedBox(height: AppSpacing.md),

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
                    if (v == null || v.isEmpty) return 'Kies een wachtwoord';
                    if (v.length < 8) return 'Minimaal 8 tekens';
                    return null;
                  },
                ),

                const SizedBox(height: AppSpacing.lg),

                NeonButton(
                  label: 'Account aanmaken',
                  variant: NeonButtonVariant.pink,
                  onPressed: _register,
                  isLoading: _isLoading,
                  fullWidth: true,
                ),

                const SizedBox(height: AppSpacing.md),

                Center(
                  child: Text.rich(
                    TextSpan(
                      text: 'Door aan te melden ga je akkoord met de ',
                      style: const TextStyle(color: AppColors.textMuted, fontSize: 12),
                      children: [
                        TextSpan(
                          text: 'gebruikersvoorwaarden',
                          style: const TextStyle(color: AppColors.neonPurple),
                        ),
                      ],
                    ),
                    textAlign: TextAlign.center,
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
