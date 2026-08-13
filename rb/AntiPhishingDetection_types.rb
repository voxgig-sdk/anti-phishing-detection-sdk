# frozen_string_literal: true

# Typed models for the AntiPhishingDetection SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Detection entity data model.
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] indicators
#   @return [Array, nil]
#
# @!attribute [rw] isPhishing
#   @return [Boolean, nil]
#
# @!attribute [rw] recommendation
#   @return [String, nil]
#
# @!attribute [rw] resource
#   @return [String, nil]
#
# @!attribute [rw] scanId
#   @return [String, nil]
#
# @!attribute [rw] score
#   @return [Float, nil]
#
# @!attribute [rw] threatLevel
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Detection = Struct.new(
  :details,
  :indicators,
  :isPhishing,
  :recommendation,
  :resource,
  :scanId,
  :score,
  :threatLevel,
  :timestamp,
  :url,
  keyword_init: true
)

# Request payload for Detection#list.
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] indicators
#   @return [Array, nil]
#
# @!attribute [rw] isPhishing
#   @return [Boolean, nil]
#
# @!attribute [rw] recommendation
#   @return [String, nil]
#
# @!attribute [rw] resource
#   @return [String, nil]
#
# @!attribute [rw] scanId
#   @return [String, nil]
#
# @!attribute [rw] score
#   @return [Float, nil]
#
# @!attribute [rw] threatLevel
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
DetectionListMatch = Struct.new(
  :details,
  :indicators,
  :isPhishing,
  :recommendation,
  :resource,
  :scanId,
  :score,
  :threatLevel,
  :timestamp,
  :url,
  keyword_init: true
)

# Request payload for Detection#create.
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] indicators
#   @return [Array, nil]
#
# @!attribute [rw] isPhishing
#   @return [Boolean, nil]
#
# @!attribute [rw] recommendation
#   @return [String, nil]
#
# @!attribute [rw] resource
#   @return [String, nil]
#
# @!attribute [rw] scanId
#   @return [String, nil]
#
# @!attribute [rw] score
#   @return [Float, nil]
#
# @!attribute [rw] threatLevel
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
DetectionCreateData = Struct.new(
  :details,
  :indicators,
  :isPhishing,
  :recommendation,
  :resource,
  :scanId,
  :score,
  :threatLevel,
  :timestamp,
  :url,
  keyword_init: true
)

