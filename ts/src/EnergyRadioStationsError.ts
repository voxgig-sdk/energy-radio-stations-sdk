
import { Context } from './Context'


class EnergyRadioStationsError extends Error {

  isEnergyRadioStationsError = true

  sdk = 'EnergyRadioStations'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  EnergyRadioStationsError
}

