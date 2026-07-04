<?php
declare(strict_types=1);

// Typed models for the AntiPhishingDetection SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Detection entity data model. */
class Detection
{
    public ?string $detail = null;
    public ?array $indicator = null;
    public ?bool $is_phishing = null;
    public ?string $recommendation = null;
    public ?string $resource = null;
    public ?string $scan_id = null;
    public ?float $score = null;
    public ?string $threat_level = null;
    public ?string $timestamp = null;
    public ?string $url = null;
}

/** Match filter for Detection#list (any subset of Detection fields). */
class DetectionListMatch
{
    public ?string $detail = null;
    public ?array $indicator = null;
    public ?bool $is_phishing = null;
    public ?string $recommendation = null;
    public ?string $resource = null;
    public ?string $scan_id = null;
    public ?float $score = null;
    public ?string $threat_level = null;
    public ?string $timestamp = null;
    public ?string $url = null;
}

/** Match filter for Detection#create (any subset of Detection fields). */
class DetectionCreateData
{
    public ?string $detail = null;
    public ?array $indicator = null;
    public ?bool $is_phishing = null;
    public ?string $recommendation = null;
    public ?string $resource = null;
    public ?string $scan_id = null;
    public ?float $score = null;
    public ?string $threat_level = null;
    public ?string $timestamp = null;
    public ?string $url = null;
}

