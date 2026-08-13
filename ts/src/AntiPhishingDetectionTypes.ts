// Typed models for the AntiPhishingDetection SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Detection {
  details?: string
  indicators?: any[]
  isPhishing?: boolean
  recommendation?: string
  resource?: string
  scanId?: string
  score?: number
  threatLevel?: string
  timestamp?: string
  url?: string
}

export interface DetectionListMatch {
  details?: string
  indicators?: any[]
  isPhishing?: boolean
  recommendation?: string
  resource?: string
  scanId?: string
  score?: number
  threatLevel?: string
  timestamp?: string
  url?: string
}

export interface DetectionCreateData {
  details?: string
  indicators?: any[]
  isPhishing?: boolean
  recommendation?: string
  resource?: string
  scanId?: string
  score?: number
  threatLevel?: string
  timestamp?: string
  url?: string
}

