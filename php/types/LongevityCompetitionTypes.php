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
    public ?float $ageReduction = null;
    public ?float $biologicalAge = null;
    public ?float $chronologicalAge = null;
    public ?string $clockType = null;
    public ?string $country = null;
    public ?string $division = null;
    public ?float $effectiveAgeReduction = null;
    public ?string $generation = null;
    public ?string $id = null;
    public ?string $lastUpdated = null;
    public ?string $league = null;
    public ?string $name = null;
    public ?string $profileUrl = null;
    public ?int $rank = null;
    public ?int $ultimateLeagueRank = null;
}

/** Request payload for Athlete#list. */
class AthleteListMatch
{
    public ?float $ageReduction = null;
    public ?float $biologicalAge = null;
    public ?float $chronologicalAge = null;
    public ?string $clockType = null;
    public ?string $country = null;
    public ?string $division = null;
    public ?float $effectiveAgeReduction = null;
    public ?string $generation = null;
    public ?string $id = null;
    public ?string $lastUpdated = null;
    public ?string $league = null;
    public ?string $name = null;
    public ?string $profileUrl = null;
    public ?int $rank = null;
    public ?int $ultimateLeagueRank = null;
}

/** BortzAge entity data model. */
class BortzAge
{
    public ?float $ageReduction = null;
    public array $biomarkers;
    public ?float $bortzAge = null;
    public ?float $chronologicalAge = null;
    public ?string $season = null;
}

/** Request payload for BortzAge#create. */
class BortzAgeCreateData
{
    public ?float $ageReduction = null;
    public array $biomarkers;
    public ?float $bortzAge = null;
    public ?float $chronologicalAge = null;
    public ?string $season = null;
}

/** Competition entity data model. */
class Competition
{
    public ?string $ageRange = null;
    public ?string $id = null;
    public ?int $maxAge = null;
    public ?int $minAge = null;
    public ?string $name = null;
}

/** Request payload for Competition#list. */
class CompetitionListMatch
{
    public ?string $ageRange = null;
    public ?string $id = null;
    public ?int $maxAge = null;
    public ?int $minAge = null;
    public ?string $name = null;
}

/** Leaderboard entity data model. */
class Leaderboard
{
    public ?float $ageReduction = null;
    public ?string $athleteId = null;
    public ?string $athleteName = null;
    public ?string $country = null;
    public ?string $division = null;
    public ?string $league = null;
    public ?int $rank = null;
}

/** Request payload for Leaderboard#list. */
class LeaderboardListMatch
{
    public ?float $ageReduction = null;
    public ?string $athleteId = null;
    public ?string $athleteName = null;
    public ?string $country = null;
    public ?string $division = null;
    public ?string $league = null;
    public ?int $rank = null;
}

/** PhenoAge entity data model. */
class PhenoAge
{
    public ?float $ageReduction = null;
    public array $biomarkers;
    public ?string $calculationMethod = null;
    public ?float $chronologicalAge = null;
    public ?float $phenoAge = null;
}

/** Request payload for PhenoAge#create. */
class PhenoAgeCreateData
{
    public ?float $ageReduction = null;
    public array $biomarkers;
    public ?string $calculationMethod = null;
    public ?float $chronologicalAge = null;
    public ?float $phenoAge = null;
}

/** RankPreview entity data model. */
class RankPreview
{
    public ?float $ageReduction = null;
    public ?int $athletesInLeague = null;
    public float $biologicalAge;
    public float $chronologicalAge;
    public ?string $division = null;
    public ?int $estimatedRank = null;
    public ?int $estimatedUltimateLeagueRank = null;
    public ?string $league = null;
    public ?float $percentile = null;
}

/** Request payload for RankPreview#create. */
class RankPreviewCreateData
{
    public ?float $ageReduction = null;
    public ?int $athletesInLeague = null;
    public float $biologicalAge;
    public float $chronologicalAge;
    public ?string $division = null;
    public ?int $estimatedRank = null;
    public ?int $estimatedUltimateLeagueRank = null;
    public ?string $league = null;
    public ?float $percentile = null;
}

/** Reference entity data model. */
class Reference
{
    public ?string $countryCode = null;
    public ?string $countryName = null;
    public ?string $flagUrl = null;
}

/** Request payload for Reference#list. */
class ReferenceListMatch
{
    public ?string $countryCode = null;
    public ?string $countryName = null;
    public ?string $flagUrl = null;
}

