<?php
declare(strict_types=1);

// LongevityCompetition SDK utility: prepare_body

class LongevityCompetitionPrepareBody
{
    public static function call(LongevityCompetitionContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
