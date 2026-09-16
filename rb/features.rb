# LongevityCompetition SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module LongevityCompetitionFeatures
  def self.make_feature(name)
    case name
    when "base"
      LongevityCompetitionBaseFeature.new
    when "ratelimit"
      LongevityCompetitionRatelimitFeature.new
    when "retry"
      LongevityCompetitionRetryFeature.new
    when "test"
      LongevityCompetitionTestFeature.new
    when "timeout"
      LongevityCompetitionTimeoutFeature.new
    else
      LongevityCompetitionBaseFeature.new
    end
  end
end
