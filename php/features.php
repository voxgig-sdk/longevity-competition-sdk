<?php
declare(strict_types=1);

// LongevityCompetition SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class LongevityCompetitionFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new LongevityCompetitionBaseFeature();
            case "test":
                return new LongevityCompetitionTestFeature();
            default:
                return new LongevityCompetitionBaseFeature();
        }
    }
}
