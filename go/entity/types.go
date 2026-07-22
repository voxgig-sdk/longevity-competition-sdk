// Typed models for the LongevityCompetition SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Athlete is the typed data model for the athlete entity.
type Athlete struct {
	AgeReduction *float64 `json:"age_reduction,omitempty"`
	BiologicalAge *float64 `json:"biological_age,omitempty"`
	ChronologicalAge *float64 `json:"chronological_age,omitempty"`
	ClockType *string `json:"clock_type,omitempty"`
	Country *string `json:"country,omitempty"`
	Division *string `json:"division,omitempty"`
	EffectiveAgeReduction *float64 `json:"effective_age_reduction,omitempty"`
	Generation *string `json:"generation,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	League *string `json:"league,omitempty"`
	Name *string `json:"name,omitempty"`
	ProfileUrl *string `json:"profile_url,omitempty"`
	Rank *int `json:"rank,omitempty"`
	UltimateLeagueRank *int `json:"ultimate_league_rank,omitempty"`
}

// AthleteListMatch is the typed request payload for Athlete.ListTyped.
type AthleteListMatch struct {
	AgeReduction *float64 `json:"age_reduction,omitempty"`
	BiologicalAge *float64 `json:"biological_age,omitempty"`
	ChronologicalAge *float64 `json:"chronological_age,omitempty"`
	ClockType *string `json:"clock_type,omitempty"`
	Country *string `json:"country,omitempty"`
	Division *string `json:"division,omitempty"`
	EffectiveAgeReduction *float64 `json:"effective_age_reduction,omitempty"`
	Generation *string `json:"generation,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUpdated *string `json:"last_updated,omitempty"`
	League *string `json:"league,omitempty"`
	Name *string `json:"name,omitempty"`
	ProfileUrl *string `json:"profile_url,omitempty"`
	Rank *int `json:"rank,omitempty"`
	UltimateLeagueRank *int `json:"ultimate_league_rank,omitempty"`
}

// BortzAge is the typed data model for the bortz_age entity.
type BortzAge struct {
	AgeReduction *float64 `json:"age_reduction,omitempty"`
	Biomarker map[string]any `json:"biomarker"`
	BortzAge *float64 `json:"bortz_age,omitempty"`
	ChronologicalAge *float64 `json:"chronological_age,omitempty"`
	Season *string `json:"season,omitempty"`
}

// BortzAgeCreateData is the typed request payload for BortzAge.CreateTyped.
type BortzAgeCreateData struct {
	AgeReduction *float64 `json:"age_reduction,omitempty"`
	Biomarker map[string]any `json:"biomarker"`
	BortzAge *float64 `json:"bortz_age,omitempty"`
	ChronologicalAge *float64 `json:"chronological_age,omitempty"`
	Season *string `json:"season,omitempty"`
}

// Competition is the typed data model for the competition entity.
type Competition struct {
	AgeRange *string `json:"age_range,omitempty"`
	Id *string `json:"id,omitempty"`
	MaxAge *int `json:"max_age,omitempty"`
	MinAge *int `json:"min_age,omitempty"`
	Name *string `json:"name,omitempty"`
}

// CompetitionListMatch is the typed request payload for Competition.ListTyped.
type CompetitionListMatch struct {
	AgeRange *string `json:"age_range,omitempty"`
	Id *string `json:"id,omitempty"`
	MaxAge *int `json:"max_age,omitempty"`
	MinAge *int `json:"min_age,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Leaderboard is the typed data model for the leaderboard entity.
type Leaderboard struct {
	AgeReduction *float64 `json:"age_reduction,omitempty"`
	AthleteId *string `json:"athlete_id,omitempty"`
	AthleteName *string `json:"athlete_name,omitempty"`
	Country *string `json:"country,omitempty"`
	Division *string `json:"division,omitempty"`
	League *string `json:"league,omitempty"`
	Rank *int `json:"rank,omitempty"`
}

// LeaderboardListMatch is the typed request payload for Leaderboard.ListTyped.
type LeaderboardListMatch struct {
	AgeReduction *float64 `json:"age_reduction,omitempty"`
	AthleteId *string `json:"athlete_id,omitempty"`
	AthleteName *string `json:"athlete_name,omitempty"`
	Country *string `json:"country,omitempty"`
	Division *string `json:"division,omitempty"`
	League *string `json:"league,omitempty"`
	Rank *int `json:"rank,omitempty"`
}

// PhenoAge is the typed data model for the pheno_age entity.
type PhenoAge struct {
	AgeReduction *float64 `json:"age_reduction,omitempty"`
	Biomarker map[string]any `json:"biomarker"`
	CalculationMethod *string `json:"calculation_method,omitempty"`
	ChronologicalAge *float64 `json:"chronological_age,omitempty"`
	PhenoAge *float64 `json:"pheno_age,omitempty"`
}

// PhenoAgeCreateData is the typed request payload for PhenoAge.CreateTyped.
type PhenoAgeCreateData struct {
	AgeReduction *float64 `json:"age_reduction,omitempty"`
	Biomarker map[string]any `json:"biomarker"`
	CalculationMethod *string `json:"calculation_method,omitempty"`
	ChronologicalAge *float64 `json:"chronological_age,omitempty"`
	PhenoAge *float64 `json:"pheno_age,omitempty"`
}

// RankPreview is the typed data model for the rank_preview entity.
type RankPreview struct {
	AgeReduction *float64 `json:"age_reduction,omitempty"`
	AthletesInLeague *int `json:"athletes_in_league,omitempty"`
	BiologicalAge float64 `json:"biological_age"`
	ChronologicalAge float64 `json:"chronological_age"`
	Division *string `json:"division,omitempty"`
	EstimatedRank *int `json:"estimated_rank,omitempty"`
	EstimatedUltimateLeagueRank *int `json:"estimated_ultimate_league_rank,omitempty"`
	League *string `json:"league,omitempty"`
	Percentile *float64 `json:"percentile,omitempty"`
}

// RankPreviewCreateData is the typed request payload for RankPreview.CreateTyped.
type RankPreviewCreateData struct {
	AgeReduction *float64 `json:"age_reduction,omitempty"`
	AthletesInLeague *int `json:"athletes_in_league,omitempty"`
	BiologicalAge float64 `json:"biological_age"`
	ChronologicalAge float64 `json:"chronological_age"`
	Division *string `json:"division,omitempty"`
	EstimatedRank *int `json:"estimated_rank,omitempty"`
	EstimatedUltimateLeagueRank *int `json:"estimated_ultimate_league_rank,omitempty"`
	League *string `json:"league,omitempty"`
	Percentile *float64 `json:"percentile,omitempty"`
}

// Reference is the typed data model for the reference entity.
type Reference struct {
	CountryCode *string `json:"country_code,omitempty"`
	CountryName *string `json:"country_name,omitempty"`
	FlagUrl *string `json:"flag_url,omitempty"`
}

// ReferenceListMatch is the typed request payload for Reference.ListTyped.
type ReferenceListMatch struct {
	CountryCode *string `json:"country_code,omitempty"`
	CountryName *string `json:"country_name,omitempty"`
	FlagUrl *string `json:"flag_url,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
