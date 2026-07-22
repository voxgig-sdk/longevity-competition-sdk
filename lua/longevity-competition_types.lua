-- Typed models for the LongevityCompetition SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Athlete
---@field age_reduction? number
---@field biological_age? number
---@field chronological_age? number
---@field clock_type? string
---@field country? string
---@field division? string
---@field effective_age_reduction? number
---@field generation? string
---@field id? string
---@field last_updated? string
---@field league? string
---@field name? string
---@field profile_url? string
---@field rank? number
---@field ultimate_league_rank? number

---@class AthleteListMatch
---@field age_reduction? number
---@field biological_age? number
---@field chronological_age? number
---@field clock_type? string
---@field country? string
---@field division? string
---@field effective_age_reduction? number
---@field generation? string
---@field id? string
---@field last_updated? string
---@field league? string
---@field name? string
---@field profile_url? string
---@field rank? number
---@field ultimate_league_rank? number

---@class BortzAge
---@field age_reduction? number
---@field biomarker table
---@field bortz_age? number
---@field chronological_age? number
---@field season? string

---@class BortzAgeCreateData
---@field age_reduction? number
---@field biomarker table
---@field bortz_age? number
---@field chronological_age? number
---@field season? string

---@class Competition
---@field age_range? string
---@field id? string
---@field max_age? number
---@field min_age? number
---@field name? string

---@class CompetitionListMatch
---@field age_range? string
---@field id? string
---@field max_age? number
---@field min_age? number
---@field name? string

---@class Leaderboard
---@field age_reduction? number
---@field athlete_id? string
---@field athlete_name? string
---@field country? string
---@field division? string
---@field league? string
---@field rank? number

---@class LeaderboardListMatch
---@field age_reduction? number
---@field athlete_id? string
---@field athlete_name? string
---@field country? string
---@field division? string
---@field league? string
---@field rank? number

---@class PhenoAge
---@field age_reduction? number
---@field biomarker table
---@field calculation_method? string
---@field chronological_age? number
---@field pheno_age? number

---@class PhenoAgeCreateData
---@field age_reduction? number
---@field biomarker table
---@field calculation_method? string
---@field chronological_age? number
---@field pheno_age? number

---@class RankPreview
---@field age_reduction? number
---@field athletes_in_league? number
---@field biological_age number
---@field chronological_age number
---@field division? string
---@field estimated_rank? number
---@field estimated_ultimate_league_rank? number
---@field league? string
---@field percentile? number

---@class RankPreviewCreateData
---@field age_reduction? number
---@field athletes_in_league? number
---@field biological_age number
---@field chronological_age number
---@field division? string
---@field estimated_rank? number
---@field estimated_ultimate_league_rank? number
---@field league? string
---@field percentile? number

---@class Reference
---@field country_code? string
---@field country_name? string
---@field flag_url? string

---@class ReferenceListMatch
---@field country_code? string
---@field country_name? string
---@field flag_url? string

local M = {}

return M
