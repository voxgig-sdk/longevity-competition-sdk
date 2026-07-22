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
# @!attribute [rw] age_reduction
#   @return [Float, nil]
#
# @!attribute [rw] biological_age
#   @return [Float, nil]
#
# @!attribute [rw] chronological_age
#   @return [Float, nil]
#
# @!attribute [rw] clock_type
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] effective_age_reduction
#   @return [Float, nil]
#
# @!attribute [rw] generation
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_updated
#   @return [String, nil]
#
# @!attribute [rw] league
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] profile_url
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] ultimate_league_rank
#   @return [Integer, nil]
Athlete = Struct.new(
  :age_reduction,
  :biological_age,
  :chronological_age,
  :clock_type,
  :country,
  :division,
  :effective_age_reduction,
  :generation,
  :id,
  :last_updated,
  :league,
  :name,
  :profile_url,
  :rank,
  :ultimate_league_rank,
  keyword_init: true
)

# Request payload for Athlete#list.
#
# @!attribute [rw] age_reduction
#   @return [Float, nil]
#
# @!attribute [rw] biological_age
#   @return [Float, nil]
#
# @!attribute [rw] chronological_age
#   @return [Float, nil]
#
# @!attribute [rw] clock_type
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] effective_age_reduction
#   @return [Float, nil]
#
# @!attribute [rw] generation
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_updated
#   @return [String, nil]
#
# @!attribute [rw] league
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] profile_url
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] ultimate_league_rank
#   @return [Integer, nil]
AthleteListMatch = Struct.new(
  :age_reduction,
  :biological_age,
  :chronological_age,
  :clock_type,
  :country,
  :division,
  :effective_age_reduction,
  :generation,
  :id,
  :last_updated,
  :league,
  :name,
  :profile_url,
  :rank,
  :ultimate_league_rank,
  keyword_init: true
)

# BortzAge entity data model.
#
# @!attribute [rw] age_reduction
#   @return [Float, nil]
#
# @!attribute [rw] biomarker
#   @return [Hash]
#
# @!attribute [rw] bortz_age
#   @return [Float, nil]
#
# @!attribute [rw] chronological_age
#   @return [Float, nil]
#
# @!attribute [rw] season
#   @return [String, nil]
BortzAge = Struct.new(
  :age_reduction,
  :biomarker,
  :bortz_age,
  :chronological_age,
  :season,
  keyword_init: true
)

# Request payload for BortzAge#create.
#
# @!attribute [rw] age_reduction
#   @return [Float, nil]
#
# @!attribute [rw] biomarker
#   @return [Hash]
#
# @!attribute [rw] bortz_age
#   @return [Float, nil]
#
# @!attribute [rw] chronological_age
#   @return [Float, nil]
#
# @!attribute [rw] season
#   @return [String, nil]
BortzAgeCreateData = Struct.new(
  :age_reduction,
  :biomarker,
  :bortz_age,
  :chronological_age,
  :season,
  keyword_init: true
)

# Competition entity data model.
#
# @!attribute [rw] age_range
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] max_age
#   @return [Integer, nil]
#
# @!attribute [rw] min_age
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Competition = Struct.new(
  :age_range,
  :id,
  :max_age,
  :min_age,
  :name,
  keyword_init: true
)

# Request payload for Competition#list.
#
# @!attribute [rw] age_range
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] max_age
#   @return [Integer, nil]
#
# @!attribute [rw] min_age
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
CompetitionListMatch = Struct.new(
  :age_range,
  :id,
  :max_age,
  :min_age,
  :name,
  keyword_init: true
)

# Leaderboard entity data model.
#
# @!attribute [rw] age_reduction
#   @return [Float, nil]
#
# @!attribute [rw] athlete_id
#   @return [String, nil]
#
# @!attribute [rw] athlete_name
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
  :age_reduction,
  :athlete_id,
  :athlete_name,
  :country,
  :division,
  :league,
  :rank,
  keyword_init: true
)

