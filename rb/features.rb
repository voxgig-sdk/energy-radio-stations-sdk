# EnergyRadioStations SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module EnergyRadioStationsFeatures
  def self.make_feature(name)
    case name
    when "base"
      EnergyRadioStationsBaseFeature.new
    when "ratelimit"
      EnergyRadioStationsRatelimitFeature.new
    when "retry"
      EnergyRadioStationsRetryFeature.new
    when "test"
      EnergyRadioStationsTestFeature.new
    when "timeout"
      EnergyRadioStationsTimeoutFeature.new
    else
      EnergyRadioStationsBaseFeature.new
    end
  end
end
