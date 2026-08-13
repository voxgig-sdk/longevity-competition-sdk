// Typed models for the LongevityCompetition SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/longevity-competition-sdk/go/core"
)

// Athlete is the typed data model for the athlete entity.
type Athlete struct {
	AgeReduction *float64 `json:"ageReduction,omitempty"`
	BiologicalAge *float64 `json:"biologicalAge,omitempty"`
	ChronologicalAge *float64 `json:"chronologicalAge,omitempty"`
	ClockType *string `json:"clockType,omitempty"`
	Country *string `json:"country,omitempty"`
	Division *string `json:"division,omitempty"`
	EffectiveAgeReduction *float64 `json:"effectiveAgeReduction,omitempty"`
	Generation *string `json:"generation,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUpdated *string `json:"lastUpdated,omitempty"`
	League *string `json:"league,omitempty"`
	Name *string `json:"name,omitempty"`
	ProfileUrl *string `json:"profileUrl,omitempty"`
	Rank *int `json:"rank,omitempty"`
	UltimateLeagueRank *int `json:"ultimateLeagueRank,omitempty"`
}

// AthleteListMatch is the typed request payload for Athlete.ListTyped.
type AthleteListMatch struct {
	AgeReduction *float64 `json:"ageReduction,omitempty"`
	BiologicalAge *float64 `json:"biologicalAge,omitempty"`
	ChronologicalAge *float64 `json:"chronologicalAge,omitempty"`
	ClockType *string `json:"clockType,omitempty"`
	Country *string `json:"country,omitempty"`
	Division *string `json:"division,omitempty"`
	EffectiveAgeReduction *float64 `json:"effectiveAgeReduction,omitempty"`
	Generation *string `json:"generation,omitempty"`
	Id *string `json:"id,omitempty"`
	LastUpdated *string `json:"lastUpdated,omitempty"`
	League *string `json:"league,omitempty"`
	Name *string `json:"name,omitempty"`
	ProfileUrl *string `json:"profileUrl,omitempty"`
	Rank *int `json:"rank,omitempty"`
	UltimateLeagueRank *int `json:"ultimateLeagueRank,omitempty"`
}

// BortzAge is the typed data model for the bortz_age entity.
type BortzAge struct {
	AgeReduction *float64 `json:"ageReduction,omitempty"`
	Biomarkers map[string]any `json:"biomarkers"`
	BortzAge *float64 `json:"bortzAge,omitempty"`
	ChronologicalAge *float64 `json:"chronologicalAge,omitempty"`
	Season *string `json:"season,omitempty"`
}

// BortzAgeCreateData is the typed request payload for BortzAge.CreateTyped.
type BortzAgeCreateData struct {
	AgeReduction *float64 `json:"ageReduction,omitempty"`
	Biomarkers map[string]any `json:"biomarkers"`
	BortzAge *float64 `json:"bortzAge,omitempty"`
	ChronologicalAge *float64 `json:"chronologicalAge,omitempty"`
	Season *string `json:"season,omitempty"`
}

// Competition is the typed data model for the competition entity.
type Competition struct {
	AgeRange *string `json:"ageRange,omitempty"`
	Id *string `json:"id,omitempty"`
	MaxAge *int `json:"maxAge,omitempty"`
	MinAge *int `json:"minAge,omitempty"`
	Name *string `json:"name,omitempty"`
}

// CompetitionListMatch is the typed request payload for Competition.ListTyped.
type CompetitionListMatch struct {
	AgeRange *string `json:"ageRange,omitempty"`
	Id *string `json:"id,omitempty"`
	MaxAge *int `json:"maxAge,omitempty"`
	MinAge *int `json:"minAge,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Leaderboard is the typed data model for the leaderboard entity.
type Leaderboard struct {
	AgeReduction *float64 `json:"ageReduction,omitempty"`
	AthleteId *string `json:"athleteId,omitempty"`
	AthleteName *string `json:"athleteName,omitempty"`
	Country *string `json:"country,omitempty"`
	Division *string `json:"division,omitempty"`
	League *string `json:"league,omitempty"`
	Rank *int `json:"rank,omitempty"`
}

// LeaderboardListMatch is the typed request payload for Leaderboard.ListTyped.
type LeaderboardListMatch struct {
	AgeReduction *float64 `json:"ageReduction,omitempty"`
	AthleteId *string `json:"athleteId,omitempty"`
	AthleteName *string `json:"athleteName,omitempty"`
	Country *string `json:"country,omitempty"`
	Division *string `json:"division,omitempty"`
	League *string `json:"league,omitempty"`
	Rank *int `json:"rank,omitempty"`
}

// PhenoAge is the typed data model for the pheno_age entity.
type PhenoAge struct {
	AgeReduction *float64 `json:"ageReduction,omitempty"`
	Biomarkers map[string]any `json:"biomarkers"`
	CalculationMethod *string `json:"calculationMethod,omitempty"`
	ChronologicalAge *float64 `json:"chronologicalAge,omitempty"`
	PhenoAge *float64 `json:"phenoAge,omitempty"`
}

// PhenoAgeCreateData is the typed request payload for PhenoAge.CreateTyped.
type PhenoAgeCreateData struct {
	AgeReduction *float64 `json:"ageReduction,omitempty"`
	Biomarkers map[string]any `json:"biomarkers"`
	CalculationMethod *string `json:"calculationMethod,omitempty"`
	ChronologicalAge *float64 `json:"chronologicalAge,omitempty"`
	PhenoAge *float64 `json:"phenoAge,omitempty"`
}

// RankPreview is the typed data model for the rank_preview entity.
type RankPreview struct {
	AgeReduction *float64 `json:"ageReduction,omitempty"`
	AthletesInLeague *int `json:"athletesInLeague,omitempty"`
	BiologicalAge float64 `json:"biologicalAge"`
	ChronologicalAge float64 `json:"chronologicalAge"`
	Division *string `json:"division,omitempty"`
	EstimatedRank *int `json:"estimatedRank,omitempty"`
	EstimatedUltimateLeagueRank *int `json:"estimatedUltimateLeagueRank,omitempty"`
	League *string `json:"league,omitempty"`
	Percentile *float64 `json:"percentile,omitempty"`
}

// RankPreviewCreateData is the typed request payload for RankPreview.CreateTyped.
type RankPreviewCreateData struct {
	AgeReduction *float64 `json:"ageReduction,omitempty"`
	AthletesInLeague *int `json:"athletesInLeague,omitempty"`
	BiologicalAge float64 `json:"biologicalAge"`
	ChronologicalAge float64 `json:"chronologicalAge"`
	Division *string `json:"division,omitempty"`
	EstimatedRank *int `json:"estimatedRank,omitempty"`
	EstimatedUltimateLeagueRank *int `json:"estimatedUltimateLeagueRank,omitempty"`
	League *string `json:"league,omitempty"`
	Percentile *float64 `json:"percentile,omitempty"`
}

// Reference is the typed data model for the reference entity.
type Reference struct {
	CountryCode *string `json:"countryCode,omitempty"`
	CountryName *string `json:"countryName,omitempty"`
	FlagUrl *string `json:"flagUrl,omitempty"`
}

// ReferenceListMatch is the typed request payload for Reference.ListTyped.
type ReferenceListMatch struct {
	CountryCode *string `json:"countryCode,omitempty"`
	CountryName *string `json:"countryName,omitempty"`
	FlagUrl *string `json:"flagUrl,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
