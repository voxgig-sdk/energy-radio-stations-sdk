# EnergyRadioStations SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

EnergyRadioStationsUtility.registrar = ->(u) {
  u.clean = EnergyRadioStationsUtilities::Clean
  u.done = EnergyRadioStationsUtilities::Done
  u.make_error = EnergyRadioStationsUtilities::MakeError
  u.feature_add = EnergyRadioStationsUtilities::FeatureAdd
  u.feature_hook = EnergyRadioStationsUtilities::FeatureHook
  u.feature_init = EnergyRadioStationsUtilities::FeatureInit
  u.fetcher = EnergyRadioStationsUtilities::Fetcher
  u.make_fetch_def = EnergyRadioStationsUtilities::MakeFetchDef
  u.make_context = EnergyRadioStationsUtilities::MakeContext
  u.make_options = EnergyRadioStationsUtilities::MakeOptions
  u.make_request = EnergyRadioStationsUtilities::MakeRequest
  u.make_response = EnergyRadioStationsUtilities::MakeResponse
  u.make_result = EnergyRadioStationsUtilities::MakeResult
  u.make_point = EnergyRadioStationsUtilities::MakePoint
  u.make_spec = EnergyRadioStationsUtilities::MakeSpec
  u.make_url = EnergyRadioStationsUtilities::MakeUrl
  u.param = EnergyRadioStationsUtilities::Param
  u.prepare_auth = EnergyRadioStationsUtilities::PrepareAuth
  u.prepare_body = EnergyRadioStationsUtilities::PrepareBody
  u.prepare_headers = EnergyRadioStationsUtilities::PrepareHeaders
  u.prepare_method = EnergyRadioStationsUtilities::PrepareMethod
  u.prepare_params = EnergyRadioStationsUtilities::PrepareParams
  u.prepare_path = EnergyRadioStationsUtilities::PreparePath
  u.prepare_query = EnergyRadioStationsUtilities::PrepareQuery
  u.result_basic = EnergyRadioStationsUtilities::ResultBasic
  u.result_body = EnergyRadioStationsUtilities::ResultBody
  u.result_headers = EnergyRadioStationsUtilities::ResultHeaders
  u.transform_request = EnergyRadioStationsUtilities::TransformRequest
  u.transform_response = EnergyRadioStationsUtilities::TransformResponse
}
