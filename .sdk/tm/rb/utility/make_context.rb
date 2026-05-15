# AntiPhishingDetection SDK utility: make_context
require_relative '../core/context'
module AntiPhishingDetectionUtilities
  MakeContext = ->(ctxmap, basectx) {
    AntiPhishingDetectionContext.new(ctxmap, basectx)
  }
end
