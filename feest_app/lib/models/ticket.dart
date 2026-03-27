class TicketType {
  final String id;
  final String eventId;
  final String name;
  final String description;
  final double price;
  final int? totalAvailable;
  final int? sold;
  final bool isAvailable;
  final List<String> perks;

  const TicketType({
    required this.id,
    required this.eventId,
    required this.name,
    required this.description,
    required this.price,
    this.totalAvailable,
    this.sold,
    required this.isAvailable,
    this.perks = const [],
  });

  int? get remaining => totalAvailable != null && sold != null
      ? totalAvailable! - sold!
      : null;

  factory TicketType.fromMap(Map<String, dynamic> map, String id) {
    return TicketType(
      id: id,
      eventId: map['eventId'] as String,
      name: map['name'] as String,
      description: map['description'] as String? ?? '',
      price: (map['price'] as num).toDouble(),
      totalAvailable: map['totalAvailable'] as int?,
      sold: map['sold'] as int?,
      isAvailable: map['isAvailable'] as bool? ?? true,
      perks: List<String>.from(map['perks'] as List? ?? []),
    );
  }

  // ── Sample ticket types ──────────────────────────────────────
  static List<TicketType> get samplesFeest3 => [
    const TicketType(
      id: 'early-bird',
      eventId: 'feest-3',
      name: 'Early Bird',
      description: 'Vroegboekkorting – beperkte beschikbaarheid',
      price: 12.50,
      totalAvailable: 100,
      sold: 87,
      isAvailable: true,
      perks: ['Toegang tot het event', 'Welkomstdrankje'],
    ),
    const TicketType(
      id: 'regular',
      eventId: 'feest-3',
      name: 'Regular',
      description: 'Standaard toegangsticket',
      price: 17.50,
      totalAvailable: 300,
      sold: 142,
      isAvailable: true,
      perks: ['Toegang tot het event'],
    ),
    const TicketType(
      id: 'vip',
      eventId: 'feest-3',
      name: 'VIP',
      description: 'Premium ervaring met exclusieve voordelen',
      price: 35.00,
      totalAvailable: 50,
      sold: 18,
      isAvailable: true,
      perks: [
        'Toegang tot het event',
        'VIP lounge toegang',
        'Meet & Greet DJ GERS',
        'Gratis drankjes (3x)',
        'Vroege ingang',
      ],
    ),
  ];
}

class PurchasedTicket {
  final String id;
  final String userId;
  final String ticketTypeId;
  final String eventId;
  final String eventName;
  final String ticketTypeName;
  final double pricePaid;
  final DateTime purchasedAt;
  final String qrCode;
  final bool isUsed;
  final bool isTransferable;

  const PurchasedTicket({
    required this.id,
    required this.userId,
    required this.ticketTypeId,
    required this.eventId,
    required this.eventName,
    required this.ticketTypeName,
    required this.pricePaid,
    required this.purchasedAt,
    required this.qrCode,
    this.isUsed = false,
    this.isTransferable = true,
  });

  factory PurchasedTicket.fromMap(Map<String, dynamic> map, String id) {
    return PurchasedTicket(
      id: id,
      userId: map['userId'] as String,
      ticketTypeId: map['ticketTypeId'] as String,
      eventId: map['eventId'] as String,
      eventName: map['eventName'] as String,
      ticketTypeName: map['ticketTypeName'] as String,
      pricePaid: (map['pricePaid'] as num).toDouble(),
      purchasedAt: DateTime.fromMillisecondsSinceEpoch(map['purchasedAt'] as int),
      qrCode: map['qrCode'] as String,
      isUsed: map['isUsed'] as bool? ?? false,
      isTransferable: map['isTransferable'] as bool? ?? true,
    );
  }
}
