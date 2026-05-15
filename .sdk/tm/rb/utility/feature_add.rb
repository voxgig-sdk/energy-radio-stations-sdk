# EnergyRadioStations SDK utility: feature_add
module EnergyRadioStationsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
