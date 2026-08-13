# frozen_string_literal: true

# Typed models for the LongevityCompetition SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Athlete entity data model.
#
# @!attribute [rw] ageReduction
#   @return [Float, nil]
#
# @!attribute [rw] biologicalAge
#   @return [Float, nil]
#
# @!attribute [rw] chronologicalAge
#   @return [Float, nil]
#
# @!attribute [rw] clockType
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] effectiveAgeReduction
#   @return [Float, nil]
#
# @!attribute [rw] generation
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] league
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] profileUrl
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] ultimateLeagueRank
#   @return [Integer, nil]
Athlete = Struct.new(
  :ageReduction,
  :biologicalAge,
  :chronologicalAge,
  :clockType,
  :country,
  :division,
  :effectiveAgeReduction,
  :generation,
  :id,
  :lastUpdated,
  :league,
  :name,
  :profileUrl,
  :rank,
  :ultimateLeagueRank,
  keyword_init: true
)

# Request payload for Athlete#list.
#
# @!attribute [rw] ageReduction
#   @return [Float, nil]
#
# @!attribute [rw] biologicalAge
#   @return [Float, nil]
#
# @!attribute [rw] chronologicalAge
#   @return [Float, nil]
#
# @!attribute [rw] clockType
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] effectiveAgeReduction
#   @return [Float, nil]
#
# @!attribute [rw] generation
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lastUpdated
#   @return [String, nil]
#
# @!attribute [rw] league
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] profileUrl
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] ultimateLeagueRank
#   @return [Integer, nil]
AthleteListMatch = Struct.new(
  :ageReduction,
  :biologicalAge,
  :chronologicalAge,
  :clockType,
  :country,
  :division,
  :effectiveAgeReduction,
  :generation,
  :id,
  :lastUpdated,
  :league,
  :name,
  :profileUrl,
  :rank,
  :ultimateLeagueRank,
  keyword_init: true
)

# BortzAge entity data model.
#
# @!attribute [rw] ageReduction
#   @return [Float, nil]
#
# @!attribute [rw] biomarkers
#   @return [Hash]
#
# @!attribute [rw] bortzAge
#   @return [Float, nil]
#
# @!attribute [rw] chronologicalAge
#   @return [Float, nil]
#
# @!attribute [rw] season
#   @return [String, nil]
BortzAge = Struct.new(
  :ageReduction,
  :biomarkers,
  :bortzAge,
  :chronologicalAge,
  :season,
  keyword_init: true
)

# Request payload for BortzAge#create.
#
# @!attribute [rw] ageReduction
#   @return [Float, nil]
#
# @!attribute [rw] biomarkers
#   @return [Hash]
#
# @!attribute [rw] bortzAge
#   @return [Float, nil]
#
# @!attribute [rw] chronologicalAge
#   @return [Float, nil]
#
# @!attribute [rw] season
#   @return [String, nil]
BortzAgeCreateData = Struct.new(
  :ageReduction,
  :biomarkers,
  :bortzAge,
  :chronologicalAge,
  :season,
  keyword_init: true
)

# Competition entity data model.
#
# @!attribute [rw] ageRange
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] maxAge
#   @return [Integer, nil]
#
# @!attribute [rw] minAge
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Competition = Struct.new(
  :ageRange,
  :id,
  :maxAge,
  :minAge,
  :name,
  keyword_init: true
)

# Request payload for Competition#list.
#
# @!attribute [rw] ageRange
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] maxAge
#   @return [Integer, nil]
#
# @!attribute [rw] minAge
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
CompetitionListMatch = Struct.new(
  :ageRange,
  :id,
  :maxAge,
  :minAge,
  :name,
  keyword_init: true
)

# Leaderboard entity data model.
#
# @!attribute [rw] ageReduction
#   @return [Float, nil]
#
# @!attribute [rw] athleteId
#   @return [String, nil]
#
# @!attribute [rw] athleteName
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] league
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
Leaderboard = Struct.new(
  :ageReduction,
  :athleteId,
  :athleteName,
  :country,
  :division,
  :league,
  :rank,
  keyword_init: true
)

