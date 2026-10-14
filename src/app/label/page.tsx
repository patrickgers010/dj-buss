import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Label & Events",
  description: "ONDRSTRM — record label and events. Releases, editions, and what to expect.",
};

const editions = [
  { tag: "ONDRSTRM 003", status: "upcoming", desc: "SPL!NTR + special guests. Venue and date TBA." },
  { tag: "ONDRSTRM 002", status: "past", desc: "Extended lineup, bigger room, same undercurrent." },
  { tag: "ONDRSTRM 001", status: "past", desc: "Where it started. Small room, right people." },
];

const faqs = [
  { q: "Where is the next edition?", a: "Announced closer to the date. No pre-hype, no countdown clock." },
  { q: "How do I get a ticket?", a: "Through the ticketing partner once it opens. Sign up via contact to be notified." },
  { q: "Age restriction?", a: "18+. Valid ID on entry." },
];

export default function LabelPage() {
  return (
    <div className="px-5 sm:px-8 lg:px-16 py-24 max-w-5xl mx-auto">
      {/* ─── LABEL ──────────────────────────────────────────── */}
      <section className="mb-28">
        <p className="eyebrow mb-5">The Label</p>
        <h1 className="font-display font-black uppercase leading-[0.95] tracking-tight text-[clamp(2.4rem,7vw,4.2rem)] mb-7">
          Releases, not products.
        </h1>
        <div className="hairline-rule mb-8" />
        <p className="text-[#f2f1ec]/85 text-lg leading-relaxed max-w-[560px] mb-4">
          ONDRSTRM presses what it plays. RoMinimal — stripped, rolling, hypnotic —
          released when it&apos;s right, not on a schedule.
        </p>
        <p className="text-[#8a8a84] text-sm">Catalogue — in progress.</p>
      </section>

      {/* ─── EVENTS ─────────────────────────────────────────── */}
      <section className="mb-20">
        <p className="eyebrow mb-5">The Events</p>
        <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight text-[clamp(2rem,5vw,3rem)] mb-9">
          Editions
        </h2>

        <div className="space-y-px">
          {editions.map((e) => (
            <div
              key={e.tag}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 py-5 border-t border-[rgba(242,241,236,0.14)]"
            >
              <span className={`font-display text-sm tracking-wide w-36 shrink-0 ${e.status === "upcoming" ? "text-[#ff4b1f]" : "text-[#8a8a84]"}`}>
                {e.tag}
              </span>
              <p className="text-[#f2f1ec]/80 text-sm leading-relaxed">{e.desc}</p>
              {e.status === "upcoming" && (
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#ff4b1f] sm:ml-auto">
                  Upcoming
                </span>
              )}
            </div>
          ))}
          <div className="border-t border-[rgba(242,241,236,0.14)]" />
        </div>
      </section>

      {/* ─── LINEUP (next edition) ──────────────────────────── */}
      <section className="mb-20">
        <p className="eyebrow mb-5">Next Edition — Lineup</p>
        <div className="space-y-px">
          {[
            { name: "SPL!NTR", role: "Headliner", time: "22:00 – 00:00" },
            { name: "TBA", role: "Support", time: "20:00 – 22:00" },
            { name: "TBA", role: "Opening", time: "18:00 – 20:00" },
          ].map((a) => (
            <div key={a.role} className="flex items-center gap-6 py-4 border-t border-[rgba(242,241,236,0.14)]">
              <span className={`font-display text-base w-28 shrink-0 ${a.name === "SPL!NTR" ? "text-[#f2f1ec]" : "text-[#8a8a84]"}`}>
                {a.name}
              </span>
              <span className="text-[#8a8a84] text-xs uppercase tracking-[0.14em]">{a.role}</span>
              <span className="coord-tag ml-auto">{a.time}</span>
            </div>
          ))}
          <div className="border-t border-[rgba(242,241,236,0.14)]" />
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────── */}
      <section className="mb-20">
        <p className="eyebrow mb-5">A Few Things</p>
        <div className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <p className="text-[#f2f1ec] text-sm font-medium mb-1">{f.q}</p>
              <p className="text-[#8a8a84] text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Link href="/contact" className="underline-link">
        Get in touch &rarr;
      </Link>
    </div>
  );
}
