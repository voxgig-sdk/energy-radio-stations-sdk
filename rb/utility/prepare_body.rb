# EnergyRadioStations SDK utility: prepare_body
require_relative 'media'
module EnergyRadioStationsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return EnergyRadioStationsUtilities.raw_body(ctx.reqdata) if EnergyRadioStationsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