# Request payload for Leaderboard#list.
#
# @!attribute [rw] ageReduction
#   @return [Float, nil]
#
# @!attribute [rw] athleteId
#   @return [String, nil]
#
# @!attribute [rw] athleteName
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] league
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
LeaderboardListMatch = Struct.new(
  :ageReduction,
  :athleteId,
  :athleteName,
  :country,
  :division,
  :league,
  :rank,
  keyword_init: true
)

# PhenoAge entity data model.
#
# @!attribute [rw] ageReduction
#   @return [Float, nil]
#
# @!attribute [rw] biomarkers
#   @return [Hash]
#
# @!attribute [rw] calculationMethod
#   @return [String, nil]
#
# @!attribute [rw] chronologicalAge
#   @return [Float, nil]
#
# @!attribute [rw] phenoAge
#   @return [Float, nil]
PhenoAge = Struct.new(
  :ageReduction,
  :biomarkers,
  :calculationMethod,
  :chronologicalAge,
  :phenoAge,
  keyword_init: true
)

# Request payload for PhenoAge#create.
#
# @!attribute [rw] ageReduction
#   @return [Float, nil]
#
# @!attribute [rw] biomarkers
#   @return [Hash]
#
# @!attribute [rw] calculationMethod
#   @return [String, nil]
#
# @!attribute [rw] chronologicalAge
#   @return [Float, nil]
#
# @!attribute [rw] phenoAge
#   @return [Float, nil]
PhenoAgeCreateData = Struct.new(
  :ageReduction,
  :biomarkers,
  :calculationMethod,
  :chronologicalAge,
  :phenoAge,
  keyword_init: true
)

# RankPreview entity data model.
#
# @!attribute [rw] ageReduction
#   @return [Float, nil]
#
# @!attribute [rw] athletesInLeague
#   @return [Integer, nil]
#
# @!attribute [rw] biologicalAge
#   @return [Float]
#
# @!attribute [rw] chronologicalAge
#   @return [Float]
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] estimatedRank
#   @return [Integer, nil]
#
# @!attribute [rw] estimatedUltimateLeagueRank
#   @return [Integer, nil]
#
# @!attribute [rw] league
#   @return [String, nil]
#
# @!attribute [rw] percentile
#   @return [Float, nil]
RankPreview = Struct.new(
  :ageReduction,
  :athletesInLeague,
  :biologicalAge,
  :chronologicalAge,
  :division,
  :estimatedRank,
  :estimatedUltimateLeagueRank,
  :league,
  :percentile,
  keyword_init: true
)

# Request payload for RankPreview#create.
#
# @!attribute [rw] ageReduction
#   @return [Float, nil]
#
# @!attribute [rw] athletesInLeague
#   @return [Integer, nil]
#
# @!attribute [rw] biologicalAge
#   @return [Float]
#
# @!attribute [rw] chronologicalAge
#   @return [Float]
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] estimatedRank
#   @return [Integer, nil]
#
# @!attribute [rw] estimatedUltimateLeagueRank
#   @return [Integer, nil]
#
# @!attribute [rw] league
#   @return [String, nil]
#
# @!attribute [rw] percentile
#   @return [Float, nil]
RankPreviewCreateData = Struct.new(
  :ageReduction,
  :athletesInLeague,
  :biologicalAge,
  :chronologicalAge,
  :division,
  :estimatedRank,
  :estimatedUltimateLeagueRank,
  :league,
  :percentile,
  keyword_init: true
)

# Reference entity data model.
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] countryName
#   @return [String, nil]
#
# @!attribute [rw] flagUrl
#   @return [String, nil]
Reference = Struct.new(
  :countryCode,
  :countryName,
  :flagUrl,
  keyword_init: true
)

# Request payload for Reference#list.
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] countryName
#   @return [String, nil]
#
# @!attribute [rw] flagUrl
#   @return [String, nil]
ReferenceListMatch = Struct.new(
  :countryCode,
  :countryName,
  :flagUrl,
  keyword_init: true
)

