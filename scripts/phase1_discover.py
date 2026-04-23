#!/usr/bin/env python3
"""
Phase 1 — Discover Romanian minimal tracks from configured sources.

Reads source URLs from ~/.claudeselects_urls, fetches 2024+ tracks from
SoundCloud profiles, Bandcamp pages, and Play Differently releases, then adds
SoundCloud tracks to the ClaudeSelects playlist for manual review (Phase 2).
"""

import re
import sys
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

from soundcloud_api import SoundCloudAPI, Config

URLS_PATH = Path.home() / ".claudeselects_urls"
CUTOFF_YEAR = 2024

# Extra SoundCloud searches run on every execution to catch untagged rominimal
ROMINIMAL_QUERIES = [
    "romanian minimal 2024",
    "rominimal 2024",
    "minimal techno romania",
    "rominimal techno",
]


# ── Helpers ───────────────────────────────────────────────────────────────────

def load_urls() -> list[str]:
    if not URLS_PATH.exists():
        print(f"ERROR: {URLS_PATH} not found. Run setup.py first.")
        sys.exit(1)
    return [
        line.strip()
        for line in URLS_PATH.read_text().splitlines()
        if line.strip() and not line.startswith("#")
    ]


def detect_platform(url: str) -> str:
    host = urlparse(url).hostname or ""
    if "soundcloud.com" in host:
        return "soundcloud"
    if "bandcamp.com" in host:
        return "bandcamp"
    if "playdifferently.com" in host:
        return "playdifferently"
    return "unknown"


def is_recent(date_str: str) -> bool:
    """Return True if date_str represents a date in CUTOFF_YEAR or later."""
    if not date_str:
        return False
    for fmt in ("%Y-%m-%dT%H:%M:%SZ", "%Y/%m/%d %H:%M:%S +0000", "%Y-%m-%d"):
        try:
            dt = datetime.strptime(date_str[: len(fmt)].strip(), fmt)
            return dt.year >= CUTOFF_YEAR
        except ValueError:
            continue
    # Fallback: look for a 4-digit year anywhere in the string
    m = re.search(r"\b(20\d\d)\b", date_str)
    return bool(m) and int(m.group(1)) >= CUTOFF_YEAR


def _scrape(url: str) -> BeautifulSoup:
    resp = requests.get(url, timeout=20, headers={"User-Agent": "Mozilla/5.0"})
    resp.raise_for_status()
    return BeautifulSoup(resp.text, "html.parser")


# ── Platform fetchers ─────────────────────────────────────────────────────────

def fetch_soundcloud(api: SoundCloudAPI, url: str) -> list[int]:
    """Return list of SoundCloud track IDs from 2024+."""
    print(f"  [SoundCloud] {url}")
    try:
        user = api.resolve(url)
        tracks = api.get_user_tracks(user["id"], limit=200)
        recent = [t for t in tracks if is_recent(t.get("created_at", ""))]
        print(f"    {len(recent)} recent tracks (of {len(tracks)} total)")
        return [t["id"] for t in recent]
    except Exception as e:
        print(f"    ERROR: {e}")
        return []


def fetch_bandcamp(url: str) -> list[dict]:
    """Return list of dicts with title/url/year for 2024+ Bandcamp items."""
    print(f"  [Bandcamp] {url}")
    try:
        soup = _scrape(url)
        results = []
        for item in soup.select(".music-grid-item, .collection-item-container"):
            title_el = item.select_one(".title, .collection-item-title")
            link_el = item.select_one("a[href]")
            if not title_el or not link_el:
                continue
            date_el = item.select_one(".collection-item-release-date, time[datetime]")
            date_str = date_el.get("datetime", date_el.text) if date_el else ""
            m = re.search(r"\b(20\d\d)\b", date_str)
            year = int(m.group(1)) if m else 0
            if year < CUTOFF_YEAR:
                continue
            href = link_el["href"]
            if not href.startswith("http"):
                base = f"{urlparse(url).scheme}://{urlparse(url).hostname}"
                href = base + href
            results.append({"title": title_el.text.strip(), "url": href, "year": year})
        print(f"    {len(results)} items from {CUTOFF_YEAR}+")
        return results
    except Exception as e:
        print(f"    ERROR: {e}")
        return []


