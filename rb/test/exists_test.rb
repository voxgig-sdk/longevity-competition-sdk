# LongevityCompetition SDK exists test

require "minitest/autorun"
require_relative "../LongevityCompetition_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = LongevityCompetitionSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
