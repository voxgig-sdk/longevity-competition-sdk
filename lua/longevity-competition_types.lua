-- Typed models for the LongevityCompetition SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Athlete
---@field ageReduction? number
---@field biologicalAge? number
---@field chronologicalAge? number
---@field clockType? string
---@field country? string
---@field division? string
---@field effectiveAgeReduction? number
---@field generation? string
---@field id? string
---@field lastUpdated? string
---@field league? string
---@field name? string
---@field profileUrl? string
---@field rank? number
---@field ultimateLeagueRank? number

---@class AthleteListMatch
---@field ageReduction? number
---@field biologicalAge? number
---@field chronologicalAge? number
---@field clockType? string
---@field country? string
---@field division? string
---@field effectiveAgeReduction? number
---@field generation? string
---@field id? string
---@field lastUpdated? string
---@field league? string
---@field name? string
---@field profileUrl? string
---@field rank? number
---@field ultimateLeagueRank? number

---@class BortzAge
---@field ageReduction? number
---@field biomarkers table
---@field bortzAge? number
---@field chronologicalAge? number
---@field season? string

---@class BortzAgeCreateData
---@field ageReduction? number
---@field biomarkers table
---@field bortzAge? number
---@field chronologicalAge? number
---@field season? string

---@class Competition
---@field ageRange? string
---@field id? string
---@field maxAge? number
---@field minAge? number
---@field name? string

---@class CompetitionListMatch
---@field ageRange? string
---@field id? string
---@field maxAge? number
---@field minAge? number
---@field name? string

---@class Leaderboard
---@field ageReduction? number
---@field athleteId? string
---@field athleteName? string
---@field country? string
---@field division? string
---@field league? string
---@field rank? number

---@class LeaderboardListMatch
---@field ageReduction? number
---@field athleteId? string
---@field athleteName? string
---@field country? string
---@field division? string
---@field league? string
---@field rank? number

---@class PhenoAge
---@field ageReduction? number
---@field biomarkers table
---@field calculationMethod? string
---@field chronologicalAge? number
---@field phenoAge? number

---@class PhenoAgeCreateData
---@field ageReduction? number
---@field biomarkers table
---@field calculationMethod? string
---@field chronologicalAge? number
---@field phenoAge? number

---@class RankPreview
---@field ageReduction? number
---@field athletesInLeague? number
---@field biologicalAge number
---@field chronologicalAge number
---@field division? string
---@field estimatedRank? number
---@field estimatedUltimateLeagueRank? number
---@field league? string
---@field percentile? number

---@class RankPreviewCreateData
---@field ageReduction? number
---@field athletesInLeague? number
---@field biologicalAge number
---@field chronologicalAge number
---@field division? string
---@field estimatedRank? number
---@field estimatedUltimateLeagueRank? number
---@field league? string
---@field percentile? number

---@class Reference
---@field countryCode? string
---@field countryName? string
---@field flagUrl? string

---@class ReferenceListMatch
---@field countryCode? string
---@field countryName? string
---@field flagUrl? string

local M = {}

return M
