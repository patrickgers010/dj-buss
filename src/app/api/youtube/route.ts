import { NextResponse } from "next/server";
import { fetchLatestVideos, youtubeConfigured } from "@/lib/youtube";

export const revalidate = 3600;

export async function GET() {
  if (!youtubeConfigured) {
    return NextResponse.json(
      { error: "YouTube API key not configured. Set YOUTUBE_API_KEY in your environment." },
      { status: 503 }
    );
  }

  try {
    const videos = await fetchLatestVideos(8);
    return NextResponse.json({ videos });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
