enum PostType { video, image, text, announcement }

class Post {
  final String id;
  final String authorId;
  final String authorName;
  final String authorImageUrl;
  final PostType type;
  final String? mediaUrl;  // video or image URL
  final String? thumbnailUrl;
  final String caption;
  final List<String> tags;
  final int likeCount;
  final int commentCount;
  final int shareCount;
  final DateTime createdAt;
  final bool isLikedByMe;
  final String? linkedEventId;

  const Post({
    required this.id,
    required this.authorId,
    required this.authorName,
    required this.authorImageUrl,
    required this.type,
    this.mediaUrl,
    this.thumbnailUrl,
    required this.caption,
    this.tags = const [],
    this.likeCount = 0,
    this.commentCount = 0,
    this.shareCount = 0,
    required this.createdAt,
    this.isLikedByMe = false,
    this.linkedEventId,
  });

  factory Post.fromMap(Map<String, dynamic> map, String id) {
    return Post(
      id: id,
      authorId: map['authorId'] as String,
      authorName: map['authorName'] as String,
      authorImageUrl: map['authorImageUrl'] as String? ?? '',
      type: PostType.values.firstWhere(
        (t) => t.name == (map['type'] as String? ?? 'image'),
        orElse: () => PostType.image,
      ),
      mediaUrl: map['mediaUrl'] as String?,
      thumbnailUrl: map['thumbnailUrl'] as String?,
      caption: map['caption'] as String? ?? '',
      tags: List<String>.from(map['tags'] as List? ?? []),
      likeCount: map['likeCount'] as int? ?? 0,
      commentCount: map['commentCount'] as int? ?? 0,
      shareCount: map['shareCount'] as int? ?? 0,
      createdAt: DateTime.fromMillisecondsSinceEpoch(map['createdAt'] as int),
      isLikedByMe: map['isLikedByMe'] as bool? ?? false,
      linkedEventId: map['linkedEventId'] as String?,
    );
  }

  Post copyWith({bool? isLikedByMe, int? likeCount}) {
    return Post(
      id: id,
      authorId: authorId,
      authorName: authorName,
      authorImageUrl: authorImageUrl,
      type: type,
      mediaUrl: mediaUrl,
      thumbnailUrl: thumbnailUrl,
      caption: caption,
      tags: tags,
      likeCount: likeCount ?? this.likeCount,
      commentCount: commentCount,
      shareCount: shareCount,
      createdAt: createdAt,
      isLikedByMe: isLikedByMe ?? this.isLikedByMe,
      linkedEventId: linkedEventId,
    );
  }

  // ── Sample data ──────────────────────────────────────────────
  static List<Post> get samples => [
    Post(
      id: 'post-1',
      authorId: 'dj-gers',
      authorName: 'DJ GERS',
      authorImageUrl: '',
      type: PostType.video,
      mediaUrl: null,
      caption: 'FEEST Edition 3 is coming 🔥 Wie is er klaar? #FEEST #SwopsterGatherings',
      tags: ['FEEST', 'SwopsterGatherings', 'DjGers'],
      likeCount: 234,
      commentCount: 47,
      shareCount: 88,
      createdAt: DateTime.now().subtract(const Duration(hours: 3)),
      linkedEventId: 'feest-3',
    ),
    Post(
      id: 'post-2',
      authorId: 'swopster',
      authorName: 'Swopster Gatherings',
      authorImageUrl: '',
      type: PostType.image,
      caption: 'Tickets voor FEEST Ed. 3 druppelen binnenkort. Stay tuned! 🎟️',
      tags: ['FEEST', 'Tickets'],
      likeCount: 189,
      commentCount: 32,
      shareCount: 67,
      createdAt: DateTime.now().subtract(const Duration(hours: 8)),
      linkedEventId: 'feest-3',
    ),
    Post(
      id: 'post-3',
      authorId: 'dj-gers',
      authorName: 'DJ GERS',
      authorImageUrl: '',
      type: PostType.video,
      caption: 'Studio sessie — nieuwe mix komt eraan 🎧 #TechHouse #DjGers',
      tags: ['TechHouse', 'DjGers', 'Studio'],
      likeCount: 312,
      commentCount: 58,
      shareCount: 102,
      createdAt: DateTime.now().subtract(const Duration(days: 1)),
    ),
  ];
}
