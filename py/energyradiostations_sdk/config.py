# EnergyRadioStations SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "EnergyRadioStations",
            "slug": "energy-radio-stations",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://energy.ch",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "playout": {},
            },
        },
        "entity": {
      "playout": {
        "fields": [
          {
            "name": "album",
            "short": "Album name",
            "type": "`$STRING`",
          },
          {
            "name": "artist",
            "req": True,
            "short": "Artist name",
            "type": "`$STRING`",
          },
          {
            "name": "coverArt",
            "short": "URL to album cover image",
            "type": "`$STRING`",
          },
          {
            "name": "duration",
            "short": "Song duration in seconds",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the playlist entry",
            "type": "`$STRING`",
          },
          {
            "name": "playedAt",
            "req": True,
            "short": "Timestamp when the song was played",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "req": True,
            "short": "Song title",
            "type": "`$STRING`",
          },
        ],
        "name": "playout",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "energy-bern",
                      "kind": "param",
                      "name": "station",
                      "orig": "station",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/channels/{station}/playouts",
                "parts": [
                  "api",
                  "channels",
                  "{station}",
                  "playouts",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "station",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "channel",
            ],
          ],
        },
      },
    },
    }
