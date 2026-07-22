<?php
declare(strict_types=1);

// LongevityCompetition SDK utility: result_headers

class LongevityCompetitionResultHeaders
{
    public static function call(LongevityCompetitionContext $ctx): ?LongevityCompetitionResult
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
