#!/usr/bin/env python3
"""First-time setup: save SoundCloud credentials and create source URL list."""

from pathlib import Path

CONFIG_PATH = Path.home() / ".claudeselects_config"
URLS_PATH = Path.home() / ".claudeselects_urls"

DEFAULT_URLS = """\
# Rominimal Tracks Digger — source URLs
# One URL per line. Supported platforms: SoundCloud, Bandcamp, Play Differently.
# Lines starting with # are ignored.
#
# Examples:
# https://soundcloud.com/some-rominimal-artist
# https://hivern.bandcamp.com
# https://www.playdifferently.com/releases/
"""


def _load_existing() -> dict:
    existing = {}
    if CONFIG_PATH.exists():
        for line in CONFIG_PATH.read_text().splitlines():
            if "=" in line and not line.startswith("#"):
                k, _, v = line.partition("=")
                existing[k.strip()] = v.strip()
    return existing


def _prompt(label: str, current: str = "") -> str:
    hint = f" [{current}]" if current else ""
    val = input(f"{label}{hint}: ").strip()
    return val or current


def main():
    print("=== Rominimal Tracks Digger — Setup ===\n")

    ex = _load_existing()

    client_id = _prompt("SoundCloud Client ID", ex.get("SOUNDCLOUD_CLIENT_ID", ""))
    client_secret = _prompt("SoundCloud Client Secret", ex.get("SOUNDCLOUD_CLIENT_SECRET", ""))
    user = _prompt("SoundCloud username (your permalink)", ex.get("SOUNDCLOUD_USER_ID", "gers010"))
    playlist = _prompt("Playlist name for curated tracks", ex.get("PLAYLIST_NAME", "ClaudeSelects"))
    icloud = _prompt(
        "iCloud Music path",
        ex.get(
            "ICLOUD_MUSIC_PATH",
            "~/Library/Mobile Documents/com~apple~CloudDocs/Music/Claude Music",
        ),
    )

    config_lines = [
        f"SOUNDCLOUD_CLIENT_ID={client_id}",
        f"SOUNDCLOUD_CLIENT_SECRET={client_secret}",
        f"SOUNDCLOUD_ACCESS_TOKEN={ex.get('SOUNDCLOUD_ACCESS_TOKEN', '')}",
        f"SOUNDCLOUD_USER_ID={user}",
        f"PLAYLIST_NAME={playlist}",
        f"ICLOUD_MUSIC_PATH={icloud}",
    ]
    CONFIG_PATH.write_text("\n".join(config_lines) + "\n")
    print(f"\n✓ Config saved → {CONFIG_PATH}")

    if not URLS_PATH.exists():
        URLS_PATH.write_text(DEFAULT_URLS)
        print(f"✓ URL list created → {URLS_PATH}")
        print(f"  Edit that file to add your SoundCloud/Bandcamp/Play Differently sources.")
    else:
        print(f"✓ URL list already exists → {URLS_PATH}")

    print("\nNext steps:")
    print("  1. python3 get_token.py          — obtain OAuth access token")
    print("  2. Edit ~/.claudeselects_urls     — add your source URLs")
    print("  3. python3 phase1_discover.py     — discover & queue tracks")
    print("  4. Review ClaudeSelects on SoundCloud, remove anything you don't want")
    print("  5. python3 phase3_download.py     — download to iCloud")


if __name__ == "__main__":
    main()
