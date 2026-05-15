# AntiPhishingDetection SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module AntiPhishingDetectionFeatures
  def self.make_feature(name)
    case name
    when "base"
      AntiPhishingDetectionBaseFeature.new
    when "test"
      AntiPhishingDetectionTestFeature.new
    else
      AntiPhishingDetectionBaseFeature.new
    end
  end
end
