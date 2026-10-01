import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "playout",
    "accessor": "Playout",
    "op": "list",
    "method": "GET",
    "path": "/api/channels/{station}/playouts",
    "args": [
      {
        "name": "station",
        "wire": "station",
        "value": "energy-bern"
      }
    ],
    "select": {
      "limit": "v1"
    },
    "headers": [],
    "query": [
      "limit"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "station": {
        "description": "Die Nummer 1 aus der Hauptstadt.",
        "frequency": "101.7 MHz",
        "id": "energy-bern",
        "name": "Energy Bern"
      },
      "playlist": [
        {
          "album": "25",
          "artist": "Adele",
          "coverArt": "x",
          "duration": 1,
          "id": "x",
          "playedAt": "2026-01-01T00:00:00Z",
          "title": "Hello"
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
