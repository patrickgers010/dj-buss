import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../core/constants.dart';
import '../../models/post.dart';
import 'feed_item_widget.dart';

class FeedScreen extends StatefulWidget {
  const FeedScreen({super.key});

  @override
  State<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends State<FeedScreen> {
  final PageController _pageController = PageController();
  int _currentIndex = 0;
  late List<Post> _posts;

  @override
  void initState() {
    super.initState();
    _posts = Post.samples;
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _onLike(String postId) {
    setState(() {
      final index = _posts.indexWhere((p) => p.id == postId);
      if (index != -1) {
        final post = _posts[index];
        _posts[index] = post.copyWith(
          isLikedByMe: !post.isLikedByMe,
          likeCount: post.isLikedByMe ? post.likeCount - 1 : post.likeCount + 1,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      extendBodyBehindAppBar: true,

      // Overlay top bar (like TikTok)
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        automaticallyImplyLeading: false,
        flexibleSpace: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
            child: Row(
              children: [
                // Tab switcher
                Row(
                  children: [
                    _FeedTab(label: 'Volgend', selected: false),
                    const SizedBox(width: 20),
                    _FeedTab(label: 'Voor jou', selected: true),
                  ],
                ),
                const Spacer(),
                // Search icon
                IconButton(
                  icon: const Icon(Icons.search, color: Colors.white),
                  onPressed: () {},
                ),
              ],
            ),
          ),
        ),
      ),

      body: PageView.builder(
        controller: _pageController,
        scrollDirection: Axis.vertical,
        itemCount: _posts.length,
        onPageChanged: (i) => setState(() => _currentIndex = i),
        itemBuilder: (context, index) {
          return FeedItemWidget(
            post: _posts[index],
            onLike: () => _onLike(_posts[index].id),
          );
        },
      ),
    );
  }
}

class _FeedTab extends StatelessWidget {
  final String label;
  final bool selected;

  const _FeedTab({required this.label, required this.selected});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          label,
          style: TextStyle(
            fontFamily: 'Inter',
            color: selected ? Colors.white : Colors.white60,
            fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
            fontSize: 15,
          ),
        ),
        if (selected)
          Container(
            height: 2,
            width: 20,
            margin: const EdgeInsets.only(top: 2),
            decoration: BoxDecoration(
              gradient: AppColors.gradientPurpleBlue,
              borderRadius: BorderRadius.circular(1),
            ),
          ),
      ],
    );
  }
}
