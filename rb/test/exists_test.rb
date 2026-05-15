# AntiPhishingDetection SDK exists test

require "minitest/autorun"
require_relative "../AntiPhishingDetection_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AntiPhishingDetectionSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
