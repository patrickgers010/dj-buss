import 'package:flutter/material.dart';
import '../core/constants.dart';

class GradientText extends StatelessWidget {
  final String text;
  final TextStyle? style;
  final Gradient? gradient;
  final TextAlign? textAlign;

  const GradientText(
    this.text, {
    super.key,
    this.style,
    this.gradient,
    this.textAlign,
  });

  /// Purple → Blue (primary brand gradient)
  const GradientText.purpleBlue(
    this.text, {
    super.key,
    this.style,
    this.textAlign,
  }) : gradient = AppColors.gradientPurpleBlue;

  /// Pink → Purple → Amber (FEEST gradient)
  const GradientText.feest(
    this.text, {
    super.key,
    this.style,
    this.textAlign,
  }) : gradient = AppColors.gradientFeest;

  /// Pink → Purple (Swopster gradient)
  const GradientText.pink(
    this.text, {
    super.key,
    this.style,
    this.textAlign,
  }) : gradient = AppColors.gradientPink;

  @override
  Widget build(BuildContext context) {
    final effectiveGradient = gradient ?? AppColors.gradientPurpleBlue;
    final effectiveStyle = style ?? const TextStyle(fontSize: 16, fontWeight: FontWeight.w700);

    return ShaderMask(
      blendMode: BlendMode.srcIn,
      shaderCallback: (Rect bounds) =>
          effectiveGradient.createShader(bounds),
      child: Text(
        text,
        style: effectiveStyle,
        textAlign: textAlign,
      ),
    );
  }
}

/// Animated neon glow text
class NeonGlowText extends StatefulWidget {
  final String text;
  final TextStyle style;
  final Color glowColor;

  const NeonGlowText({
    super.key,
    required this.text,
    required this.style,
    this.glowColor = AppColors.neonPurple,
  });

  @override
  State<NeonGlowText> createState() => _NeonGlowTextState();
}

class _NeonGlowTextState extends State<NeonGlowText>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1800),
    )..repeat(reverse: true);

    _animation = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (_, __) => Text(
        widget.text,
        style: widget.style.copyWith(
          shadows: [
            Shadow(
              color: widget.glowColor.withOpacity(_animation.value * 0.8),
              blurRadius: 10 * _animation.value,
            ),
            Shadow(
              color: widget.glowColor.withOpacity(_animation.value * 0.4),
              blurRadius: 25 * _animation.value,
            ),
          ],
        ),
      ),
    );
  }
}
