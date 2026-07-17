-- AntiPhishingDetection SDK exists test

local sdk = require("anti-phishing-detection_sdk")

describe("AntiPhishingDetectionSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
