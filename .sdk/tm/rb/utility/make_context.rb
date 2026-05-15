# EnergyRadioStations SDK utility: make_context
require_relative '../core/context'
module EnergyRadioStationsUtilities
  MakeContext = ->(ctxmap, basectx) {
    EnergyRadioStationsContext.new(ctxmap, basectx)
  }
end
