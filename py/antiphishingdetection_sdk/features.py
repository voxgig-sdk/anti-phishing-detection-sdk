# AntiPhishingDetection SDK feature factory

from antiphishingdetection_sdk.feature.base_feature import AntiPhishingDetectionBaseFeature
from antiphishingdetection_sdk.feature.test_feature import AntiPhishingDetectionTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AntiPhishingDetectionBaseFeature(),
        "test": lambda: AntiPhishingDetectionTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
