
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EnergyRadioStationsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await EnergyRadioStationsSDK.test()
    equal(null !== testsdk, true)
  })

})
