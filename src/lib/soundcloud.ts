/**
 * Server-side SoundCloud data fetcher.
 * Uses client_credentials grant — never expose the secret to the browser.
 * Results are cached for 1 hour via Next.js fetch revalidation.
 */

export interface SCTrack {
  id: number;
  title: string;
  genre: string;
  duration: number; // milliseconds
  created_at: string;
  permalink_url: string;
  artwork_url: string | null;
  playback_count: number;
  likes_count: number;
  tag_list: string;
  description: string | null;
}

export interface SCUser {
  id: number;
  username: string;
  permalink: string;
  avatar_url: string | null;
  followers_count: number;
  track_count: number;
}

const BASE = "https://api.soundcloud.com";
const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET ?? "";
const USER_PERMALINK = process.env.SOUNDCLOUD_USER_PERMALINK ?? "gers010";

// Module-level token cache (survives across requests in the same server process)
let _token: string | null = null;
let _tokenExpiresAt = 0;

async function getToken(): Promise<string> {
  if (_token && Date.now() < _tokenExpiresAt) return _token;

  const res = await fetch(`${BASE}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`SoundCloud token request failed: ${res.status}`);
  }

  const data = await res.json();
  _token = data.access_token as string;
  // SoundCloud client_credentials tokens are non-expiring, but refresh hourly to be safe
  _tokenExpiresAt = Date.now() + 3_600_000;
  return _token;
}

function authHeaders(token: string) {
  return {
    Authorization: `OAuth ${token}`,
    Accept: "application/json; charset=utf-8",
  };
}

function normaliseArtwork(url: string | null): string | null {
  return url ? url.replace("-large", "-t300x300") : null;
}

export async function fetchUser(): Promise<SCUser> {
  const token = await getToken();
  const res = await fetch(
    `${BASE}/resolve?url=https://soundcloud.com/${USER_PERMALINK}&client_id=${CLIENT_ID}`,
    { headers: authHeaders(token), next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`SoundCloud resolve failed: ${res.status}`);
  return res.json();
}

export async function fetchTracks(limit = 20): Promise<SCTrack[]> {
  const token = await getToken();
  const user = await fetchUser();

  const res = await fetch(
    `${BASE}/users/${user.id}/tracks?limit=${limit}&client_id=${CLIENT_ID}`,
    { headers: authHeaders(token), next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`SoundCloud tracks fetch failed: ${res.status}`);

  const raw = await res.json();
  const tracks: any[] = Array.isArray(raw) ? raw : (raw.collection ?? []);

  return tracks.map((t) => ({
    id: t.id,
    title: t.title ?? "Untitled",
    genre: t.genre ?? "",
    duration: t.duration ?? 0,
    created_at: t.created_at ?? "",
    permalink_url: t.permalink_url ?? "",
    artwork_url: normaliseArtwork(t.artwork_url),
    playback_count: t.playback_count ?? 0,
    likes_count: t.likes_count ?? 0,
    tag_list: t.tag_list ?? "",
    description: t.description ?? null,
  }));
}

/** Format milliseconds as m:ss */
export function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const soundcloudConfigured = Boolean(CLIENT_ID && CLIENT_SECRET);
