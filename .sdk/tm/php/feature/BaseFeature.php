<?php
declare(strict_types=1);

// AntiPhishingDetection SDK base feature

class AntiPhishingDetectionBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(AntiPhishingDetectionContext $ctx, array $options): void {}
    public function PostConstruct(AntiPhishingDetectionContext $ctx): void {}
    public function PostConstructEntity(AntiPhishingDetectionContext $ctx): void {}
    public function SetData(AntiPhishingDetectionContext $ctx): void {}
    public function GetData(AntiPhishingDetectionContext $ctx): void {}
    public function GetMatch(AntiPhishingDetectionContext $ctx): void {}
    public function SetMatch(AntiPhishingDetectionContext $ctx): void {}
    public function PrePoint(AntiPhishingDetectionContext $ctx): void {}
    public function PreSpec(AntiPhishingDetectionContext $ctx): void {}
    public function PreRequest(AntiPhishingDetectionContext $ctx): void {}
    public function PreResponse(AntiPhishingDetectionContext $ctx): void {}
    public function PreResult(AntiPhishingDetectionContext $ctx): void {}
    public function PreDone(AntiPhishingDetectionContext $ctx): void {}
    public function PreUnexpected(AntiPhishingDetectionContext $ctx): void {}
}