def fetch_playdifferently(url: str) -> list[dict]:
    """Return list of dicts with title/url/year for 2024+ Play Differently items."""
    print(f"  [Play Differently] {url}")
    try:
        soup = _scrape(url)
        results = []
        for item in soup.select(".release, .product, article"):
            title_el = item.select_one("h2, h3, .title, .product-title")
            link_el = item.select_one("a[href]")
            if not title_el:
                continue
            m = re.search(r"\b(20\d\d)\b", item.get_text())
            year = int(m.group(1)) if m else 0
            if year < CUTOFF_YEAR:
                continue
            href = link_el["href"] if link_el else url
            if not href.startswith("http"):
                href = "https://www.playdifferently.com" + href
            results.append({"title": title_el.text.strip(), "url": href, "year": year})
        print(f"    {len(results)} items from {CUTOFF_YEAR}+")
        return results
    except Exception as e:
        print(f"    ERROR: {e}")
        return []


def search_rominimal(api: SoundCloudAPI) -> list[int]:
    """Search SoundCloud for rominimal tracks from 2024+."""
    print("  [SoundCloud Search] rominimal / romanian minimal…")
    seen: set[int] = set()
    ids = []
    for q in ROMINIMAL_QUERIES:
        try:
            tracks = api.search_tracks(q, limit=50)
            for t in tracks:
                if t["id"] not in seen and is_recent(t.get("created_at", "")):
                    seen.add(t["id"])
                    ids.append(t["id"])
        except Exception as e:
            print(f"    Search error '{q}': {e}")
    print(f"    {len(ids)} new tracks via search")
    return ids


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    cfg = Config()
    api = SoundCloudAPI()

    if not api.access_token:
        print("No access token — run get_token.py first.")
        sys.exit(1)

    user_permalink = cfg.get("SOUNDCLOUD_USER_ID") or "gers010"
    playlist_name = cfg.get("PLAYLIST_NAME") or "ClaudeSelects"

    print(f"Resolving user: {user_permalink}")
    user = api.get_user(user_permalink)
    user_id = user["id"]

    print(f"Finding/creating playlist: '{playlist_name}'")
    playlist = api.find_or_create_playlist(user_id, playlist_name)
    playlist_id = playlist["id"]
    print(f"Playlist ID: {playlist_id}\n")

    urls = load_urls()
    print(f"Processing {len(urls)} source URL(s)…\n")

    sc_ids: list[int] = []
    non_sc: list[dict] = []

    for url in urls:
        platform = detect_platform(url)
        if platform == "soundcloud":
            sc_ids.extend(fetch_soundcloud(api, url))
        elif platform == "bandcamp":
            non_sc.extend(fetch_bandcamp(url))
        elif platform == "playdifferently":
            non_sc.extend(fetch_playdifferently(url))
        else:
            print(f"  Skipping unsupported URL: {url}")

    sc_ids.extend(search_rominimal(api))

    # Deduplicate while preserving order
    seen: set[int] = set()
    unique_ids = []
    for tid in sc_ids:
        if tid not in seen:
            seen.add(tid)
            unique_ids.append(tid)

    if unique_ids:
        print(f"\nAdding {len(unique_ids)} tracks to '{playlist_name}'…")
        api.add_tracks_to_playlist(playlist_id, unique_ids)
        print("✓ Done.")
    else:
        print("\nNo SoundCloud tracks found to add.")

    if non_sc:
        print(f"\n{len(non_sc)} non-SoundCloud items (manual review):")
        for item in non_sc[:15]:
            print(f"  [{item['year']}] {item['title']} — {item['url']}")
        if len(non_sc) > 15:
            print(f"  … and {len(non_sc) - 15} more")

    print(
        f"\nPhase 1 complete.\n"
        f"→ Open SoundCloud, review '{playlist_name}', remove anything you don't want.\n"
        f"→ Then run: python3 phase3_download.py"
    )


if __name__ == "__main__":
    main()
