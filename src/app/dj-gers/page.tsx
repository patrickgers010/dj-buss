import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DJ GERS",
  description: "DJ GERS – Professional DJ for clubs, parties, festivals, and corporate events.",
};

const genres = ["House", "Tech House", "Deep House", "Hip-Hop", "R&B", "Afrobeats", "Commercial"];

const services = [
  {
    icon: "🎧",
    title: "Club Nights",
    desc: "High-energy sets tailored for the club environment. Crowd-reading skills that keep the dancefloor packed all night.",
  },
  {
    icon: "🎉",
    title: "Private Parties",
    desc: "Birthdays, weddings, and private celebrations. Custom setlists to match your vibe and guest list.",
  },
  {
    icon: "🏟️",
    title: "Festivals & Outdoor",
    desc: "Stage presence and setlist experience for larger audiences. From small festivals to big outdoor stages.",
  },
  {
    icon: "💼",
    title: "Corporate Events",
    desc: "Professional DJ service for brand launches, office parties, and corporate gatherings.",
  },
];

const mixes = [
  {
    title: "Late Night Session Vol. 3",
    genre: "Tech House",
    duration: "1:02:00",
    embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/placeholder&color=%23a855f7&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
  },
  {
    title: "Afro Heat Mix",
    genre: "Afrobeats",
    duration: "45:00",
    embed: null,
  },
  {
    title: "Deep House Journey",
    genre: "Deep House",
    duration: "58:30",
    embed: null,
  },
];

export default function DjGersPage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-purple-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            Professional DJ
          </p>
          <h1 className="font-black text-7xl sm:text-9xl tracking-tight text-white leading-none mb-4">
            DJ<span className="gradient-text">GERS</span>
          </h1>
          <div className="divider-neon w-24 mx-auto my-5" />
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Bringing raw energy, technical skill, and an unmatched feel for the crowd to every performance.
          </p>
          <Link href="/contact" className="btn-neon-filled">
            Book a Set
          </Link>
        </div>
      </section>

      {/* ─── GENRE TAGS ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-5">Genres</p>
        <div className="flex flex-wrap justify-center gap-3">
          {genres.map((g) => (
            <span
              key={g}
              className="px-4 py-1.5 rounded-full text-sm text-purple-300 border border-purple-700/40 bg-purple-900/20"
            >
              {g}
            </span>
          ))}
        </div>
      </section>

      <div className="divider-neon" />

      {/* ─── ABOUT ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-purple-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">About</p>
            <h2 className="text-4xl font-black text-white mb-6">
              The DJ Behind the Decks
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                DJ GERS has been dominating dancefloors for years, crafting sets that blend technical precision with genuine passion for music. Whether it&apos;s a 200-person club or an outdoor festival stage, the energy never drops.
              </p>
              <p>
                Founder of <span className="text-pink-400 font-medium">Swopster Gatherings</span>, DJ GERS brings the same vision to event creation — building experiences that go beyond the music and create lasting memories for everyone in the room.
              </p>
              <p>
                Specializing in House, Tech House, and Afrobeats, but always reading the room to deliver exactly what the crowd needs.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "100+", label: "Events played" },
              { value: "5+", label: "Years behind the decks" },
              { value: "7", label: "Genres mastered" },
              { value: "1", label: "Goal: your best night" },
            ].map(({ value, label }) => (
              <div key={label} className="card-dark p-6 text-center">
                <p className="text-3xl font-black gradient-text mb-1">{value}</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────── */}
      <section className="bg-[#0c0c18] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-purple-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">What I Do</p>
            <h2 className="text-4xl font-black text-white">Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="card-dark p-6 flex flex-col gap-3">
                <span className="text-3xl">{s.icon}</span>
                <h3 className="text-white font-bold text-lg">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MIXES ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-purple-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Listen</p>
          <h2 className="text-4xl font-black text-white">Mixes</h2>
          <p className="text-gray-500 text-sm mt-2">
            Check out the latest sets — or find DJ GERS on SoundCloud for the full archive.
          </p>
        </div>

        <div className="space-y-4">
          {mixes.map((mix) => (
            <div key={mix.title} className="card-dark p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-purple-blue flex items-center justify-center text-white shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">{mix.title}</p>
                <p className="text-gray-500 text-sm">{mix.genre} · {mix.duration}</p>
              </div>
              <span className="text-xs text-purple-400 border border-purple-700/40 px-3 py-1 rounded-full self-start sm:self-auto">
                SoundCloud
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://soundcloud.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon text-sm"
          >
            Full Archive on SoundCloud
          </a>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="card-dark p-12 text-center">
          <h3 className="text-3xl font-black text-white mb-3">Ready to book?</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Fill in the booking form and DJ GERS will get back to you within 24 hours to discuss your event.
          </p>
          <Link href="/contact" className="btn-neon-filled">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
