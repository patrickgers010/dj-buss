import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book / Contact",
  description:
    "Book DJ GERS for your event or get in touch with Swopster Gatherings about FEEST and other events.",
};

export default function ContactPage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-20 text-center px-4">
        <div className="absolute top-0 left-1/3 w-96 h-64 bg-purple-700/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <p className="text-purple-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">
            Get in Touch
          </p>
          <h1 className="font-black text-6xl sm:text-8xl text-white tracking-tight mb-4">
            Book &amp; <span className="gradient-text">Contact</span>
          </h1>
          <div className="divider-neon w-24 mx-auto my-5" />
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Want to book DJ GERS, inquire about FEEST tickets, or discuss a collaboration with
            Swopster Gatherings? Drop a message below.
          </p>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* ── Contact info ── */}
          <div className="space-y-6">
            <div>
              <p className="text-purple-400 uppercase tracking-[0.3em] text-xs font-semibold mb-5">
                Info
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: "📧",
                    label: "Email",
                    value: "info@djgers.nl",
                    sub: "Response within 24h",
                  },
                  {
                    icon: "📍",
                    label: "Based in",
                    value: "Netherlands",
                    sub: "Available nationwide & abroad",
                  },
                  {
                    icon: "🎧",
                    label: "Booking",
                    value: "DJ GERS",
                    sub: "Clubs · Parties · Festivals",
                  },
                  {
                    icon: "🎉",
                    label: "Events",
                    value: "Swopster Gatherings",
                    sub: "FEEST & more",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex gap-4 p-4 rounded-xl border"
                    style={{
                      background: "#10101c",
                      borderColor: "rgba(168,85,247,0.15)",
                    }}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-white text-sm font-semibold">{item.value}</p>
                      <p className="text-gray-500 text-xs">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-purple-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
                Follow
              </p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { name: "Instagram", handle: "@djgers" },
                  { name: "SoundCloud", handle: "DJ GERS" },
                  { name: "TikTok", handle: "@djgers" },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="px-4 py-2 rounded-lg border text-sm"
                    style={{
                      background: "#10101c",
                      borderColor: "rgba(168,85,247,0.2)",
                    }}
                  >
                    <p className="text-white font-medium text-xs">{s.name}</p>
                    <p className="text-purple-400 text-xs">{s.handle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Booking form ── */}
          <div className="lg:col-span-2">
            <BookingForm />
          </div>
        </div>
      </section>
    </div>
  );
}
