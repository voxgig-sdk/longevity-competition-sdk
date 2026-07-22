<?php
declare(strict_types=1);

// LongevityCompetition SDK utility: result_body

class LongevityCompetitionResultBody
{
    public static function call(LongevityCompetitionContext $ctx): ?LongevityCompetitionResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
