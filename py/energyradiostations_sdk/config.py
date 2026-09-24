# EnergyRadioStations SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "title": "Album",
            "type": "`$STRING`",
            "short": "Album name",
          },
          {
            "name": "artist",
            "title": "Artist",
            "type": "`$STRING`",
            "req": True,
            "short": "Artist name",
          },
          {
            "name": "coverArt",
            "title": "Cover Art",
            "type": "`$STRING`",
            "short": "URL to album cover image",
            "format": "uri",
          },
          {
            "name": "duration",
            "title": "Duration",
            "type": "`$INTEGER`",
            "short": "Song duration in seconds",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the playlist entry",
          },
          {
            "name": "playedAt",
            "title": "Played At",
            "type": "`$STRING`",
            "req": True,
            "short": "Timestamp when the song was played",
            "format": "date-time",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
            "short": "Song title",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "playout",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/channels/{station}/playouts",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "channels",
                  },
                  {
                    "var": "station",
                  },
                  {
                    "lit": "playouts",
                  },
                ],
                "parts": [
                  "api",
                  "channels",
                  "{station}",
                  "playouts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "station",
                      "orig": "station",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "energy-bern",
                    },
                  ],
                  "query": [
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 20,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "limit",
                    "station",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
