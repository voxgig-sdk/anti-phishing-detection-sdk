<?php
declare(strict_types=1);

// AntiPhishingDetection SDK utility: result_body

class AntiPhishingDetectionResultBody
{
    public static function call(AntiPhishingDetectionContext $ctx): ?AntiPhishingDetectionResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
