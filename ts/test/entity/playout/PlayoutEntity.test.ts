

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { EnergyRadioStationsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('PlayoutEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ENERGY_RADIO_STATIONS_TEST_LIVE=TRUE.
  afterEach(liveDelay('ENERGY_RADIO_STATIONS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EnergyRadioStationsSDK.test()
    const ent = testsdk.Playout()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ENERGY_RADIO_STATIONS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'playout.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"album":{"a":true,"h":"Album","n":"album","r":false,"sh":"Album name","t":"`$STRING`","key$":"album","index$":0},"artist":{"a":true,"h":"Artist","n":"artist","r":true,"sh":"Artist name","t":"`$STRING`","key$":"artist","index$":1},"coverArt":{"a":true,"fo":"uri","h":"Cover Art","n":"coverArt","r":false,"sh":"URL to album cover image","t":"`$STRING`","key$":"coverArt","index$":2},"duration":{"a":true,"h":"Duration","n":"duration","r":false,"sh":"Song duration in seconds","t":"`$INTEGER`","key$":"duration","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the playlist entry","t":"`$STRING`","key$":"id","index$":4},"playedAt":{"a":true,"fo":"date-time","h":"Played At","n":"playedAt","r":true,"sh":"Timestamp when the song was played","t":"`$STRING`","key$":"playedAt","index$":5},"title":{"a":true,"h":"Title","n":"title","r":true,"sh":"Song title","t":"`$STRING`","key$":"title","index$":6}},"id":{"field":"id","name":"id"},"name":"playout","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/channels/{station}/playouts","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"energy-bern","k":"param","n":"station","or":"station","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/channels/{station}/playouts","q":{"exist":["limit","station"]},"r":{},"s":[{"lit":"api"},{"lit":"channels"},{"var":"station"},{"lit":"playouts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"playout","name__orig":"playout","Name":"Playout","name_":"playout","name-":"playout","NAME":"PLAYOUT","index$":0}, {"active":true,"entity":"playout","key$":"BasicPlayoutFlow","kind":"basic","name":"BasicPlayoutFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"station":"station01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"playout_ref01"}}],"index$":0}]}, 'Playout', {"GET /api/channels/{station}/playouts":{"protocol":"http","operationId":"getStationPlaylist","responses":{"200":{"description":"Successful response with playlist data","content":{"application/json":{"schema":{"type":"object","properties":{"station":{"key$":"station","properties":{"description":{"example":"Die Nummer 1 aus der Hauptstadt.","type":"string"},"frequency":{"example":"101.7 MHz","type":"string"},"id":{"example":"energy-bern","type":"string"},"name":{"example":"Energy Bern","type":"string"}},"type":"object"},"playlist":{"items":{"properties":{"album":{"description":"Album name","example":"25","type":"string","key$":"album"},"artist":{"description":"Artist name","example":"Adele","type":"string","key$":"artist"},"coverArt":{"description":"URL to album cover image","format":"uri","type":"string","key$":"coverArt"},"duration":{"description":"Song duration in seconds","type":"integer","key$":"duration"},"id":{"description":"Unique identifier for the playlist entry","type":"string","key$":"id"},"playedAt":{"description":"Timestamp when the song was played","format":"date-time","type":"string","key$":"playedAt"},"title":{"description":"Song title","example":"Hello","type":"string","key$":"title"}},"required":["artist","title","playedAt"],"type":"object","x-ref":"#/components/schemas/PlaylistItem","index$":0},"key$":"playlist","type":"array"}},"x-ref":"#/components/schemas/PlaylistResponse"}}}},"404":{"description":"Station not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"}},"required":["error"],"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"}},"required":["error"],"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"station","in":"path","required":true,"description":"The station identifier","schema":{"type":"string","enum":["energy-zurich","energy-basel","energy-bern","energy-me-time","energy-love","energy-at-work","energy-hits","made-in-switzerland","energy-workout","energy-latin","energy-party-vibes","energy-summer-vibes","energy-pop","energy-top-30","energy-90s","energy-80s","energy-00s","energy-10s","energy-dance","energy-20s","energy-italy","energy-deutsch-pop","energy-womxn","energy-lounge","friends-cooking","energy-deutschrap","energy-balkan-hits","energy-rock","energy-urban","energy-x-mas"],"example":"energy-bern"},"index$":0},{"name":"limit","in":"query","required":false,"description":"Number of playlist entries to return","schema":{"type":"integer","default":20,"minimum":1,"maximum":100},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let playout_ref01_data = Object.values(setup.data.existing.playout)[0] as any

    // LIST
    const playout_ref01_ent = client.Playout()
    const playout_ref01_match: any = {}
    playout_ref01_match['station'] = setup.idmap['station01']

    const playout_ref01_list = (await playout_ref01_ent.list(playout_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/playout/PlayoutTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = EnergyRadioStationsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['playout01','playout02','playout03','station01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ENERGY_RADIO_STATIONS_TEST_PLAYOUT_ENTID': idmap,
    'ENERGY_RADIO_STATIONS_TEST_LIVE': 'FALSE',
    'ENERGY_RADIO_STATIONS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ENERGY_RADIO_STATIONS_TEST_PLAYOUT_ENTID']

  const live = 'TRUE' === env.ENERGY_RADIO_STATIONS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ENERGY_RADIO_STATIONS_TEST_PLAYOUT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new EnergyRadioStationsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.ENERGY_RADIO_STATIONS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
