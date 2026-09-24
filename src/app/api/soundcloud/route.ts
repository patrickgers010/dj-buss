import { NextResponse } from "next/server";
import { fetchTracks, fetchUser, soundcloudConfigured } from "@/lib/soundcloud";

export const revalidate = 3600; // Cache the route for 1 hour

export async function GET() {
  if (!soundcloudConfigured) {
    return NextResponse.json(
      { error: "SoundCloud credentials not configured. Set SOUNDCLOUD_CLIENT_ID and SOUNDCLOUD_CLIENT_SECRET." },
      { status: 503 }
    );
  }

  try {
    const [tracks, user] = await Promise.all([fetchTracks(20), fetchUser()]);
    return NextResponse.json({ tracks, user });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
