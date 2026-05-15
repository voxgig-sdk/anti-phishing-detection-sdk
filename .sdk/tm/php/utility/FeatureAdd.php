<?php
declare(strict_types=1);

// AntiPhishingDetection SDK utility: feature_add

class AntiPhishingDetectionFeatureAdd
{
    public static function call(AntiPhishingDetectionContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
