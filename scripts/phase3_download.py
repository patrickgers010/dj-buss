#!/usr/bin/env python3
"""
Phase 3 — Download all tracks in ClaudeSelects playlist to iCloud Music.

Requires yt-dlp:
    pip3 install yt-dlp
"""

import subprocess
import sys
from pathlib import Path

from soundcloud_api import SoundCloudAPI, Config


def check_ytdlp():
    result = subprocess.run(["yt-dlp", "--version"], capture_output=True)
    if result.returncode != 0:
        print("ERROR: yt-dlp not found. Install it with: pip3 install yt-dlp")
        sys.exit(1)


def resolve_path(raw: str) -> Path:
    expanded = raw.replace(
        "~/Library/Mobile Documents",
        str(Path.home() / "Library/Mobile Documents"),
    )
    return Path(expanded).expanduser().resolve()


def main():
    check_ytdlp()

    cfg = Config()
    api = SoundCloudAPI()

    if not api.access_token:
        print("No access token — run get_token.py first.")
        sys.exit(1)

    user_permalink = cfg.get("SOUNDCLOUD_USER_ID") or "gers010"
    playlist_name = cfg.get("PLAYLIST_NAME") or "ClaudeSelects"
    raw_path = cfg.get(
        "ICLOUD_MUSIC_PATH",
        "~/Library/Mobile Documents/com~apple~CloudDocs/Music/Claude Music",
    )

    dest = resolve_path(raw_path)
    dest.mkdir(parents=True, exist_ok=True)
    print(f"Download destination: {dest}\n")

    print(f"Resolving user: {user_permalink}")
    user = api.get_user(user_permalink)
    user_id = user["id"]

    print(f"Looking up playlist: '{playlist_name}'")
    playlists = api.get_user_playlists(user_id)
    playlist = next((p for p in playlists if p["title"] == playlist_name), None)
    if not playlist:
        print(f"ERROR: Playlist '{playlist_name}' not found. Run phase1_discover.py first.")
        sys.exit(1)

    playlist_detail = api.get_playlist(playlist["id"])
    tracks = playlist_detail.get("tracks", [])
    print(f"Found {len(tracks)} track(s) in '{playlist_name}'\n")

    if not tracks:
        print("Nothing to download.")
        return

    failed = []
    for i, track in enumerate(tracks, 1):
        title = track.get("title", "Unknown")
        url = track.get("permalink_url", "")
        print(f"[{i:>3}/{len(tracks)}] {title}")

        if not url:
            print("       Skipping: no permalink URL")
            failed.append(title)
            continue

        cmd = [
            "yt-dlp",
            "--format", "bestaudio/best",
            "--extract-audio",
            "--audio-format", "mp3",
            "--audio-quality", "0",
            "--embed-thumbnail",
            "--add-metadata",
            "--no-playlist",
            "--output", str(dest / "%(uploader)s - %(title)s.%(ext)s"),
            url,
        ]

        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            print("       ✓ Downloaded")
        else:
            last_err = result.stderr.strip().splitlines()[-1] if result.stderr.strip() else "unknown error"
            print(f"       ✗ FAILED: {last_err}")
            failed.append(title)

    ok = len(tracks) - len(failed)
    print(f"\n{'─'*50}")
    print(f"Done: {ok}/{len(tracks)} downloaded → {dest}")
    if failed:
        print(f"\nFailed ({len(failed)}):")
        for f in failed:
            print(f"  - {f}")


if __name__ == "__main__":
    main()
