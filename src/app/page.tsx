import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DJ GERS | Swopster Gatherings – Home",
};

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4">
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-700/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-purple-400 uppercase tracking-[0.3em] text-sm font-semibold mb-6">
            DJ · Events · Community
          </p>

          <h1 className="font-black text-6xl sm:text-8xl md:text-9xl tracking-tight text-white mb-4 leading-none">
            DJ<span className="gradient-text">GERS</span>
          </h1>

          <div className="divider-neon w-32 mx-auto my-6" />

          <p className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed mb-10">
            Professional DJ. Unforgettable nights.<br />
            The driving force behind{" "}
            <span className="text-pink-400 font-semibold">Swopster Gatherings</span>{" "}
            &amp; the legendary{" "}
            <span className="text-yellow-400 font-semibold">FEEST</span> events.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-neon-filled text-sm">
              Book DJ GERS
            </Link>
            <Link href="/feest" className="btn-pink text-sm">
              Next FEEST &rarr;
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ─── TWO BRANDS ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-8">
          {/* DJ GERS card */}
          <div className="card-dark p-8 flex flex-col gap-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all pointer-events-none" />
            <div className="w-14 h-14 rounded-xl gradient-purple-blue flex items-center justify-center text-white font-black text-xl shadow-lg">
              G
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              DJ <span className="gradient-text">GERS</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              From intimate club nights to massive outdoor stages — DJ GERS delivers high-energy sets that keep the crowd moving from first drop to last beat.
            </p>
            <ul className="text-sm text-gray-500 space-y-1 mt-1">
              <li className="flex items-center gap-2"><span className="text-purple-400">▸</span> Club nights & private parties</li>
              <li className="flex items-center gap-2"><span className="text-purple-400">▸</span> Festival & outdoor events</li>
              <li className="flex items-center gap-2"><span className="text-purple-400">▸</span> Corporate & brand events</li>
            </ul>
            <Link href="/dj-gers" className="btn-neon self-start text-sm mt-2">
              Explore DJ GERS
            </Link>
          </div>

          {/* Swopster card */}
          <div className="card-dark p-8 flex flex-col gap-4 relative overflow-hidden group" style={{ borderColor: 'rgba(236, 72, 153, 0.2)' }}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-600/10 rounded-full blur-3xl group-hover:bg-pink-600/20 transition-all pointer-events-none" />
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
              S
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Swopster <span className="text-pink-400">Gatherings</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              More than just events — Swopster Gatherings creates spaces where community, music, and culture collide. Every event is a memory in the making.
            </p>
            <ul className="text-sm text-gray-500 space-y-1 mt-1">
              <li className="flex items-center gap-2"><span className="text-pink-400">▸</span> Community-driven events</li>
              <li className="flex items-center gap-2"><span className="text-pink-400">▸</span> The FEEST series</li>
              <li className="flex items-center gap-2"><span className="text-pink-400">▸</span> Unique themed experiences</li>
            </ul>
            <Link href="/swopster" className="btn-pink self-start text-sm mt-2">
              Explore Swopster
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEEST TEASER ────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-yellow-900/10 pointer-events-none" />
        <div className="divider-neon mb-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <p className="text-pink-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
            Swopster Gatherings presents
          </p>
          <h2 className="font-black text-7xl sm:text-9xl tracking-tight mb-4">
            <span className="gradient-text-feest">FEEST</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            The party you&apos;ve been waiting for. Live DJ sets, electric atmosphere, and a crowd that knows how to celebrate.
          </p>
          <Link href="/feest" className="btn-pink text-base">
            View Event Details
          </Link>
        </div>
        <div className="divider-neon mt-0" />
      </section>

      {/* ─── QUICK STATS ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "100+", label: "Events Played" },
            { value: "5+", label: "Years Experience" },
            { value: "3", label: "FEEST Editions" },
            { value: "∞", label: "Good Vibes" },
          ].map(({ value, label }) => (
            <div key={label} className="card-dark p-6">
              <p className="text-4xl font-black gradient-text mb-1">{value}</p>
              <p className="text-gray-500 text-sm uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 gradient-purple-blue opacity-10 pointer-events-none" />
          <div className="border border-purple-500/30 rounded-2xl p-12 text-center relative">
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Ready to make it unforgettable?
            </h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book DJ GERS for your next event or get in touch to find out more about Swopster Gatherings.
            </p>
            <Link href="/contact" className="btn-neon-filled text-base">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
