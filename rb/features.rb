# LongevityCompetition SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module LongevityCompetitionFeatures
  def self.make_feature(name)
    case name
    when "base"
      LongevityCompetitionBaseFeature.new
    when "test"
      LongevityCompetitionTestFeature.new
    else
      LongevityCompetitionBaseFeature.new
    end
  end
end
