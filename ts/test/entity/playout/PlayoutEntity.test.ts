
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { EnergyRadioStationsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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
      if (maybeSkipControl(t, 'entityOp', 'playout.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set ENERGY_RADIO_STATIONS_TEST_PLAYOUT_ENTID JSON to run live')
      return
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
    ['playout01','playout02','playout03','channel01','channel02','channel03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['ENERGY_RADIO_STATIONS_TEST_PLAYOUT_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'ENERGY_RADIO_STATIONS_TEST_PLAYOUT_ENTID': idmap,
    'ENERGY_RADIO_STATIONS_TEST_LIVE': 'FALSE',
    'ENERGY_RADIO_STATIONS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ENERGY_RADIO_STATIONS_TEST_PLAYOUT_ENTID']

  const live = 'TRUE' === env.ENERGY_RADIO_STATIONS_TEST_LIVE

  if (live) {
    client = new EnergyRadioStationsSDK(merge([
      {
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
