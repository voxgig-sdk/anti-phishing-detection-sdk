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
    public ?string $details = null;
    public ?array $indicators = null;
    public ?bool $isPhishing = null;
    public ?string $recommendation = null;
    public ?string $resource = null;
    public ?string $scanId = null;
    public ?float $score = null;
    public ?string $threatLevel = null;
    public ?string $timestamp = null;
    public ?string $url = null;
}

/** Request payload for Detection#list. */
class DetectionListMatch
{
    public ?string $domain = null;
    public ?string $scan_id = null;
    public ?string $url = null;
}

/** Request payload for Detection#create. */
class DetectionCreateData
{
    public ?string $details = null;
    public ?array $indicators = null;
    public ?bool $isPhishing = null;
    public ?string $recommendation = null;
    public ?string $resource = null;
    public ?string $scanId = null;
    public ?float $score = null;
    public ?string $threatLevel = null;
    public ?string $timestamp = null;
    public ?string $url = null;
}

