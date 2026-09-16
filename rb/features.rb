# AntiPhishingDetection SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AntiPhishingDetectionFeatures
  def self.make_feature(name)
    case name
    when "base"
      AntiPhishingDetectionBaseFeature.new
    when "ratelimit"
      AntiPhishingDetectionRatelimitFeature.new
    when "retry"
      AntiPhishingDetectionRetryFeature.new
    when "test"
      AntiPhishingDetectionTestFeature.new
    when "timeout"
      AntiPhishingDetectionTimeoutFeature.new
    else
      AntiPhishingDetectionBaseFeature.new
    end
  end
end
