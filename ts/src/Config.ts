
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "title": "Album",
          "type": "`$STRING`",
          "short": "Album name"
        },
        {
          "name": "artist",
          "title": "Artist",
          "type": "`$STRING`",
          "req": true,
          "short": "Artist name"
        },
        {
          "name": "coverArt",
          "title": "Cover Art",
          "type": "`$STRING`",
          "short": "URL to album cover image",
          "format": "uri"
        },
        {
          "name": "duration",
          "title": "Duration",
          "type": "`$INTEGER`",
          "short": "Song duration in seconds"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique identifier for the playlist entry"
        },
        {
          "name": "playedAt",
          "title": "Played At",
          "type": "`$STRING`",
          "req": true,
          "short": "Timestamp when the song was played",
          "format": "date-time"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "req": true,
          "short": "Song title"
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
              "parts": [
                "api",
                "channels",
                "{station}",
                "playouts"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "station",
                    "orig": "station",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "energy-bern"
                  }
                ],
                "query": [
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 20
                  }
                ]
              },
              "select": {
                "exist": [
                  "limit",
                  "station"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

