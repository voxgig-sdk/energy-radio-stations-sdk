# EnergyRadioStations SDK configuration


def make_config():
    return {
        "main": {
            "name": "EnergyRadioStations",
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
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "playlist": {},
            },
        },
        "entity": {
      "playlist": {
        "fields": [
          {
            "name": "album",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "artist",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "cover_art",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "duration",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "played_at",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "title",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
        ],
        "name": "playlist",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "energy-bern",
                      "kind": "param",
                      "name": "station_id",
                      "orig": "station",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/stations/{station}/playlist",
                "parts": [
                  "stations",
                  "{station_id}",
                  "playlist",
                ],
                "rename": {
                  "param": {
                    "station": "station_id",
                  },
                },
                "select": {
                  "exist": [
                    "limit",
                    "station_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [
            [
              "station",
            ],
          ],
        },
      },
    },
    }
