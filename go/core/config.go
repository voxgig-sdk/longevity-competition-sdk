package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "LongevityCompetition",
			"slug": "longevity-competition",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://longevityworldcup.com/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"athlete": map[string]any{},
				"bortz_age": map[string]any{},
				"competition": map[string]any{},
				"leaderboard": map[string]any{},
				"pheno_age": map[string]any{},
				"rank_preview": map[string]any{},
				"reference": map[string]any{},
			},
		},
		"entity": map[string]any{
			"athlete": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ageReduction",
						"short": "Age Reduction score (chronological age minus biological age)",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "biologicalAge",
						"short": "Calculated biological age",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "chronologicalAge",
						"short": "Actual age in years",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "clockType",
						"short": "Biological aging clock used",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"short": "Country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "division",
						"short": "Age division category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "effectiveAgeReduction",
						"short": "Effective Age Reduction used for ranking",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "generation",
						"short": "Generation category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique athlete identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "lastUpdated",
						"short": "Last result submission date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "league",
						"short": "Competition league",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Athlete name",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "profileUrl",
						"short": "URL to athlete's public profile",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rank",
						"short": "Current ranking position",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "ultimateLeagueRank",
						"short": "Rank in Ultimate League (combined Pro and Amateur)",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "athlete",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "division",
											"orig": "division",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "league",
											"orig": "league",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 100,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/data/athletes",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "athletes",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"division",
										"league",
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.athletes`",
								},
								"parts": []any{
									"data",
									"athletes",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"bortz_age": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ageReduction",
						"short": "Calculated Age Reduction",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "biomarkers",
						"req": true,
						"short": "Blood biomarker values required for Bortz Age calculation",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "bortzAge",
						"short": "Calculated Bortz biological age",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "chronologicalAge",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$NUMBER`",
							},
						},
						"short": "Input chronological age",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "season",
						"short": "Competition season",
						"type": "`$STRING`",
					},
				},
				"name": "bortz_age",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/data/bortz-age",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "bortz-age",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"data",
									"bortz-age",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"competition": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ageRange",
						"short": "Age range for this division",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Division identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "maxAge",
						"short": "Maximum age for division",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "minAge",
						"short": "Minimum age for division",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Division name",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "competition",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/divisions",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "divisions",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.divisions`",
								},
								"parts": []any{
									"data",
									"divisions",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"leaderboard": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ageReduction",
						"short": "Age Reduction score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "athleteId",
						"short": "Athlete identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "athleteName",
						"short": "Athlete name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"short": "Country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "division",
						"short": "Age division",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "league",
						"short": "Competition league",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rank",
						"short": "Current ranking position",
						"type": "`$INTEGER`",
					},
				},
				"name": "leaderboard",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "division",
											"orig": "division",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "league",
											"orig": "league",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/data/leaderboard",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "leaderboard",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"division",
										"league",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rankings`",
								},
								"parts": []any{
									"data",
									"leaderboard",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"pheno_age": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ageReduction",
						"short": "Calculated Age Reduction",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "biomarkers",
						"req": true,
						"short": "Blood biomarker values required for Pheno Age calculation",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "calculationMethod",
						"short": "Algorithm version used",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "chronologicalAge",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$NUMBER`",
							},
						},
						"short": "Input chronological age",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "phenoAge",
						"short": "Calculated phenotypic biological age",
						"type": "`$NUMBER`",
					},
				},
				"name": "pheno_age",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/data/pheno-age",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "pheno-age",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"data",
									"pheno-age",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"rank_preview": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ageReduction",
						"short": "Calculated Age Reduction",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "athletesInLeague",
						"short": "Total athletes in target league",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "biologicalAge",
						"req": true,
						"short": "Calculated biological age",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "chronologicalAge",
						"req": true,
						"short": "Actual age in years",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "division",
						"short": "Target division for preview",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "estimatedRank",
						"short": "Estimated ranking position",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "estimatedUltimateLeagueRank",
						"short": "Estimated Ultimate League rank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "league",
						"short": "Target league for preview",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "percentile",
						"short": "Percentile ranking",
						"type": "`$NUMBER`",
					},
				},
				"name": "rank_preview",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/data/rank-preview",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "rank-preview",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"data",
									"rank-preview",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"reference": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "countryCode",
						"short": "ISO country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "countryName",
						"short": "Country name",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "flagUrl",
						"short": "URL to flag image",
						"type": "`$STRING`",
					},
				},
				"name": "reference",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/data/flags",
								"segments": []any{
									map[string]any{
										"lit": "data",
									},
									map[string]any{
										"lit": "flags",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.flags`",
								},
								"parts": []any{
									"data",
									"flags",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
