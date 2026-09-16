# AntiPhishingDetection SDK feature factory

from antiphishingdetection_sdk.feature.base_feature import AntiPhishingDetectionBaseFeature
from antiphishingdetection_sdk.feature.ratelimit_feature import AntiPhishingDetectionRatelimitFeature
from antiphishingdetection_sdk.feature.retry_feature import AntiPhishingDetectionRetryFeature
from antiphishingdetection_sdk.feature.test_feature import AntiPhishingDetectionTestFeature
from antiphishingdetection_sdk.feature.timeout_feature import AntiPhishingDetectionTimeoutFeature


_FEATURES = {
    "base": lambda: AntiPhishingDetectionBaseFeature(),
    "ratelimit": lambda: AntiPhishingDetectionRatelimitFeature(),
    "retry": lambda: AntiPhishingDetectionRetryFeature(),
    "test": lambda: AntiPhishingDetectionTestFeature(),
    "timeout": lambda: AntiPhishingDetectionTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
