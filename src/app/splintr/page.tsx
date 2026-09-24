import Link from "next/link";
import type { Metadata } from "next";
import {
  fetchTracks,
  fetchUser,
  formatDuration,
  soundcloudConfigured,
  type SCTrack,
} from "@/lib/soundcloud";

export const metadata: Metadata = {
  title: "SPL!NTR",
  description: "SPL!NTR – DJ & producer draaiend RoMinimal. Stripped, rolling, hypnotic.",
};

const genres = ["RoMinimal", "Minimal Techno", "Dub-Funk", "Deep House", "Rolling Grooves", "Soulful Cuts"];

const services = [
  {
    icon: "🎧",
    title: "Club Nights",
    desc: "Stripped, rolling, hypnotic sets built for the club environment. Reading the room to keep the floor locked in all night.",
  },
  {
    icon: "🎛️",
    title: "Underground Sets",
    desc: "Warehouses, basements, and off-grid spaces. Small, underground, music-only — no show, no glitter, no hype.",
  },
  {
    icon: "🏟️",
    title: "Festivals & Outdoor",
    desc: "Stage presence and setlist experience for larger audiences, from intimate stages to bigger outdoor lineups.",
  },
  {
    icon: "💼",
    title: "Bookings & Agency",
    desc: "Booked through the ONDRSTRM agency — label, events, and management under one roof.",
  },
];

// Shown when the SoundCloud API is not yet configured
const FALLBACK_MIXES = [
  { title: "Late Night Session Vol. 3", genre: "RoMinimal", duration: "1:02:00" },
  { title: "Onderstroom Mix", genre: "Dub-Funk", duration: "45:00" },
  { title: "Rolling Grooves Journey", genre: "Minimal Techno", duration: "58:30" },
];

async function getLiveTracks(): Promise<SCTrack[] | null> {
  if (!soundcloudConfigured) return null;
  try {
    return await fetchTracks(10);
  } catch {
    return null;
  }
}

async function getSoundCloudUrl(): Promise<string> {
  if (!soundcloudConfigured) return "https://soundcloud.com/splintr";
  try {
    const user = await fetchUser();
    return user.permalink
      ? `https://soundcloud.com/${user.permalink}`
      : "https://soundcloud.com/splintr";
  } catch {
    return "https://soundcloud.com/splintr";
  }
}

function PlayIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function TrackRow({ title, genre, duration }: { title: string; genre: string; duration: string }) {
  return (
    <div className="card-dark p-5 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="w-12 h-12 rounded-xl gradient-purple-blue flex items-center justify-center text-white shrink-0">
        <PlayIcon />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold truncate">{title}</p>
        <p className="text-gray-500 text-sm">{genre}{duration ? ` · ${duration}` : ""}</p>
      </div>
      <span className="text-xs text-purple-400 border border-purple-700/40 px-3 py-1 rounded-full self-start sm:self-auto shrink-0">
        SoundCloud
      </span>
    </div>
  );
}

export default async function SplintrPage() {
  const [liveTracks, scUrl] = await Promise.all([getLiveTracks(), getSoundCloudUrl()]);

  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10">
          <p className="text-purple-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            DJ &amp; Producer
          </p>
          <h1 className="font-black text-7xl sm:text-9xl tracking-tight text-white leading-none mb-4">
            SPL<span className="gradient-text">!</span>NTR
          </h1>
          <div className="divider-neon w-24 mx-auto my-5" />
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Stripped, rolling, hypnotic — RoMinimal with dub-funk and soul influences. Romanian aesthetic, roughened by Rotterdam.
          </p>
          <Link href="/contact" className="btn-neon-filled">
            Book a Set
          </Link>
        </div>
      </section>

      {/* ─── GENRE TAGS ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-5">Sound</p>
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
          <div>
            <p className="text-purple-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">About</p>
            <h2 className="text-4xl font-black text-white mb-6">
              The Artist Behind the Decks
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                SPL!NTR has been dominating dancefloors for years, crafting sets that blend technical precision with a genuine passion for the maat — the beat, and the rare, real connection with like-minded people. Whether it&apos;s a 200-person club or an underground warehouse, the energy never drops.
              </p>
              <p>
                The artist identity behind <span className="text-pink-400 font-medium">ONDRSTRM</span>, SPL!NTR brings the same vision to the wider ecosystem — label, events, and booking agency built around one idea: small, underground, music-only.
              </p>
              <p>
                Playing on Pioneer CDJ-3000, Technics SL1200 MK2, and the Allen &amp; Heath XONE:92 — always reading the room to deliver exactly what it needs.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "100+", label: "Events played" },
              { value: "5+", label: "Years behind the decks" },
              { value: "6", label: "Sounds mastered" },
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
          <h2 className="text-4xl font-black text-white">
            {liveTracks ? "Latest Tracks" : "Mixes"}
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            {liveTracks
              ? "Live from SoundCloud — updated automatically."
              : "Check out the latest sets — or find SPL!NTR on SoundCloud for the full archive."}
          </p>
        </div>

        <div className="space-y-4">
          {liveTracks ? (
            liveTracks.length > 0 ? (
              liveTracks.map((track) => (
                <a
                  key={track.id}
                  href={track.permalink_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <TrackRow
                    title={track.title}
                    genre={track.genre}
                    duration={formatDuration(track.duration)}
                  />
                </a>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No public tracks yet.</p>
            )
          ) : (
            FALLBACK_MIXES.map((mix) => (
              <TrackRow key={mix.title} title={mix.title} genre={mix.genre} duration={mix.duration} />
            ))
          )}
        </div>

        <div className="text-center mt-10">
          <a
            href={scUrl}
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
            Fill in the booking form and SPL!NTR will get back to you within 24 hours to discuss your event.
          </p>
          <Link href="/contact" className="btn-neon-filled">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
