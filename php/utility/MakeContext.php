<?php
declare(strict_types=1);

// LongevityCompetition SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class LongevityCompetitionMakeContext
{
    public static function call(array $ctxmap, ?LongevityCompetitionContext $basectx): LongevityCompetitionContext
    {
        return new LongevityCompetitionContext($ctxmap, $basectx);
    }
}
