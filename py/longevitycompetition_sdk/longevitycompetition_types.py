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
    ageReduction: float
    biologicalAge: float
    chronologicalAge: float
    clockType: str
    country: str
    division: str
    effectiveAgeReduction: float
    generation: str
    id: str
    lastUpdated: str
    league: str
    name: str
    profileUrl: str
    rank: int
    ultimateLeagueRank: int


class AthleteListMatch(TypedDict, total=False):
    ageReduction: float
    biologicalAge: float
    chronologicalAge: float
    clockType: str
    country: str
    division: str
    effectiveAgeReduction: float
    generation: str
    id: str
    lastUpdated: str
    league: str
    name: str
    profileUrl: str
    rank: int
    ultimateLeagueRank: int


class BortzAgeRequired(TypedDict):
    biomarkers: dict


class BortzAge(BortzAgeRequired, total=False):
    ageReduction: float
    bortzAge: float
    chronologicalAge: float
    season: str


class BortzAgeCreateDataRequired(TypedDict):
    biomarkers: dict


class BortzAgeCreateData(BortzAgeCreateDataRequired, total=False):
    ageReduction: float
    bortzAge: float
    chronologicalAge: float
    season: str


class Competition(TypedDict, total=False):
    ageRange: str
    id: str
    maxAge: int
    minAge: int
    name: str


class CompetitionListMatch(TypedDict, total=False):
    ageRange: str
    id: str
    maxAge: int
    minAge: int
    name: str


class Leaderboard(TypedDict, total=False):
    ageReduction: float
    athleteId: str
    athleteName: str
    country: str
    division: str
    league: str
    rank: int


class LeaderboardListMatch(TypedDict, total=False):
    ageReduction: float
    athleteId: str
    athleteName: str
    country: str
    division: str
    league: str
    rank: int


class PhenoAgeRequired(TypedDict):
    biomarkers: dict


class PhenoAge(PhenoAgeRequired, total=False):
    ageReduction: float
    calculationMethod: str
    chronologicalAge: float
    phenoAge: float


class PhenoAgeCreateDataRequired(TypedDict):
    biomarkers: dict


class PhenoAgeCreateData(PhenoAgeCreateDataRequired, total=False):
    ageReduction: float
    calculationMethod: str
    chronologicalAge: float
    phenoAge: float


class RankPreviewRequired(TypedDict):
    biologicalAge: float
    chronologicalAge: float


class RankPreview(RankPreviewRequired, total=False):
    ageReduction: float
    athletesInLeague: int
    division: str
    estimatedRank: int
    estimatedUltimateLeagueRank: int
    league: str
    percentile: float


class RankPreviewCreateDataRequired(TypedDict):
    biologicalAge: float
    chronologicalAge: float


class RankPreviewCreateData(RankPreviewCreateDataRequired, total=False):
    ageReduction: float
    athletesInLeague: int
    division: str
    estimatedRank: int
    estimatedUltimateLeagueRank: int
    league: str
    percentile: float


class Reference(TypedDict, total=False):
    countryCode: str
    countryName: str
    flagUrl: str


class ReferenceListMatch(TypedDict, total=False):
    countryCode: str
    countryName: str
    flagUrl: str
