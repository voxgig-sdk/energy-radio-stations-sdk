
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'EnergyRadioStations',
        slug: "energy-radio-stations",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://energy.ch",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      playout: {
      },

    }
  }


  entity = {
    "playout": {
      "fields": [
        {
          "name": "album",
          "short": "Album name",
          "type": "`$STRING`"
        },
        {
          "name": "artist",
          "req": true,
          "short": "Artist name",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "coverArt",
          "short": "URL to album cover image",
          "type": "`$STRING`"
        },
        {
          "name": "duration",
          "short": "Song duration in seconds",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the playlist entry",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "playedAt",
          "req": true,
          "short": "Timestamp when the song was played",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "req": true,
          "short": "Song title",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": 20,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/channels/{station}/playouts",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "channels"
                },
                {
                  "var": "station"
                },
                {
                  "lit": "playouts"
                }
              ],
              "select": {
                "exist": [
                  "limit",
                  "station"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "channels",
                "{station}",
                "playouts"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "channel"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

