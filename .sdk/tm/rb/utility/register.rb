# AntiPhishingDetection SDK utility registration
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

AntiPhishingDetectionUtility.registrar = ->(u) {
  u.clean = AntiPhishingDetectionUtilities::Clean
  u.done = AntiPhishingDetectionUtilities::Done
  u.make_error = AntiPhishingDetectionUtilities::MakeError
  u.feature_add = AntiPhishingDetectionUtilities::FeatureAdd
  u.feature_hook = AntiPhishingDetectionUtilities::FeatureHook
  u.feature_init = AntiPhishingDetectionUtilities::FeatureInit
  u.fetcher = AntiPhishingDetectionUtilities::Fetcher
  u.make_fetch_def = AntiPhishingDetectionUtilities::MakeFetchDef
  u.make_context = AntiPhishingDetectionUtilities::MakeContext
  u.make_options = AntiPhishingDetectionUtilities::MakeOptions
  u.make_request = AntiPhishingDetectionUtilities::MakeRequest
  u.make_response = AntiPhishingDetectionUtilities::MakeResponse
  u.make_result = AntiPhishingDetectionUtilities::MakeResult
  u.make_point = AntiPhishingDetectionUtilities::MakePoint
  u.make_spec = AntiPhishingDetectionUtilities::MakeSpec
  u.make_url = AntiPhishingDetectionUtilities::MakeUrl
  u.param = AntiPhishingDetectionUtilities::Param
  u.prepare_auth = AntiPhishingDetectionUtilities::PrepareAuth
  u.prepare_body = AntiPhishingDetectionUtilities::PrepareBody
  u.prepare_headers = AntiPhishingDetectionUtilities::PrepareHeaders
  u.prepare_method = AntiPhishingDetectionUtilities::PrepareMethod
  u.prepare_params = AntiPhishingDetectionUtilities::PrepareParams
  u.prepare_path = AntiPhishingDetectionUtilities::PreparePath
  u.prepare_query = AntiPhishingDetectionUtilities::PrepareQuery
  u.result_basic = AntiPhishingDetectionUtilities::ResultBasic
  u.result_body = AntiPhishingDetectionUtilities::ResultBody
  u.result_headers = AntiPhishingDetectionUtilities::ResultHeaders
  u.transform_request = AntiPhishingDetectionUtilities::TransformRequest
  u.transform_response = AntiPhishingDetectionUtilities::TransformResponse
}