# Request payload for Leaderboard#list.
#
# @!attribute [rw] age_reduction
#   @return [Float, nil]
#
# @!attribute [rw] athlete_id
#   @return [String, nil]
#
# @!attribute [rw] athlete_name
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
  :age_reduction,
  :athlete_id,
  :athlete_name,
  :country,
  :division,
  :league,
  :rank,
  keyword_init: true
)

# PhenoAge entity data model.
#
# @!attribute [rw] age_reduction
#   @return [Float, nil]
#
# @!attribute [rw] biomarker
#   @return [Hash]
#
# @!attribute [rw] calculation_method
#   @return [String, nil]
#
# @!attribute [rw] chronological_age
#   @return [Float, nil]
#
# @!attribute [rw] pheno_age
#   @return [Float, nil]
PhenoAge = Struct.new(
  :age_reduction,
  :biomarker,
  :calculation_method,
  :chronological_age,
  :pheno_age,
  keyword_init: true
)

# Request payload for PhenoAge#create.
#
# @!attribute [rw] age_reduction
#   @return [Float, nil]
#
# @!attribute [rw] biomarker
#   @return [Hash]
#
# @!attribute [rw] calculation_method
#   @return [String, nil]
#
# @!attribute [rw] chronological_age
#   @return [Float, nil]
#
# @!attribute [rw] pheno_age
#   @return [Float, nil]
PhenoAgeCreateData = Struct.new(
  :age_reduction,
  :biomarker,
  :calculation_method,
  :chronological_age,
  :pheno_age,
  keyword_init: true
)

# RankPreview entity data model.
#
# @!attribute [rw] age_reduction
#   @return [Float, nil]
#
# @!attribute [rw] athletes_in_league
#   @return [Integer, nil]
#
# @!attribute [rw] biological_age
#   @return [Float]
#
# @!attribute [rw] chronological_age
#   @return [Float]
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] estimated_rank
#   @return [Integer, nil]
#
# @!attribute [rw] estimated_ultimate_league_rank
#   @return [Integer, nil]
#
# @!attribute [rw] league
#   @return [String, nil]
#
# @!attribute [rw] percentile
#   @return [Float, nil]
RankPreview = Struct.new(
  :age_reduction,
  :athletes_in_league,
  :biological_age,
  :chronological_age,
  :division,
  :estimated_rank,
  :estimated_ultimate_league_rank,
  :league,
  :percentile,
  keyword_init: true
)

# Request payload for RankPreview#create.
#
# @!attribute [rw] age_reduction
#   @return [Float, nil]
#
# @!attribute [rw] athletes_in_league
#   @return [Integer, nil]
#
# @!attribute [rw] biological_age
#   @return [Float]
#
# @!attribute [rw] chronological_age
#   @return [Float]
#
# @!attribute [rw] division
#   @return [String, nil]
#
# @!attribute [rw] estimated_rank
#   @return [Integer, nil]
#
# @!attribute [rw] estimated_ultimate_league_rank
#   @return [Integer, nil]
#
# @!attribute [rw] league
#   @return [String, nil]
#
# @!attribute [rw] percentile
#   @return [Float, nil]
RankPreviewCreateData = Struct.new(
  :age_reduction,
  :athletes_in_league,
  :biological_age,
  :chronological_age,
  :division,
  :estimated_rank,
  :estimated_ultimate_league_rank,
  :league,
  :percentile,
  keyword_init: true
)

# Reference entity data model.
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] country_name
#   @return [String, nil]
#
# @!attribute [rw] flag_url
#   @return [String, nil]
Reference = Struct.new(
  :country_code,
  :country_name,
  :flag_url,
  keyword_init: true
)

# Request payload for Reference#list.
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] country_name
#   @return [String, nil]
#
# @!attribute [rw] flag_url
#   @return [String, nil]
ReferenceListMatch = Struct.new(
  :country_code,
  :country_name,
  :flag_url,
  keyword_init: true
)

