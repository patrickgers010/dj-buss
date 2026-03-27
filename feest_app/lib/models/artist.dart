class Artist {
  final String id;
  final String name;
  final String role;
  final String bio;
  final String imageUrl;
  final List<String> genres;
  final Map<String, String> socials; // e.g. {'instagram': '@djgers', 'soundcloud': 'djgers'}
  final List<Mix> mixes;
  final bool isHeadliner;

  const Artist({
    required this.id,
    required this.name,
    required this.role,
    required this.bio,
    required this.imageUrl,
    this.genres = const [],
    this.socials = const {},
    this.mixes = const [],
    this.isHeadliner = false,
  });

  factory Artist.fromMap(Map<String, dynamic> map, String id) {
    return Artist(
      id: id,
      name: map['name'] as String,
      role: map['role'] as String? ?? 'DJ',
      bio: map['bio'] as String? ?? '',
      imageUrl: map['imageUrl'] as String? ?? '',
      genres: List<String>.from(map['genres'] as List? ?? []),
      socials: Map<String, String>.from(map['socials'] as Map? ?? {}),
      mixes: (map['mixes'] as List? ?? [])
          .map((m) => Mix.fromMap(m as Map<String, dynamic>))
          .toList(),
      isHeadliner: map['isHeadliner'] as bool? ?? false,
    );
  }

  static List<Artist> get samples => [
    const Artist(
      id: 'dj-gers',
      name: 'DJ GERS',
      role: 'Headliner DJ',
      bio: 'DJ GERS brengt jarenlang dancefloors aan het bewegen. Oprichter van Swopster Gatherings en het FEEST evenementenserie. Gespecialiseerd in House, Tech House en Afrobeats.',
      imageUrl: '',
      genres: ['House', 'Tech House', 'Deep House', 'Afrobeats', 'Hip-Hop'],
      socials: {
        'instagram': '@djgers',
        'soundcloud': 'djgers',
        'tiktok': '@djgers',
      },
      mixes: [
        Mix(title: 'Late Night Session Vol. 3', genre: 'Tech House', duration: '1:02:00'),
        Mix(title: 'Afro Heat Mix', genre: 'Afrobeats', duration: '45:00'),
        Mix(title: 'Deep House Journey', genre: 'Deep House', duration: '58:30'),
      ],
      isHeadliner: true,
    ),
  ];
}

class Mix {
  final String title;
  final String genre;
  final String duration;
  final String? soundcloudUrl;

  const Mix({
    required this.title,
    required this.genre,
    required this.duration,
    this.soundcloudUrl,
  });

  factory Mix.fromMap(Map<String, dynamic> map) {
    return Mix(
      title: map['title'] as String,
      genre: map['genre'] as String,
      duration: map['duration'] as String,
      soundcloudUrl: map['soundcloudUrl'] as String?,
    );
  }
}
