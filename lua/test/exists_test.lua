-- LongevityCompetition SDK exists test

local sdk = require("longevity-competition_sdk")

describe("LongevityCompetitionSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
