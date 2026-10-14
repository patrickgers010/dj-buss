import type { Metadata } from "next";
import { VideoGrid, type Video } from "@/components/VideoGrid";

export const metadata: Metadata = {
  title: "Moments Music",
  description: "Moments Music — the complete catalogue.",
};

// Add real video IDs here (the part after "watch?v=" or after the last
// "/" in a youtu.be link) with a title. Empty = falls back to a
// link-out card so nothing ships broken.
const momentsVideos: Video[] = [];

export default function MomentsPage() {
  return (
    <div className="px-5 sm:px-8 lg:px-16 py-24 max-w-5xl mx-auto">
      <p className="eyebrow mb-5">Catalogue</p>
      <h1 className="font-display font-black uppercase leading-[0.95] tracking-tight text-[clamp(2.4rem,7vw,4.2rem)] mb-7">
        Moments Music
      </h1>
      <div className="hairline-rule mb-8" />
      <p className="text-[#f2f1ec]/85 text-lg leading-relaxed max-w-[560px] mb-14">
        The complete catalogue, on video.
      </p>

      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-sm uppercase tracking-[0.18em] text-[#8a8a84]">Full Catalogue</h2>
        <a
          href="https://youtube.com/@MomentsMusic2011"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-link"
        >
          Channel &rarr;
        </a>
      </div>
      <VideoGrid videos={momentsVideos} channelUrl="https://youtube.com/@MomentsMusic2011" channelLabel="Moments Music" />
    </div>
  );
}
