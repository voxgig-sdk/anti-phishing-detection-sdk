# AntiPhishingDetection SDK utility: prepare_body
require_relative 'media'
module AntiPhishingDetectionUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return AntiPhishingDetectionUtilities.raw_body(ctx.reqdata) if AntiPhishingDetectionUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
