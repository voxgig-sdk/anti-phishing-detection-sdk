// Typed models for the AntiPhishingDetection SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Detection {
  detail?: string
  indicator?: any[]
  is_phishing?: boolean
  recommendation?: string
  resource?: string
  scan_id?: string
  score?: number
  threat_level?: string
  timestamp?: string
  url?: string
}

export type DetectionListMatch = Partial<Detection>

export type DetectionCreateData = Partial<Detection>

