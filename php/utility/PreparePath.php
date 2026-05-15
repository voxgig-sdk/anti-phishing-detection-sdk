<?php
declare(strict_types=1);

// AntiPhishingDetection SDK utility: prepare_path

class AntiPhishingDetectionPreparePath
{
    public static function call(AntiPhishingDetectionContext $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
