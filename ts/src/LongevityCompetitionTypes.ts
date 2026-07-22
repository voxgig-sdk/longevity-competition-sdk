// Typed models for the LongevityCompetition SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Athlete {
  age_reduction?: number
  biological_age?: number
  chronological_age?: number
  clock_type?: string
  country?: string
  division?: string
  effective_age_reduction?: number
  generation?: string
  id?: string
  last_updated?: string
  league?: string
  name?: string
  profile_url?: string
  rank?: number
  ultimate_league_rank?: number
}

export interface AthleteListMatch {
  age_reduction?: number
  biological_age?: number
  chronological_age?: number
  clock_type?: string
  country?: string
  division?: string
  effective_age_reduction?: number
  generation?: string
  id?: string
  last_updated?: string
  league?: string
  name?: string
  profile_url?: string
  rank?: number
  ultimate_league_rank?: number
}

export interface BortzAge {
  age_reduction?: number
  biomarker: Record<string, any>
  bortz_age?: number
  chronological_age?: number
  season?: string
}

export interface BortzAgeCreateData {
  age_reduction?: number
  biomarker: Record<string, any>
  bortz_age?: number
  chronological_age?: number
  season?: string
}

export interface Competition {
  age_range?: string
  id?: string
  max_age?: number
  min_age?: number
  name?: string
}

export interface CompetitionListMatch {
  age_range?: string
  id?: string
  max_age?: number
  min_age?: number
  name?: string
}

export interface Leaderboard {
  age_reduction?: number
  athlete_id?: string
  athlete_name?: string
  country?: string
  division?: string
  league?: string
  rank?: number
}

export interface LeaderboardListMatch {
  age_reduction?: number
  athlete_id?: string
  athlete_name?: string
  country?: string
  division?: string
  league?: string
  rank?: number
}

export interface PhenoAge {
  age_reduction?: number
  biomarker: Record<string, any>
  calculation_method?: string
  chronological_age?: number
  pheno_age?: number
}

export interface PhenoAgeCreateData {
  age_reduction?: number
  biomarker: Record<string, any>
  calculation_method?: string
  chronological_age?: number
  pheno_age?: number
}

export interface RankPreview {
  age_reduction?: number
  athletes_in_league?: number
  biological_age: number
  chronological_age: number
  division?: string
  estimated_rank?: number
  estimated_ultimate_league_rank?: number
  league?: string
  percentile?: number
}

export interface RankPreviewCreateData {
  age_reduction?: number
  athletes_in_league?: number
  biological_age: number
  chronological_age: number
  division?: string
  estimated_rank?: number
  estimated_ultimate_league_rank?: number
  league?: string
  percentile?: number
}

export interface Reference {
  country_code?: string
  country_name?: string
  flag_url?: string
}

export interface ReferenceListMatch {
  country_code?: string
  country_name?: string
  flag_url?: string
}

