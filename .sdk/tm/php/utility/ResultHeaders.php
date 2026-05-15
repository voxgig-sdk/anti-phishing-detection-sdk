<?php
declare(strict_types=1);

// AntiPhishingDetection SDK utility: result_headers

class AntiPhishingDetectionResultHeaders
{
    public static function call(AntiPhishingDetectionContext $ctx): ?AntiPhishingDetectionResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
