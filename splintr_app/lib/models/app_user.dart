class AppUser {
  final String id;
  final String email;
  final String displayName;
  final String? avatarUrl;
  final List<String> purchasedTicketIds;
  final List<String> likedPostIds;
  final List<String> savedEventIds;
  final bool hasSwopsterAccount;
  final DateTime createdAt;

  const AppUser({
    required this.id,
    required this.email,
    required this.displayName,
    this.avatarUrl,
    this.purchasedTicketIds = const [],
    this.likedPostIds = const [],
    this.savedEventIds = const [],
    this.hasSwopsterAccount = false,
    required this.createdAt,
  });

  factory AppUser.fromMap(Map<String, dynamic> map, String id) {
    return AppUser(
      id: id,
      email: map['email'] as String,
      displayName: map['displayName'] as String,
      avatarUrl: map['avatarUrl'] as String?,
      purchasedTicketIds: List<String>.from(map['purchasedTicketIds'] as List? ?? []),
      likedPostIds: List<String>.from(map['likedPostIds'] as List? ?? []),
      savedEventIds: List<String>.from(map['savedEventIds'] as List? ?? []),
      hasSwopsterAccount: map['hasSwopsterAccount'] as bool? ?? false,
      createdAt: DateTime.fromMillisecondsSinceEpoch(map['createdAt'] as int),
    );
  }

  Map<String, dynamic> toMap() => {
    'email': email,
    'displayName': displayName,
    'avatarUrl': avatarUrl,
    'purchasedTicketIds': purchasedTicketIds,
    'likedPostIds': likedPostIds,
    'savedEventIds': savedEventIds,
    'hasSwopsterAccount': hasSwopsterAccount,
    'createdAt': createdAt.millisecondsSinceEpoch,
  };

  AppUser copyWith({
    String? displayName,
    String? avatarUrl,
    List<String>? purchasedTicketIds,
    List<String>? likedPostIds,
    List<String>? savedEventIds,
    bool? hasSwopsterAccount,
  }) {
    return AppUser(
      id: id,
      email: email,
      displayName: displayName ?? this.displayName,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      purchasedTicketIds: purchasedTicketIds ?? this.purchasedTicketIds,
      likedPostIds: likedPostIds ?? this.likedPostIds,
      savedEventIds: savedEventIds ?? this.savedEventIds,
      hasSwopsterAccount: hasSwopsterAccount ?? this.hasSwopsterAccount,
      createdAt: createdAt,
    );
  }
}
