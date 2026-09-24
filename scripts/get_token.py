#!/usr/bin/env python3
"""Exchange client credentials for a SoundCloud OAuth access token."""

import sys
from soundcloud_api import SoundCloudAPI, Config


def main():
    cfg = Config()
    if not cfg.get("SOUNDCLOUD_CLIENT_ID") or not cfg.get("SOUNDCLOUD_CLIENT_SECRET"):
        print("ERROR: Missing credentials. Run setup.py first.")
        sys.exit(1)

    print("Requesting access token from SoundCloud…")
    api = SoundCloudAPI()
    try:
        token = api.get_token()
        print(f"✓ Token obtained and saved to ~/.claudeselects_config")
        print(f"  Preview: {token[:16]}…")
    except Exception as e:
        print(f"ERROR: {e}")
        print(
            "\nIf you see a 401, your client credentials may be invalid.\n"
            "Check your app at: https://soundcloud.com/you/apps"
        )
        sys.exit(1)


if __name__ == "__main__":
    main()
