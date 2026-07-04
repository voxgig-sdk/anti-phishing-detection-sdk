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
# @!attribute [rw] detail
#   @return [String, nil]
#
# @!attribute [rw] indicator
#   @return [Array, nil]
#
# @!attribute [rw] is_phishing
#   @return [Boolean, nil]
#
# @!attribute [rw] recommendation
#   @return [String, nil]
#
# @!attribute [rw] resource
#   @return [String, nil]
#
# @!attribute [rw] scan_id
#   @return [String, nil]
#
# @!attribute [rw] score
#   @return [Float, nil]
#
# @!attribute [rw] threat_level
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Detection = Struct.new(
  :detail,
  :indicator,
  :is_phishing,
  :recommendation,
  :resource,
  :scan_id,
  :score,
  :threat_level,
  :timestamp,
  :url,
  keyword_init: true
)

# Match filter for Detection#list (any subset of Detection fields).
#
# @!attribute [rw] detail
#   @return [String, nil]
#
# @!attribute [rw] indicator
#   @return [Array, nil]
#
# @!attribute [rw] is_phishing
#   @return [Boolean, nil]
#
# @!attribute [rw] recommendation
#   @return [String, nil]
#
# @!attribute [rw] resource
#   @return [String, nil]
#
# @!attribute [rw] scan_id
#   @return [String, nil]
#
# @!attribute [rw] score
#   @return [Float, nil]
#
# @!attribute [rw] threat_level
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
DetectionListMatch = Struct.new(
  :detail,
  :indicator,
  :is_phishing,
  :recommendation,
  :resource,
  :scan_id,
  :score,
  :threat_level,
  :timestamp,
  :url,
  keyword_init: true
)

# Match filter for Detection#create (any subset of Detection fields).
#
# @!attribute [rw] detail
#   @return [String, nil]
#
# @!attribute [rw] indicator
#   @return [Array, nil]
#
# @!attribute [rw] is_phishing
#   @return [Boolean, nil]
#
# @!attribute [rw] recommendation
#   @return [String, nil]
#
# @!attribute [rw] resource
#   @return [String, nil]
#
# @!attribute [rw] scan_id
#   @return [String, nil]
#
# @!attribute [rw] score
#   @return [Float, nil]
#
# @!attribute [rw] threat_level
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
DetectionCreateData = Struct.new(
  :detail,
  :indicator,
  :is_phishing,
  :recommendation,
  :resource,
  :scan_id,
  :score,
  :threat_level,
  :timestamp,
  :url,
  keyword_init: true
)

