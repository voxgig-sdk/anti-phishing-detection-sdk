<?php
declare(strict_types=1);

// AntiPhishingDetection SDK utility: prepare_body

class AntiPhishingDetectionPrepareBody
{
    public static function call(AntiPhishingDetectionContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
