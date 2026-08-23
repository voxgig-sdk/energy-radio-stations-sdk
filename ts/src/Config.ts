
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
      }
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
              "parts": [
                "api",
                "channels",
                "{station}",
                "playouts"
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
              }
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
  config
}

