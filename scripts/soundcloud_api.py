"""SoundCloud API wrapper for the Rominimal Tracks Digger pipeline."""

import requests
from pathlib import Path

CONFIG_PATH = Path.home() / ".claudeselects_config"
BASE_URL = "https://api.soundcloud.com"


class Config:
    def __init__(self):
        self._data = {}
        self._load()

    def _load(self):
        if CONFIG_PATH.exists():
            for line in CONFIG_PATH.read_text().splitlines():
                line = line.strip()
                if "=" in line and not line.startswith("#"):
                    k, _, v = line.partition("=")
                    self._data[k.strip()] = v.strip()

    def get(self, key, default=""):
        return self._data.get(key, default)

    def set(self, key, value):
        self._data[key] = value
        self._save()

    def _save(self):
        CONFIG_PATH.write_text(
            "\n".join(f"{k}={v}" for k, v in self._data.items()) + "\n"
        )


class SoundCloudAPI:
    def __init__(self):
        self.config = Config()
        self.client_id = self.config.get("SOUNDCLOUD_CLIENT_ID")
        self.client_secret = self.config.get("SOUNDCLOUD_CLIENT_SECRET")
        self.access_token = self.config.get("SOUNDCLOUD_ACCESS_TOKEN")
        self._session = requests.Session()

    # ── Auth ──────────────────────────────────────────────────────────────────

    def get_token(self) -> str:
        resp = requests.post(
            f"{BASE_URL}/oauth2/token",
            data={
                "grant_type": "client_credentials",
                "client_id": self.client_id,
                "client_secret": self.client_secret,
            },
            timeout=15,
        )
        resp.raise_for_status()
        token = resp.json()["access_token"]
        self.access_token = token
        self.config.set("SOUNDCLOUD_ACCESS_TOKEN", token)
        return token

    def _headers(self) -> dict:
        h = {"Accept": "application/json; charset=utf-8"}
        if self.access_token:
            h["Authorization"] = f"OAuth {self.access_token}"
        return h

    def _params(self, extra: dict | None = None) -> dict:
        p = {"client_id": self.client_id}
        if extra:
            p.update(extra)
        return p

    def _get(self, url: str, params: dict | None = None) -> any:
        resp = self._session.get(
            url, params=self._params(params), headers=self._headers(), timeout=15
        )
        resp.raise_for_status()
        return resp.json()

    # ── User ──────────────────────────────────────────────────────────────────

    def resolve(self, url: str) -> dict:
        """Resolve any SoundCloud URL to its API resource."""
        resp = self._session.get(
            f"{BASE_URL}/resolve",
            params=self._params({"url": url}),
            headers=self._headers(),
            allow_redirects=True,
            timeout=15,
        )
        resp.raise_for_status()
        return resp.json()

    def get_user(self, permalink: str) -> dict:
        return self.resolve(f"https://soundcloud.com/{permalink}")

    def get_user_tracks(self, user_id: int, limit: int = 200) -> list[dict]:
        tracks = []
        url = f"{BASE_URL}/users/{user_id}/tracks"
        params = {"limit": 50, "linked_partitioning": 1}
        while url and len(tracks) < limit:
            resp = self._session.get(
                url, params=self._params(params), headers=self._headers(), timeout=15
            )
            resp.raise_for_status()
            data = resp.json()
            if isinstance(data, list):
                tracks.extend(data)
                break
            tracks.extend(data.get("collection", []))
            url = data.get("next_href")
            params = {}
        return tracks[:limit]

    # ── Search ────────────────────────────────────────────────────────────────

    def search_tracks(self, query: str, limit: int = 50) -> list[dict]:
        data = self._get(f"{BASE_URL}/tracks", {"q": query, "limit": limit})
        return data if isinstance(data, list) else data.get("collection", [])

    # ── Playlists ─────────────────────────────────────────────────────────────

    def get_user_playlists(self, user_id: int) -> list[dict]:
        data = self._get(f"{BASE_URL}/users/{user_id}/playlists")
        return data if isinstance(data, list) else data.get("collection", [])

    def get_playlist(self, playlist_id: int) -> dict:
        return self._get(f"{BASE_URL}/playlists/{playlist_id}")

    def find_or_create_playlist(self, user_id: int, name: str) -> dict:
        for pl in self.get_user_playlists(user_id):
            if pl.get("title") == name:
                return pl
        return self.create_playlist(name, [])

    def create_playlist(self, title: str, track_ids: list[int]) -> dict:
        resp = self._session.post(
            f"{BASE_URL}/playlists",
            params=self._params(),
            headers={**self._headers(), "Content-Type": "application/json"},
            json={
                "playlist": {
                    "title": title,
                    "sharing": "private",
                    "tracks": [{"id": tid} for tid in track_ids],
                }
            },
            timeout=15,
        )
        resp.raise_for_status()
        return resp.json()

    def add_tracks_to_playlist(self, playlist_id: int, new_track_ids: list[int]) -> dict:
        """Append tracks to a playlist, skipping duplicates."""
        playlist = self.get_playlist(playlist_id)
        existing = {t["id"] for t in playlist.get("tracks", [])}
        combined = [t["id"] for t in playlist.get("tracks", [])] + [
            tid for tid in new_track_ids if tid not in existing
        ]
        resp = self._session.put(
            f"{BASE_URL}/playlists/{playlist_id}",
            params=self._params(),
            headers={**self._headers(), "Content-Type": "application/json"},
            json={"playlist": {"tracks": [{"id": tid} for tid in combined]}},
            timeout=15,
        )
        resp.raise_for_status()
        return resp.json()
