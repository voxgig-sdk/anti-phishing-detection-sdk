# AntiPhishingDetection SDK utility: make_context

from projectname_sdk.core.context import AntiPhishingDetectionContext


def make_context_util(ctxmap, basectx):
    return AntiPhishingDetectionContext(ctxmap, basectx)
