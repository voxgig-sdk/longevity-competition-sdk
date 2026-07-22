# Typed models for the LongevityCompetition SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Athlete(TypedDict, total=False):
    age_reduction: float
    biological_age: float
    chronological_age: float
    clock_type: str
    country: str
    division: str
    effective_age_reduction: float
    generation: str
    id: str
    last_updated: str
    league: str
    name: str
    profile_url: str
    rank: int
    ultimate_league_rank: int


class AthleteListMatch(TypedDict, total=False):
    age_reduction: float
    biological_age: float
    chronological_age: float
    clock_type: str
    country: str
    division: str
    effective_age_reduction: float
    generation: str
    id: str
    last_updated: str
    league: str
    name: str
    profile_url: str
    rank: int
    ultimate_league_rank: int


class BortzAgeRequired(TypedDict):
    biomarker: dict


class BortzAge(BortzAgeRequired, total=False):
    age_reduction: float
    bortz_age: float
    chronological_age: float
    season: str


class BortzAgeCreateDataRequired(TypedDict):
    biomarker: dict


class BortzAgeCreateData(BortzAgeCreateDataRequired, total=False):
    age_reduction: float
    bortz_age: float
    chronological_age: float
    season: str


class Competition(TypedDict, total=False):
    age_range: str
    id: str
    max_age: int
    min_age: int
    name: str


class CompetitionListMatch(TypedDict, total=False):
    age_range: str
    id: str
    max_age: int
    min_age: int
    name: str


class Leaderboard(TypedDict, total=False):
    age_reduction: float
    athlete_id: str
    athlete_name: str
    country: str
    division: str
    league: str
    rank: int


class LeaderboardListMatch(TypedDict, total=False):
    age_reduction: float
    athlete_id: str
    athlete_name: str
    country: str
    division: str
    league: str
    rank: int


class PhenoAgeRequired(TypedDict):
    biomarker: dict


class PhenoAge(PhenoAgeRequired, total=False):
    age_reduction: float
    calculation_method: str
    chronological_age: float
    pheno_age: float


class PhenoAgeCreateDataRequired(TypedDict):
    biomarker: dict


class PhenoAgeCreateData(PhenoAgeCreateDataRequired, total=False):
    age_reduction: float
    calculation_method: str
    chronological_age: float
    pheno_age: float


class RankPreviewRequired(TypedDict):
    biological_age: float
    chronological_age: float


class RankPreview(RankPreviewRequired, total=False):
    age_reduction: float
    athletes_in_league: int
    division: str
    estimated_rank: int
    estimated_ultimate_league_rank: int
    league: str
    percentile: float


class RankPreviewCreateDataRequired(TypedDict):
    biological_age: float
    chronological_age: float


class RankPreviewCreateData(RankPreviewCreateDataRequired, total=False):
    age_reduction: float
    athletes_in_league: int
    division: str
    estimated_rank: int
    estimated_ultimate_league_rank: int
    league: str
    percentile: float


class Reference(TypedDict, total=False):
    country_code: str
    country_name: str
    flag_url: str


class ReferenceListMatch(TypedDict, total=False):
    country_code: str
    country_name: str
    flag_url: str
