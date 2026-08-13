# LongevityCompetition SDK utility registration
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
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

LongevityCompetitionUtility.registrar = ->(u) {
  u.clean = LongevityCompetitionUtilities::Clean
  u.done = LongevityCompetitionUtilities::Done
  u.make_error = LongevityCompetitionUtilities::MakeError
  u.feature_add = LongevityCompetitionUtilities::FeatureAdd
  u.feature_hook = LongevityCompetitionUtilities::FeatureHook
  u.feature_init = LongevityCompetitionUtilities::FeatureInit
  u.fetcher = LongevityCompetitionUtilities::Fetcher
  u.make_fetch_def = LongevityCompetitionUtilities::MakeFetchDef
  u.make_context = LongevityCompetitionUtilities::MakeContext
  u.make_options = LongevityCompetitionUtilities::MakeOptions
  u.make_request = LongevityCompetitionUtilities::MakeRequest
  u.make_response = LongevityCompetitionUtilities::MakeResponse
  u.make_result = LongevityCompetitionUtilities::MakeResult
  u.make_point = LongevityCompetitionUtilities::MakePoint
  u.make_spec = LongevityCompetitionUtilities::MakeSpec
  u.make_url = LongevityCompetitionUtilities::MakeUrl
  u.param = LongevityCompetitionUtilities::Param
  u.prepare_auth = LongevityCompetitionUtilities::PrepareAuth
  u.prepare_body = LongevityCompetitionUtilities::PrepareBody
  u.prepare_headers = LongevityCompetitionUtilities::PrepareHeaders
  u.prepare_method = LongevityCompetitionUtilities::PrepareMethod
  u.prepare_params = LongevityCompetitionUtilities::PrepareParams
  u.prepare_path = LongevityCompetitionUtilities::PreparePath
  u.prepare_query = LongevityCompetitionUtilities::PrepareQuery
  u.graphql_body = LongevityCompetitionUtilities::GraphqlBody
  u.graphql_errors = LongevityCompetitionUtilities::GraphqlErrors
  u.result_basic = LongevityCompetitionUtilities::ResultBasic
  u.result_body = LongevityCompetitionUtilities::ResultBody
  u.result_headers = LongevityCompetitionUtilities::ResultHeaders
  u.transform_request = LongevityCompetitionUtilities::TransformRequest
  u.transform_response = LongevityCompetitionUtilities::TransformResponse
}
