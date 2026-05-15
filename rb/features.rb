# EnergyRadioStations SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module EnergyRadioStationsFeatures
  def self.make_feature(name)
    case name
    when "base"
      EnergyRadioStationsBaseFeature.new
    when "test"
      EnergyRadioStationsTestFeature.new
    else
      EnergyRadioStationsBaseFeature.new
    end
  end
end
