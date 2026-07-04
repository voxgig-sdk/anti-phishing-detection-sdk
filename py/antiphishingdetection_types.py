# Typed models for the AntiPhishingDetection SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Detection:
    detail: Optional[str] = None
    indicator: Optional[list] = None
    is_phishing: Optional[bool] = None
    recommendation: Optional[str] = None
    resource: Optional[str] = None
    scan_id: Optional[str] = None
    score: Optional[float] = None
    threat_level: Optional[str] = None
    timestamp: Optional[str] = None
    url: Optional[str] = None


@dataclass
class DetectionListMatch:
    detail: Optional[str] = None
    indicator: Optional[list] = None
    is_phishing: Optional[bool] = None
    recommendation: Optional[str] = None
    resource: Optional[str] = None
    scan_id: Optional[str] = None
    score: Optional[float] = None
    threat_level: Optional[str] = None
    timestamp: Optional[str] = None
    url: Optional[str] = None


@dataclass
class DetectionCreateData:
    detail: Optional[str] = None
    indicator: Optional[list] = None
    is_phishing: Optional[bool] = None
    recommendation: Optional[str] = None
    resource: Optional[str] = None
    scan_id: Optional[str] = None
    score: Optional[float] = None
    threat_level: Optional[str] = None
    timestamp: Optional[str] = None
    url: Optional[str] = None

