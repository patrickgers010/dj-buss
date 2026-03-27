class Event {
  final String id;
  final String name;
  final String edition;
  final String description;
  final DateTime? date;
  final String? venue;
  final String? city;
  final String imageUrl;
  final List<String> artistIds;
  final bool isUpcoming;
  final String status; // 'upcoming' | 'past' | 'live'
  final double? ticketPriceFrom;
  final bool isFeatured;

  const Event({
    required this.id,
    required this.name,
    required this.edition,
    required this.description,
    this.date,
    this.venue,
    this.city,
    required this.imageUrl,
    this.artistIds = const [],
    required this.isUpcoming,
    required this.status,
    this.ticketPriceFrom,
    this.isFeatured = false,
  });

  factory Event.fromMap(Map<String, dynamic> map, String id) {
    return Event(
      id: id,
      name: map['name'] as String,
      edition: map['edition'] as String? ?? '',
      description: map['description'] as String? ?? '',
      date: map['date'] != null
          ? DateTime.fromMillisecondsSinceEpoch(map['date'] as int)
          : null,
      venue: map['venue'] as String?,
      city: map['city'] as String?,
      imageUrl: map['imageUrl'] as String? ?? '',
      artistIds: List<String>.from(map['artistIds'] as List? ?? []),
      isUpcoming: map['isUpcoming'] as bool? ?? false,
      status: map['status'] as String? ?? 'past',
      ticketPriceFrom: (map['ticketPriceFrom'] as num?)?.toDouble(),
      isFeatured: map['isFeatured'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toMap() => {
    'name': name,
    'edition': edition,
    'description': description,
    'date': date?.millisecondsSinceEpoch,
    'venue': venue,
    'city': city,
    'imageUrl': imageUrl,
    'artistIds': artistIds,
    'isUpcoming': isUpcoming,
    'status': status,
    'ticketPriceFrom': ticketPriceFrom,
    'isFeatured': isFeatured,
  };

  // ── Sample data ──────────────────────────────────────────────
  static List<Event> get samples => [
    const Event(
      id: 'feest-3',
      name: 'FEEST',
      edition: 'Edition 3',
      description: 'De grootste editie ooit. DJ GERS headliner met speciale gasten.',
      imageUrl: '',
      isUpcoming: true,
      status: 'upcoming',
      ticketPriceFrom: 12.50,
      isFeatured: true,
    ),
    const Event(
      id: 'feest-2',
      name: 'FEEST',
      edition: 'Edition 2',
      description: 'De tweede editie die de lat nog hoger legde.',
      imageUrl: '',
      isUpcoming: false,
      status: 'past',
    ),
    const Event(
      id: 'feest-1',
      name: 'FEEST',
      edition: 'Edition 1',
      description: 'Waar het allemaal begon. De eerste FEEST.',
      imageUrl: '',
      isUpcoming: false,
      status: 'past',
    ),
  ];
}
