<?php
declare(strict_types=1);

// AntiPhishingDetection SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AntiPhishingDetectionMakeContext
{
    public static function call(array $ctxmap, ?AntiPhishingDetectionContext $basectx): AntiPhishingDetectionContext
    {
        return new AntiPhishingDetectionContext($ctxmap, $basectx);
    }
}
