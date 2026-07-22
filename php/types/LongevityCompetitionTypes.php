<?php
declare(strict_types=1);

// Typed models for the LongevityCompetition SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Athlete entity data model. */
class Athlete
{
    public ?float $age_reduction = null;
    public ?float $biological_age = null;
    public ?float $chronological_age = null;
    public ?string $clock_type = null;
    public ?string $country = null;
    public ?string $division = null;
    public ?float $effective_age_reduction = null;
    public ?string $generation = null;
    public ?string $id = null;
    public ?string $last_updated = null;
    public ?string $league = null;
    public ?string $name = null;
    public ?string $profile_url = null;
    public ?int $rank = null;
    public ?int $ultimate_league_rank = null;
}

/** Request payload for Athlete#list. */
class AthleteListMatch
{
    public ?float $age_reduction = null;
    public ?float $biological_age = null;
    public ?float $chronological_age = null;
    public ?string $clock_type = null;
    public ?string $country = null;
    public ?string $division = null;
    public ?float $effective_age_reduction = null;
    public ?string $generation = null;
    public ?string $id = null;
    public ?string $last_updated = null;
    public ?string $league = null;
    public ?string $name = null;
    public ?string $profile_url = null;
    public ?int $rank = null;
    public ?int $ultimate_league_rank = null;
}

/** BortzAge entity data model. */
class BortzAge
{
    public ?float $age_reduction = null;
    public array $biomarker;
    public ?float $bortz_age = null;
    public ?float $chronological_age = null;
    public ?string $season = null;
}

/** Request payload for BortzAge#create. */
class BortzAgeCreateData
{
    public ?float $age_reduction = null;
    public array $biomarker;
    public ?float $bortz_age = null;
    public ?float $chronological_age = null;
    public ?string $season = null;
}

/** Competition entity data model. */
class Competition
{
    public ?string $age_range = null;
    public ?string $id = null;
    public ?int $max_age = null;
    public ?int $min_age = null;
    public ?string $name = null;
}

/** Request payload for Competition#list. */
class CompetitionListMatch
{
    public ?string $age_range = null;
    public ?string $id = null;
    public ?int $max_age = null;
    public ?int $min_age = null;
    public ?string $name = null;
}

/** Leaderboard entity data model. */
class Leaderboard
{
    public ?float $age_reduction = null;
    public ?string $athlete_id = null;
    public ?string $athlete_name = null;
    public ?string $country = null;
    public ?string $division = null;
    public ?string $league = null;
    public ?int $rank = null;
}

/** Request payload for Leaderboard#list. */
class LeaderboardListMatch
{
    public ?float $age_reduction = null;
    public ?string $athlete_id = null;
    public ?string $athlete_name = null;
    public ?string $country = null;
    public ?string $division = null;
    public ?string $league = null;
    public ?int $rank = null;
}

/** PhenoAge entity data model. */
class PhenoAge
{
    public ?float $age_reduction = null;
    public array $biomarker;
    public ?string $calculation_method = null;
    public ?float $chronological_age = null;
    public ?float $pheno_age = null;
}

/** Request payload for PhenoAge#create. */
class PhenoAgeCreateData
{
    public ?float $age_reduction = null;
    public array $biomarker;
    public ?string $calculation_method = null;
    public ?float $chronological_age = null;
    public ?float $pheno_age = null;
}

/** RankPreview entity data model. */
class RankPreview
{
    public ?float $age_reduction = null;
    public ?int $athletes_in_league = null;
    public float $biological_age;
    public float $chronological_age;
    public ?string $division = null;
    public ?int $estimated_rank = null;
    public ?int $estimated_ultimate_league_rank = null;
    public ?string $league = null;
    public ?float $percentile = null;
}

/** Request payload for RankPreview#create. */
class RankPreviewCreateData
{
    public ?float $age_reduction = null;
    public ?int $athletes_in_league = null;
    public float $biological_age;
    public float $chronological_age;
    public ?string $division = null;
    public ?int $estimated_rank = null;
    public ?int $estimated_ultimate_league_rank = null;
    public ?string $league = null;
    public ?float $percentile = null;
}

/** Reference entity data model. */
class Reference
{
    public ?string $country_code = null;
    public ?string $country_name = null;
    public ?string $flag_url = null;
}

/** Request payload for Reference#list. */
class ReferenceListMatch
{
    public ?string $country_code = null;
    public ?string $country_name = null;
    public ?string $flag_url = null;
}

