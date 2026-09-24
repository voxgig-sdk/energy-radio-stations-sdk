
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EnergyRadioStationsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = EnergyRadioStationsSDK.test()
    equal(testsdk instanceof EnergyRadioStationsSDK, true,
      'EnergyRadioStationsSDK.test() must return a client synchronously')
  })

})
