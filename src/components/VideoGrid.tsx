export type Video = { id: string; title: string };

/**
 * Renders embedded YouTube videos in a responsive grid.
 * Pass real video IDs (the part after "watch?v=" or after the last "/"
 * in a youtu.be link) with a title for each. Falls back to a plain
 * link-out card when no IDs are set yet, so the page never ships a
 * broken embed.
 */
export function VideoGrid({ videos, channelUrl, channelLabel }: { videos: Video[]; channelUrl: string; channelLabel: string }) {
  if (videos.length === 0) {
    return (
      <a
        href={channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-10 border border-dashed border-[rgba(242,241,236,0.2)] rounded text-center hover:border-[#ff4b1f] transition-colors"
      >
        <p className="text-[#8a8a84] text-sm">
          Videos not linked in yet &mdash; watch on {channelLabel} directly &rarr;
        </p>
      </a>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
      {videos.map((v) => (
        <div key={v.id}>
          <div className="relative aspect-video bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${v.id}`}
              title={v.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="text-[#f2f1ec]/80 text-sm mt-3">{v.title}</p>
        </div>
      ))}
    </div>
  );
}
