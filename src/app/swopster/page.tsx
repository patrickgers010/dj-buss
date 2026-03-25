import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swopster Gatherings",
  description:
    "Swopster Gatherings – Community-driven events and experiences. Organizers of FEEST.",
};

const values = [
  {
    icon: "🤝",
    title: "Community First",
    desc: "Every event is built around bringing people together. The community is the party.",
  },
  {
    icon: "🎵",
    title: "Music as the Core",
    desc: "Curated lineups and quality sound at every event. Music is the heartbeat of everything we do.",
  },
  {
    icon: "✨",
    title: "Unique Experiences",
    desc: "No two events are the same. Each gathering is designed to be one-of-a-kind.",
  },
  {
    icon: "🔥",
    title: "Pure Energy",
    desc: "From setup to teardown, every detail is crafted to maximize the energy in the room.",
  },
];

const events = [
  {
    name: "FEEST",
    edition: "Edition 3",
    status: "upcoming",
    desc: "The flagship event of Swopster Gatherings. A full-scale party experience featuring DJ GERS and special guests.",
    href: "/feest",
  },
  {
    name: "FEEST",
    edition: "Edition 2",
    status: "past",
    desc: "The second edition raised the bar with an extended lineup and an unforgettable crowd.",
    href: "/gallery",
  },
  {
    name: "FEEST",
    edition: "Edition 1",
    status: "past",
    desc: "Where it all started. The first FEEST proved that Swopster Gatherings was here to stay.",
    href: "/gallery",
  },
];

export default function SwopsterPage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-pink-700/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-700/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-pink-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            Events Organization
          </p>
          <h1 className="font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white leading-none mb-2">
            Swopster
          </h1>
          <h1 className="font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none mb-4">
            <span className="text-pink-400">Gatherings</span>
          </h1>
          <div className="w-24 h-0.5 mx-auto my-5" style={{ background: 'linear-gradient(90deg, transparent, #ec4899, #a855f7, transparent)' }} />
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            We don&apos;t just organize events — we create moments that people talk about for years.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/feest" className="btn-pink">
              Upcoming: FEEST
            </Link>
            <Link href="/contact" className="btn-neon text-sm">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-pink-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Our Story</p>
            <h2 className="text-4xl font-black text-white mb-6">
              Born from a love of music and people
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Swopster Gatherings was founded by <span className="text-white font-medium">DJ GERS</span> with one goal: to create events that feel genuinely special. Not just another night out, but an experience that stays with you.
              </p>
              <p>
                Starting with small community gatherings and growing into full-scale events, Swopster Gatherings has built a reputation for quality production, great music, and an atmosphere that can&apos;t be faked.
              </p>
              <p>
                The <span className="text-yellow-400 font-medium">FEEST</span> event series is our flagship — a celebration of everything Swopster Gatherings stands for.
              </p>
            </div>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-2 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-5 rounded-xl border border-pink-500/20 bg-[#10101c] hover:border-pink-500/50 transition-colors"
              >
                <span className="text-2xl mb-2 block">{v.icon}</span>
                <h3 className="text-white font-bold text-sm mb-1">{v.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #ec4899, #a855f7, transparent)' }} />

      {/* ─── EVENTS TIMELINE ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-pink-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">History</p>
          <h2 className="text-4xl font-black text-white">Events</h2>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          {events.map((e) => (
            <div
              key={`${e.name}-${e.edition}`}
              className="flex gap-5 items-start p-5 rounded-xl border transition-colors"
              style={{
                background: '#10101c',
                borderColor: e.status === 'upcoming' ? 'rgba(236,72,153,0.4)' : 'rgba(255,255,255,0.05)',
              }}
            >
              <div className="shrink-0 mt-1">
                {e.status === 'upcoming' ? (
                  <span className="w-3 h-3 rounded-full bg-pink-500 block shadow-[0_0_8px_#ec4899]" />
                ) : (
                  <span className="w-3 h-3 rounded-full bg-gray-700 block" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-black text-lg">{e.name}</h3>
                  <span className="text-xs text-gray-500">{e.edition}</span>
                  {e.status === 'upcoming' && (
                    <span className="text-xs text-pink-400 bg-pink-500/10 border border-pink-500/30 px-2 py-0.5 rounded-full ml-1">
                      Upcoming
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{e.desc}</p>
                <Link
                  href={e.href}
                  className="text-xs text-pink-400 hover:text-pink-300 transition-colors"
                >
                  {e.status === 'upcoming' ? 'View details →' : 'See photos →'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className="rounded-2xl p-12 text-center border"
          style={{ background: '#10101c', borderColor: 'rgba(236,72,153,0.3)' }}
        >
          <h3 className="text-3xl font-black text-white mb-3">Want to collaborate?</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Interested in partnering with Swopster Gatherings for your event or brand? Get in touch.
          </p>
          <Link href="/contact" className="btn-pink">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
