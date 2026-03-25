import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from DJ GERS performances and Swopster Gatherings events.",
};

// Placeholder gallery items — replace src with real images
const photos = [
  { id: 1, event: "FEEST Edition 2", category: "feest", color: "#1a0030", accent: "#a855f7" },
  { id: 2, event: "FEEST Edition 2", category: "feest", color: "#1a001a", accent: "#ec4899" },
  { id: 3, event: "DJ GERS – Club Night", category: "dj", color: "#001030", accent: "#3b82f6" },
  { id: 4, event: "FEEST Edition 1", category: "feest", color: "#1a1000", accent: "#f59e0b" },
  { id: 5, event: "DJ GERS – Festival", category: "dj", color: "#001a10", accent: "#22d3ee" },
  { id: 6, event: "Swopster Gathering", category: "swopster", color: "#200015", accent: "#a855f7" },
  { id: 7, event: "FEEST Edition 1", category: "feest", color: "#1a0020", accent: "#ec4899" },
  { id: 8, event: "DJ GERS – Private Party", category: "dj", color: "#001530", accent: "#3b82f6" },
  { id: 9, event: "Swopster Gathering", category: "swopster", color: "#15001a", accent: "#a855f7" },
];

const categories = ["all", "feest", "dj", "swopster"] as const;
type Category = (typeof categories)[number];

const categoryLabel: Record<Category, string> = {
  all: "All",
  feest: "FEEST",
  dj: "DJ GERS",
  swopster: "Swopster",
};

export default function GalleryPage() {
  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-20 text-center px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-purple-700/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <p className="text-purple-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Memories</p>
          <h1 className="font-black text-6xl sm:text-8xl text-white tracking-tight mb-4">Gallery</h1>
          <div className="divider-neon w-24 mx-auto my-5" />
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Snapshots from the dancefloor — DJ GERS performances, FEEST events, and Swopster Gatherings moments.
          </p>
        </div>
      </section>

      {/* ─── FILTER TABS (static, no JS needed) ──────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-5 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer"
              style={{
                background: cat === "all" ? "rgba(168,85,247,0.15)" : "transparent",
                borderColor: cat === "all" ? "#a855f7" : "rgba(255,255,255,0.1)",
                color: cat === "all" ? "#a855f7" : "#9ca3af",
              }}
            >
              {categoryLabel[cat]}
            </span>
          ))}
        </div>
      </section>

      {/* ─── PHOTO GRID ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer"
              style={{ background: photo.color }}
            >
              {/* Placeholder visual */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                style={{ background: `radial-gradient(circle at 60% 40%, ${photo.accent}33, transparent 70%)` }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl text-white"
                  style={{ background: `${photo.accent}40`, border: `2px solid ${photo.accent}60` }}
                >
                  {i % 3 === 0 ? "📸" : i % 3 === 1 ? "🎧" : "🎉"}
                </div>
                <span className="text-xs text-white/30 font-medium">Photo coming soon</span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center">
                <p className="text-white font-semibold text-sm">{photo.event}</p>
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{ background: `${photo.accent}30`, color: photo.accent, border: `1px solid ${photo.accent}50` }}
                >
                  {photo.category.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-sm mt-8">
          More photos and videos coming soon. Follow us on social media for live updates.
        </p>
      </section>

      {/* ─── VIDEO SECTION ────────────────────────────────────── */}
      <div className="divider-neon" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-purple-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Watch</p>
          <h2 className="text-4xl font-black text-white">Video Highlights</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "FEEST Edition 2 – Aftermovie", duration: "3:42", icon: "🎬" },
            { title: "DJ GERS – Festival Set", duration: "12:00", icon: "🎧" },
          ].map((video) => (
            <div
              key={video.title}
              className="card-dark rounded-2xl aspect-video flex flex-col items-center justify-center gap-3 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full border-2 border-purple-500 flex items-center justify-center text-white group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white font-semibold text-sm">{video.title}</p>
              <p className="text-gray-500 text-xs">{video.duration}</p>
              <span className="text-xs text-purple-400">Video coming soon</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center">
        <p className="text-gray-500 mb-4 text-sm">Want to be part of the next event?</p>
        <Link href="/feest" className="btn-pink mr-4">
          Next FEEST
        </Link>
        <Link href="/contact" className="btn-neon">
          Book DJ GERS
        </Link>
      </section>
    </div>
  );
}
