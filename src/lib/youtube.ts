/**
 * Server-side YouTube Data API v3 fetcher.
 * Requires YOUTUBE_API_KEY in env. Never exposes the key to the browser.
 */

export interface YTVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
  description: string;
}

const YT_BASE = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.YOUTUBE_API_KEY ?? "";
const CHANNEL_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE ?? "gersebeats";

// Module-level cache — channel ID is stable, refresh once per day
let _channelId: string | null = null;

async function getChannelId(): Promise<string> {
  if (_channelId) return _channelId;

  const res = await fetch(
    `${YT_BASE}/channels?part=id&forHandle=${encodeURIComponent(CHANNEL_HANDLE)}&key=${API_KEY}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error(`YouTube channel lookup failed: ${res.status}`);

  const data = await res.json();
  if (!data.items?.length) throw new Error(`YouTube channel @${CHANNEL_HANDLE} not found`);

  _channelId = data.items[0].id as string;
  return _channelId;
}

export async function fetchLatestVideos(limit = 8): Promise<YTVideo[]> {
  const channelId = await getChannelId();

  const res = await fetch(
    `${YT_BASE}/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=${limit}&key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`YouTube search failed: ${res.status}`);

  const data = await res.json();
  return (data.items ?? []).map((item: any) => ({
    id: item.id.videoId as string,
    title: item.snippet.title as string,
    thumbnail:
      item.snippet.thumbnails?.medium?.url ??
      item.snippet.thumbnails?.default?.url ??
      "",
    publishedAt: item.snippet.publishedAt as string,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    description: (item.snippet.description as string) ?? "",
  }));
}

export const youtubeConfigured = Boolean(API_KEY);
export const youtubeChannelUrl = `https://www.youtube.com/@${CHANNEL_HANDLE}`;
