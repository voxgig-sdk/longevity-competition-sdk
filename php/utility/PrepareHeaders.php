<?php
declare(strict_types=1);

// LongevityCompetition SDK utility: prepare_headers

class LongevityCompetitionPrepareHeaders
{
    public static function call(LongevityCompetitionContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
