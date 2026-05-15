# EnergyRadioStations SDK exists test

require "minitest/autorun"
require_relative "../EnergyRadioStations_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = EnergyRadioStationsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
