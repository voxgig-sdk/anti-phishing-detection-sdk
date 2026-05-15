<?php
declare(strict_types=1);

// AntiPhishingDetection SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class AntiPhishingDetectionFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new AntiPhishingDetectionBaseFeature();
            case "test":
                return new AntiPhishingDetectionTestFeature();
            default:
                return new AntiPhishingDetectionBaseFeature();
        }
    }
}
