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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "biologicalAge",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "chronologicalAge",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "clockType",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "division",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "effectiveAgeReduction",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "generation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lastUpdated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "league",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "profileUrl",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "ultimateLeagueRank",
						"type": "`$INTEGER`",
					},
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
								"parts": []any{
									"data",
									"athletes",
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "biomarkers",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "bortzAge",
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "season",
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
								"parts": []any{
									"data",
									"bortz-age",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "maxAge",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "minAge",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"data",
									"divisions",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.divisions`",
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "athleteId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "athleteName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "division",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "league",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rank",
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
								"parts": []any{
									"data",
									"leaderboard",
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "biomarkers",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "calculationMethod",
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "phenoAge",
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
								"parts": []any{
									"data",
									"pheno-age",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "athletesInLeague",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "biologicalAge",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "chronologicalAge",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "division",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "estimatedRank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "estimatedUltimateLeagueRank",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "league",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "percentile",
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
								"parts": []any{
									"data",
									"rank-preview",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "countryName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "flagUrl",
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
								"parts": []any{
									"data",
									"flags",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.flags`",
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
