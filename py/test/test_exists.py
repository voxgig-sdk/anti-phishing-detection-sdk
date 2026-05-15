# ProjectName SDK exists test

import pytest
from antiphishingdetection_sdk import AntiPhishingDetectionSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AntiPhishingDetectionSDK.test(None, None)
        assert testsdk is not None
