// Typed models for the LongevityCompetition SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Athlete {
  ageReduction?: number
  biologicalAge?: number
  chronologicalAge?: number
  clockType?: string
  country?: string
  division?: string
  effectiveAgeReduction?: number
  generation?: string
  id?: string
  lastUpdated?: string
  league?: string
  name?: string
  profileUrl?: string
  rank?: number
  ultimateLeagueRank?: number
}

export interface AthleteListMatch {
  ageReduction?: number
  biologicalAge?: number
  chronologicalAge?: number
  clockType?: string
  country?: string
  division?: string
  effectiveAgeReduction?: number
  generation?: string
  id?: string
  lastUpdated?: string
  league?: string
  name?: string
  profileUrl?: string
  rank?: number
  ultimateLeagueRank?: number
}

export interface BortzAge {
  ageReduction?: number
  biomarkers: Record<string, any>
  bortzAge?: number
  chronologicalAge?: number
  season?: string
}

export interface BortzAgeCreateData {
  ageReduction?: number
  biomarkers: Record<string, any>
  bortzAge?: number
  chronologicalAge?: number
  season?: string
}

export interface Competition {
  ageRange?: string
  id?: string
  maxAge?: number
  minAge?: number
  name?: string
}

export interface CompetitionListMatch {
  ageRange?: string
  id?: string
  maxAge?: number
  minAge?: number
  name?: string
}

export interface Leaderboard {
  ageReduction?: number
  athleteId?: string
  athleteName?: string
  country?: string
  division?: string
  league?: string
  rank?: number
}

export interface LeaderboardListMatch {
  ageReduction?: number
  athleteId?: string
  athleteName?: string
  country?: string
  division?: string
  league?: string
  rank?: number
}

export interface PhenoAge {
  ageReduction?: number
  biomarkers: Record<string, any>
  calculationMethod?: string
  chronologicalAge?: number
  phenoAge?: number
}

export interface PhenoAgeCreateData {
  ageReduction?: number
  biomarkers: Record<string, any>
  calculationMethod?: string
  chronologicalAge?: number
  phenoAge?: number
}

export interface RankPreview {
  ageReduction?: number
  athletesInLeague?: number
  biologicalAge: number
  chronologicalAge: number
  division?: string
  estimatedRank?: number
  estimatedUltimateLeagueRank?: number
  league?: string
  percentile?: number
}

export interface RankPreviewCreateData {
  ageReduction?: number
  athletesInLeague?: number
  biologicalAge: number
  chronologicalAge: number
  division?: string
  estimatedRank?: number
  estimatedUltimateLeagueRank?: number
  league?: string
  percentile?: number
}

export interface Reference {
  countryCode?: string
  countryName?: string
  flagUrl?: string
}

export interface ReferenceListMatch {
  countryCode?: string
  countryName?: string
  flagUrl?: string
}

