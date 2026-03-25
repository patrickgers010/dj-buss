import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FEEST – Swopster Gatherings",
  description: "FEEST by Swopster Gatherings – The ultimate party experience with DJ GERS.",
};

const lineup = [
  { name: "DJ GERS", role: "Headliner", time: "22:00 – 00:00", highlight: true },
  { name: "TBA", role: "Support DJ", time: "20:00 – 22:00", highlight: false },
  { name: "TBA", role: "Opening DJ", time: "18:00 – 20:00", highlight: false },
];

const faqs = [
  {
    q: "Where is FEEST taking place?",
    a: "Venue details will be announced closer to the event date. Follow us on social media for updates.",
  },
  {
    q: "How can I get tickets?",
    a: "Tickets will be available through our ticketing partner. Sign up to be notified when they go on sale.",
  },
  {
    q: "Is there an age restriction?",
    a: "FEEST is an 18+ event. Valid ID required on entry.",
  },
  {
    q: "Can I bring a camera?",
    a: "Phones are welcome. Professional cameras require prior approval from the organizing team.",
  },
];

export default function FeestPage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-20">
        {/* Multi-color glow */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-pink-700/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-purple-700/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-pink-400 uppercase tracking-[0.3em] text-xs font-semibold mb-2">
            Swopster Gatherings presents
          </p>
          <h1 className="font-black text-[clamp(5rem,20vw,14rem)] tracking-tight leading-none mb-4">
            <span className="gradient-text-feest">FEEST</span>
          </h1>
          <p className="text-white text-xl font-semibold mb-2">Edition 3</p>
          <div className="w-32 h-0.5 mx-auto my-5" style={{ background: 'linear-gradient(90deg, transparent, #ec4899, #f59e0b, transparent)' }} />
          <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed mb-4">
            The party you&apos;ve been waiting for. Bigger, louder, and more electric than ever. DJ GERS + special guests.
          </p>

          {/* Event info pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="px-4 py-2 rounded-full text-sm border border-pink-500/40 bg-pink-500/10 text-pink-300">
              📅 Date TBA
            </span>
            <span className="px-4 py-2 rounded-full text-sm border border-yellow-500/40 bg-yellow-500/10 text-yellow-300">
              📍 Location TBA
            </span>
            <span className="px-4 py-2 rounded-full text-sm border border-purple-500/40 bg-purple-500/10 text-purple-300">
              🎟️ Tickets Coming Soon
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-pink">
              Get Notified
            </Link>
            <Link href="/contact" className="btn-neon text-sm">
              Group Bookings
            </Link>
          </div>
        </div>
      </section>

      <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #ec4899, #f59e0b, #a855f7, transparent)' }} />

      {/* ─── WHAT IS FEEST? ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">What is FEEST?</p>
            <h2 className="text-4xl font-black text-white mb-6">
              More than a party.<br />It&apos;s an experience.
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                <span className="text-white font-bold">FEEST</span> (Dutch for &ldquo;party&rdquo; or &ldquo;feast&rdquo;) is the flagship event of Swopster Gatherings — a full-on celebration of music, people, and pure joy.
              </p>
              <p>
                Each edition raises the bar. New venue, bigger lineup, and a crowd that comes ready to dance. FEEST has become one of the most anticipated events on the calendar.
              </p>
              <p>
                Edition 3 promises to be the biggest yet. Stay tuned for announcements.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🎧", label: "Live DJ Sets" },
              { icon: "🔊", label: "Premium Sound" },
              { icon: "💡", label: "Lighting Show" },
              { icon: "🥂", label: "Full Bar" },
              { icon: "📸", label: "Photo Moments" },
              { icon: "🤝", label: "Great Crowd" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-4 rounded-xl border text-sm"
                style={{ background: '#10101c', borderColor: 'rgba(245,158,11,0.2)' }}
              >
                <span className="text-xl">{icon}</span>
                <span className="text-gray-300 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LINEUP ───────────────────────────────────────────── */}
      <section className="bg-[#0c0c18] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-pink-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Artists</p>
            <h2 className="text-4xl font-black text-white">Lineup</h2>
            <p className="text-gray-500 text-sm mt-2">Full lineup to be announced</p>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {lineup.map((artist) => (
              <div
                key={artist.name}
                className="flex items-center gap-5 p-5 rounded-xl border transition-all"
                style={{
                  background: artist.highlight ? 'rgba(236,72,153,0.05)' : '#10101c',
                  borderColor: artist.highlight ? 'rgba(236,72,153,0.4)' : 'rgba(255,255,255,0.05)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg shrink-0"
                  style={{
                    background: artist.highlight
                      ? 'linear-gradient(135deg, #ec4899, #a855f7)'
                      : 'rgba(255,255,255,0.05)',
                  }}
                >
                  {artist.name[0]}
                </div>
                <div className="flex-1">
                  <p className={`font-black text-lg ${artist.highlight ? 'text-white' : 'text-gray-400'}`}>
                    {artist.name}
                  </p>
                  <p className="text-gray-500 text-xs">{artist.role}</p>
                </div>
                <span className="text-xs text-gray-500 font-mono">{artist.time}</span>
                {artist.highlight && (
                  <span className="text-xs text-pink-400 bg-pink-500/10 border border-pink-500/30 px-2 py-0.5 rounded-full">
                    Headliner
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TICKET CTA ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div
          className="rounded-2xl p-12 text-center border relative overflow-hidden"
          style={{ borderColor: 'rgba(236,72,153,0.4)', background: '#10101c' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-purple-900/10 to-yellow-900/5 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-6xl font-black mb-4">
              <span className="gradient-text-feest">FEEST</span>
            </p>
            <p className="text-gray-400 mb-3 text-lg">Tickets dropping soon</p>
            <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
              Sign up to get notified the moment tickets go on sale. Early bird spots sell out fast.
            </p>
            <Link href="/contact" className="btn-pink text-base">
              Notify Me
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white">FAQ</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="p-5 rounded-xl border"
              style={{ background: '#10101c', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <p className="text-white font-semibold mb-2">{faq.q}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
