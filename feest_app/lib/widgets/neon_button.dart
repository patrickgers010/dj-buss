import 'package:flutter/material.dart';
import '../core/constants.dart';

enum NeonButtonVariant { filled, outline, pink }

class NeonButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final NeonButtonVariant variant;
  final bool isLoading;
  final bool fullWidth;
  final IconData? icon;
  final double? fontSize;

  const NeonButton({
    super.key,
    required this.label,
    this.onPressed,
    this.variant = NeonButtonVariant.filled,
    this.isLoading = false,
    this.fullWidth = false,
    this.icon,
    this.fontSize,
  });

  @override
  Widget build(BuildContext context) {
    final bool disabled = onPressed == null || isLoading;

    Widget child = isLoading
        ? const SizedBox(
            width: 18,
            height: 18,
            child: CircularProgressIndicator(
              strokeWidth: 2,
              valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
            ),
          )
        : Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null) ...[
                Icon(icon, size: 16),
                const SizedBox(width: 8),
              ],
              Text(
                label.toUpperCase(),
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontSize: fontSize ?? 13,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 0.8,
                ),
              ),
            ],
          );

    if (fullWidth) {
      child = Center(child: child);
    }

    switch (variant) {
      case NeonButtonVariant.filled:
        return _FilledButton(
          onPressed: disabled ? null : onPressed,
          fullWidth: fullWidth,
          child: child,
        );
      case NeonButtonVariant.outline:
        return _OutlineButton(
          onPressed: disabled ? null : onPressed,
          fullWidth: fullWidth,
          child: child,
        );
      case NeonButtonVariant.pink:
        return _PinkButton(
          onPressed: disabled ? null : onPressed,
          fullWidth: fullWidth,
          child: child,
        );
    }
  }
}

class _FilledButton extends StatelessWidget {
  final VoidCallback? onPressed;
  final Widget child;
  final bool fullWidth;

  const _FilledButton({
    required this.onPressed,
    required this.child,
    required this.fullWidth,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        width: fullWidth ? double.infinity : null,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        decoration: BoxDecoration(
          gradient: onPressed != null
              ? AppColors.gradientPurpleBlue
              : const LinearGradient(colors: [Color(0xFF444), Color(0xFF333)]),
          borderRadius: BorderRadius.circular(AppRadius.md),
          boxShadow: onPressed != null
              ? [
                  BoxShadow(
                    color: AppColors.neonPurple.withOpacity(0.4),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ]
              : null,
        ),
        child: DefaultTextStyle(
          style: const TextStyle(color: Colors.white),
          child: child,
        ),
      ),
    );
  }
}

class _OutlineButton extends StatelessWidget {
  final VoidCallback? onPressed;
  final Widget child;
  final bool fullWidth;

  const _OutlineButton({
    required this.onPressed,
    required this.child,
    required this.fullWidth,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        width: fullWidth ? double.infinity : null,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 13),
        decoration: BoxDecoration(
          border: Border.all(
            color: onPressed != null
                ? AppColors.neonPurple
                : AppColors.textMuted,
            width: 1.5,
          ),
          borderRadius: BorderRadius.circular(AppRadius.md),
          boxShadow: onPressed != null
              ? [
                  BoxShadow(
                    color: AppColors.neonPurple.withOpacity(0.2),
                    blurRadius: 8,
                    spreadRadius: 0,
                  ),
                ]
              : null,
        ),
        child: DefaultTextStyle(
          style: TextStyle(
            color: onPressed != null ? AppColors.neonPurple : AppColors.textMuted,
          ),
          child: child,
        ),
      ),
    );
  }
}

class _PinkButton extends StatelessWidget {
  final VoidCallback? onPressed;
  final Widget child;
  final bool fullWidth;

  const _PinkButton({
    required this.onPressed,
    required this.child,
    required this.fullWidth,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Container(
        width: fullWidth ? double.infinity : null,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        decoration: BoxDecoration(
          gradient: onPressed != null
              ? AppColors.gradientPink
              : const LinearGradient(colors: [Color(0xFF444), Color(0xFF333)]),
          borderRadius: BorderRadius.circular(AppRadius.md),
          boxShadow: onPressed != null
              ? [
                  BoxShadow(
                    color: AppColors.neonPink.withOpacity(0.4),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ]
              : null,
        ),
        child: DefaultTextStyle(
          style: const TextStyle(color: Colors.white),
          child: child,
        ),
      ),
    );
  }
}
