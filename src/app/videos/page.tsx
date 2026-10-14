import type { Metadata } from "next";
import { VideoGrid, type Video } from "@/components/VideoGrid";

export const metadata: Metadata = {
  title: "Videos",
  description: "SPL!NTR on video — Gersebeats and Architechproductions.",
};

// Add real video IDs here (the part after "watch?v=" or after the last
// "/" in a youtu.be link) with a title. Empty = falls back to a
// link-out card so nothing ships broken.
const gersebeatsVideos: Video[] = [];
const architechVideos: Video[] = [];

export default function VideosPage() {
  return (
    <div className="px-5 sm:px-8 lg:px-16 py-24 max-w-5xl mx-auto">
      <p className="eyebrow mb-5">Video</p>
      <h1 className="font-display font-black uppercase leading-[0.95] tracking-tight text-[clamp(2.4rem,7vw,4.2rem)] mb-7">
        Watch
      </h1>
      <div className="hairline-rule mb-14" />

      <section className="mb-20">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-sm uppercase tracking-[0.18em] text-[#8a8a84]">Gersebeats</h2>
          <a
            href="https://youtube.com/@Gersebeats"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-link"
          >
            Channel &rarr;
          </a>
        </div>
        <VideoGrid videos={gersebeatsVideos} channelUrl="https://youtube.com/@Gersebeats" channelLabel="Gersebeats" />
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-sm uppercase tracking-[0.18em] text-[#8a8a84]">Architechproductions</h2>
          <a
            href="https://youtube.com/@Architechproductions"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-link"
          >
            Channel &rarr;
          </a>
        </div>
        <VideoGrid videos={architechVideos} channelUrl="https://youtube.com/@Architechproductions" channelLabel="Architechproductions" />
      </section>
    </div>
  );
}
