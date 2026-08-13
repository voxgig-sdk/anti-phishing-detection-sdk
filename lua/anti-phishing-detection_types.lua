-- Typed models for the AntiPhishingDetection SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Detection
---@field details? string
---@field indicators? table
---@field isPhishing? boolean
---@field recommendation? string
---@field resource? string
---@field scanId? string
---@field score? number
---@field threatLevel? string
---@field timestamp? string
---@field url? string

---@class DetectionListMatch
---@field details? string
---@field indicators? table
---@field isPhishing? boolean
---@field recommendation? string
---@field resource? string
---@field scanId? string
---@field score? number
---@field threatLevel? string
---@field timestamp? string
---@field url? string

---@class DetectionCreateData
---@field details? string
---@field indicators? table
---@field isPhishing? boolean
---@field recommendation? string
---@field resource? string
---@field scanId? string
---@field score? number
---@field threatLevel? string
---@field timestamp? string
---@field url? string

local M = {}

return M
