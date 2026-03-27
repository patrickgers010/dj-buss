import 'package:flutter/material.dart';
import '../../core/constants.dart';
import '../../models/post.dart';
import '../../widgets/neon_card.dart';

class CommunityScreen extends StatelessWidget {
  const CommunityScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final posts = Post.samples;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Community'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add_box_outlined, color: AppColors.neonPurple),
            onPressed: () {},
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.md),
        children: [
          // Announcement banner
          Container(
            padding: const EdgeInsets.all(AppSpacing.md),
            decoration: BoxDecoration(
              color: AppColors.neonPurple.withOpacity(0.1),
              borderRadius: BorderRadius.circular(AppRadius.lg),
              border: Border.all(color: AppColors.neonPurple.withOpacity(0.3)),
            ),
            child: const Row(
              children: [
                Icon(Icons.campaign_outlined, color: AppColors.neonPurple, size: 20),
                SizedBox(width: AppSpacing.sm),
                Expanded(
                  child: Text(
                    'FEEST Edition 3 aankondiging komt eraan! Zet notificaties aan.',
                    style: TextStyle(color: AppColors.textSecondary, fontSize: 13),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: AppSpacing.lg),

          // Posts
          ...posts.map((post) => Padding(
            padding: const EdgeInsets.only(bottom: AppSpacing.md),
            child: _PostCard(post: post),
          )),
        ],
      ),
    );
  }
}

class _PostCard extends StatefulWidget {
  final Post post;

  const _PostCard({required this.post});

  @override
  State<_PostCard> createState() => _PostCardState();
}

class _PostCardState extends State<_PostCard> {
  late bool _liked;
  late int _likeCount;

  @override
  void initState() {
    super.initState();
    _liked = widget.post.isLikedByMe;
    _likeCount = widget.post.likeCount;
  }

  String _timeAgo(DateTime date) {
    final diff = DateTime.now().difference(date);
    if (diff.inMinutes < 60) return '${diff.inMinutes}m geleden';
    if (diff.inHours < 24) return '${diff.inHours}u geleden';
    return '${diff.inDays}d geleden';
  }

  @override
  Widget build(BuildContext context) {
    return NeonCard(
      borderColor: widget.post.linkedEventId != null
          ? AppColors.neonPink.withOpacity(0.25)
          : null,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            children: [
              CircleAvatar(
                radius: 18,
                backgroundColor: AppColors.neonPurple.withOpacity(0.2),
                child: Text(
                  widget.post.authorName[0],
                  style: const TextStyle(
                    color: AppColors.neonPurple,
                    fontWeight: FontWeight.w700,
                    fontSize: 14,
                  ),
                ),
              ),
              const SizedBox(width: 10),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.post.authorName,
                    style: const TextStyle(
                      color: AppColors.textPrimary,
                      fontWeight: FontWeight.w700,
                      fontSize: 14,
                    ),
                  ),
                  Text(
                    _timeAgo(widget.post.createdAt),
                    style: const TextStyle(color: AppColors.textMuted, fontSize: 11),
                  ),
                ],
              ),
              const Spacer(),
              if (widget.post.type == PostType.video)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: AppColors.neonPurple.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(AppRadius.pill),
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.play_circle_outline, size: 11, color: AppColors.neonPurple),
                      SizedBox(width: 3),
                      Text('Video', style: TextStyle(color: AppColors.neonPurple, fontSize: 10, fontWeight: FontWeight.w600)),
                    ],
                  ),
                ),
            ],
          ),

          const SizedBox(height: AppSpacing.md),

          // Caption
          Text(
            widget.post.caption,
            style: const TextStyle(
              color: AppColors.textSecondary,
              fontSize: 14,
              height: 1.5,
            ),
          ),

          if (widget.post.tags.isNotEmpty) ...[
            const SizedBox(height: AppSpacing.sm),
            Wrap(
              spacing: 6,
              children: widget.post.tags.take(3).map((tag) => Text(
                '#$tag',
                style: const TextStyle(
                  color: AppColors.neonPurple,
                  fontSize: 13,
                  fontWeight: FontWeight.w500,
                ),
              )).toList(),
            ),
          ],

          const SizedBox(height: AppSpacing.md),
          const Divider(color: Color(0x0Dffffff), height: 1),
          const SizedBox(height: AppSpacing.sm),

          // Actions
          Row(
            children: [
              _Action(
                icon: _liked ? Icons.favorite : Icons.favorite_border,
                label: '$_likeCount',
                color: _liked ? Colors.red : AppColors.textMuted,
                onTap: () => setState(() {
                  _liked = !_liked;
                  _likeCount += _liked ? 1 : -1;
                }),
              ),
              const SizedBox(width: AppSpacing.md),
              _Action(
                icon: Icons.comment_outlined,
                label: '${widget.post.commentCount}',
                onTap: () {},
              ),
              const SizedBox(width: AppSpacing.md),
              _Action(
                icon: Icons.share_outlined,
                label: '${widget.post.shareCount}',
                onTap: () {},
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _Action extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final Color color;

  const _Action({
    required this.icon,
    required this.label,
    required this.onTap,
    this.color = AppColors.textMuted,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 18, color: color),
          const SizedBox(width: 4),
          Text(label, style: TextStyle(color: color, fontSize: 13, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }
}
