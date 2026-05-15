# AntiPhishingDetection SDK utility: feature_add
module AntiPhishingDetectionUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
