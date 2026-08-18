
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


  main = {
    name: 'EnergyRadioStations',
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
          "type": "`$STRING`"
        },
        {
          "name": "artist",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "coverArt",
          "type": "`$STRING`"
        },
        {
          "name": "duration",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "playedAt",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "req": true,
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

