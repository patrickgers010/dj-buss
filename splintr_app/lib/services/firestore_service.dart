import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/event.dart';
import '../models/ticket.dart';
import '../models/artist.dart';
import '../models/post.dart';

class FirestoreService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  // ── Events ─────────────────────────────────────────────────

  Stream<List<Event>> getEvents() {
    return _db
        .collection('events')
        .orderBy('isUpcoming', descending: true)
        .snapshots()
        .map((snap) =>
            snap.docs.map((doc) => Event.fromMap(doc.data(), doc.id)).toList());
  }

  Future<Event?> getEvent(String eventId) async {
    final doc = await _db.collection('events').doc(eventId).get();
    if (!doc.exists) return null;
    return Event.fromMap(doc.data()!, doc.id);
  }

  // ── Ticket Types ───────────────────────────────────────────

  Stream<List<TicketType>> getTicketTypes(String eventId) {
    return _db
        .collection('ticketTypes')
        .where('eventId', isEqualTo: eventId)
        .snapshots()
        .map((snap) => snap.docs
            .map((doc) => TicketType.fromMap(doc.data(), doc.id))
            .toList());
  }

  // ── Purchased Tickets ──────────────────────────────────────

  Stream<List<PurchasedTicket>> getMyTickets(String userId) {
    return _db
        .collection('purchasedTickets')
        .where('userId', isEqualTo: userId)
        .orderBy('purchasedAt', descending: true)
        .snapshots()
        .map((snap) => snap.docs
            .map((doc) => PurchasedTicket.fromMap(doc.data(), doc.id))
            .toList());
  }

  // ── Artists ────────────────────────────────────────────────

  Stream<List<Artist>> getArtists() {
    return _db.collection('artists').snapshots().map((snap) =>
        snap.docs.map((doc) => Artist.fromMap(doc.data(), doc.id)).toList());
  }

  Future<Artist?> getArtist(String artistId) async {
    final doc = await _db.collection('artists').doc(artistId).get();
    if (!doc.exists) return null;
    return Artist.fromMap(doc.data()!, doc.id);
  }

  // ── Posts (Community Feed) ─────────────────────────────────

  Stream<List<Post>> getFeed({int limit = 20}) {
    return _db
        .collection('posts')
        .orderBy('createdAt', descending: true)
        .limit(limit)
        .snapshots()
        .map((snap) =>
            snap.docs.map((doc) => Post.fromMap(doc.data(), doc.id)).toList());
  }

  Future<void> createPost(Post post) async {
    await _db.collection('posts').add({
      'authorId': post.authorId,
      'authorName': post.authorName,
      'authorImageUrl': post.authorImageUrl,
      'type': post.type.name,
      'mediaUrl': post.mediaUrl,
      'thumbnailUrl': post.thumbnailUrl,
      'caption': post.caption,
      'tags': post.tags,
      'likeCount': 0,
      'commentCount': 0,
      'shareCount': 0,
      'createdAt': FieldValue.serverTimestamp(),
      'linkedEventId': post.linkedEventId,
    });
  }

  Future<void> toggleLike(String postId, String userId) async {
    final likeRef = _db
        .collection('posts')
        .doc(postId)
        .collection('likes')
        .doc(userId);

    final likeDoc = await likeRef.get();

    if (likeDoc.exists) {
      await likeRef.delete();
      await _db.collection('posts').doc(postId).update({
        'likeCount': FieldValue.increment(-1),
      });
    } else {
      await likeRef.set({
        'createdAt': FieldValue.serverTimestamp(),
      });
      await _db.collection('posts').doc(postId).update({
        'likeCount': FieldValue.increment(1),
      });
    }
  }
}
