import 'package:flutter/material.dart';
import '../../core/constants.dart';
import '../../models/post.dart';

class FeedItemWidget extends StatefulWidget {
  final Post post;
  final VoidCallback onLike;

  const FeedItemWidget({
    super.key,
    required this.post,
    required this.onLike,
  });

  @override
  State<FeedItemWidget> createState() => _FeedItemWidgetState();
}

class _FeedItemWidgetState extends State<FeedItemWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _heartController;
  late Animation<double> _heartScale;
  bool _showHeart = false;
  DateTime? _lastTap;

  @override
  void initState() {
    super.initState();
    _heartController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
    );
    _heartScale = TweenSequence([
      TweenSequenceItem(tween: Tween(begin: 0.0, end: 1.3), weight: 40),
      TweenSequenceItem(tween: Tween(begin: 1.3, end: 1.0), weight: 30),
      TweenSequenceItem(tween: Tween(begin: 1.0, end: 0.0), weight: 30),
    ]).animate(_heartController);
  }

  @override
  void dispose() {
    _heartController.dispose();
    super.dispose();
  }

  void _onDoubleTap() {
    final now = DateTime.now();
    if (_lastTap != null && now.difference(_lastTap!) < const Duration(milliseconds: 300)) {
      widget.onLike();
      setState(() => _showHeart = true);
      _heartController.forward(from: 0).then((_) {
        if (mounted) setState(() => _showHeart = false);
      });
    }
    _lastTap = now;
  }

  String _formatCount(int count) {
    if (count >= 1000) return '${(count / 1000).toStringAsFixed(1)}K';
    return count.toString();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _onDoubleTap(),
      child: Stack(
        fit: StackFit.expand,
        children: [
          // ── Background (video/image placeholder) ─────────────
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  const Color(0xFF0a0015),
                  AppColors.neonPurple.withOpacity(0.15),
                  const Color(0xFF000010),
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
          ),

          // Scan line effect overlay
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Colors.transparent,
                    Colors.black.withOpacity(0.6),
                  ],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),
            ),
          ),

          // ── Post type indicator ───────────────────────────────
          if (widget.post.type == PostType.video)
            const Center(
              child: Icon(
                Icons.play_circle_outline,
                color: Colors.white30,
                size: 64,
              ),
            ),

          // ── Bottom info ───────────────────────────────────────
          Positioned(
            left: 0,
            right: 72,
            bottom: 0,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Author
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 18,
                        backgroundColor: AppColors.neonPurple.withOpacity(0.3),
                        child: Text(
                          widget.post.authorName[0],
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w700,
                            fontSize: 14,
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        widget.post.authorName,
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),

                  // Caption
                  Text(
                    widget.post.caption,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 14,
                      height: 1.4,
                    ),
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 8),

                  // Tags
                  Wrap(
                    spacing: 6,
                    children: widget.post.tags.take(3).map((tag) => Text(
                      '#$tag',
                      style: const TextStyle(
                        color: AppColors.neonPurple,
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                      ),
                    )).toList(),
                  ),

                  // Linked event chip
                  if (widget.post.linkedEventId != null) ...[
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        gradient: AppColors.gradientFeest,
                        borderRadius: BorderRadius.circular(AppRadius.pill),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.celebration, size: 12, color: Colors.white),
                          SizedBox(width: 4),
                          Text(
                            'FEEST Ed. 3 → Koop tickets',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),

          // ── Right action buttons ──────────────────────────────
          Positioned(
            right: 0,
            bottom: 24,
            child: Column(
              children: [
                _ActionButton(
                  icon: widget.post.isLikedByMe
                      ? Icons.favorite
                      : Icons.favorite_border,
                  label: _formatCount(widget.post.likeCount),
                  color: widget.post.isLikedByMe ? Colors.red : Colors.white,
                  onTap: widget.onLike,
                ),
                const SizedBox(height: 20),
                _ActionButton(
                  icon: Icons.comment_outlined,
                  label: _formatCount(widget.post.commentCount),
                  onTap: () {},
                ),
                const SizedBox(height: 20),
                _ActionButton(
                  icon: Icons.share_outlined,
                  label: _formatCount(widget.post.shareCount),
                  onTap: () {},
                ),
                const SizedBox(height: 20),
                _ActionButton(
                  icon: Icons.bookmark_border,
                  label: 'Opsl.',
                  onTap: () {},
                ),
              ],
            ),
          ),

          // ── Double-tap heart animation ────────────────────────
          if (_showHeart)
            Center(
              child: ScaleTransition(
                scale: _heartScale,
                child: const Icon(
                  Icons.favorite,
                  color: Colors.red,
                  size: 100,
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final Color color;

  const _ActionButton({
    required this.icon,
    required this.label,
    required this.onTap,
    this.color = Colors.white,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        width: 64,
        child: Column(
          children: [
            Icon(icon, color: color, size: 28),
            const SizedBox(height: 3),
            Text(
              label,
              style: TextStyle(
                color: color,
                fontSize: 12,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
