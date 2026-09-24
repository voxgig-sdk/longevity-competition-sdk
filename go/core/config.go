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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Age Reduction",
						"type": "`$NUMBER`",
						"short": "Age Reduction score (chronological age minus biological age)",
					},
					map[string]any{
						"name": "biologicalAge",
						"title": "Biological Age",
						"type": "`$NUMBER`",
						"short": "Calculated biological age",
					},
					map[string]any{
						"name": "chronologicalAge",
						"title": "Chronological Age",
						"type": "`$NUMBER`",
						"short": "Actual age in years",
					},
					map[string]any{
						"name": "clockType",
						"title": "Clock Type",
						"type": "`$STRING`",
						"short": "Biological aging clock used",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"short": "Country code",
					},
					map[string]any{
						"name": "division",
						"title": "Division",
						"type": "`$STRING`",
						"short": "Age division category",
					},
					map[string]any{
						"name": "effectiveAgeReduction",
						"title": "Effective Age Reduction",
						"type": "`$NUMBER`",
						"short": "Effective Age Reduction used for ranking",
					},
					map[string]any{
						"name": "generation",
						"title": "Generation",
						"type": "`$STRING`",
						"short": "Generation category",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique athlete identifier",
					},
					map[string]any{
						"name": "lastUpdated",
						"title": "Last Updated",
						"type": "`$STRING`",
						"short": "Last result submission date",
						"format": "date-time",
					},
					map[string]any{
						"name": "league",
						"title": "League",
						"type": "`$STRING`",
						"short": "Competition league",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Athlete name",
					},
					map[string]any{
						"name": "profileUrl",
						"title": "Profile Url",
						"type": "`$STRING`",
						"short": "URL to athlete's public profile",
						"format": "uri",
					},
					map[string]any{
						"name": "rank",
						"title": "Rank",
						"type": "`$INTEGER`",
						"short": "Current ranking position",
					},
					map[string]any{
						"name": "ultimateLeagueRank",
						"title": "Ultimate League Rank",
						"type": "`$INTEGER`",
						"short": "Rank in Ultimate League (combined Pro and Amateur)",
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
								"parts": []any{
									"data",
									"athletes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.athletes`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "division",
											"orig": "division",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "league",
											"orig": "league",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 100,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
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
						"title": "Age Reduction",
						"type": "`$NUMBER`",
						"short": "Calculated Age Reduction",
					},
					map[string]any{
						"name": "biomarkers",
						"title": "Biomarkers",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Blood biomarker values required for Bortz Age calculation",
					},
					map[string]any{
						"name": "bortzAge",
						"title": "Bortz Age",
						"type": "`$NUMBER`",
						"short": "Calculated Bortz biological age",
					},
					map[string]any{
						"name": "chronologicalAge",
						"title": "Chronological Age",
						"type": "`$NUMBER`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$NUMBER`",
							},
						},
						"short": "Input chronological age",
					},
					map[string]any{
						"name": "season",
						"title": "Season",
						"type": "`$STRING`",
						"short": "Competition season",
					},
				},
				"name": "bortz_age",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"data",
									"bortz-age",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Age Range",
						"type": "`$STRING`",
						"short": "Age range for this division",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Division identifier",
					},
					map[string]any{
						"name": "maxAge",
						"title": "Max Age",
						"type": "`$INTEGER`",
						"short": "Maximum age for division",
					},
					map[string]any{
						"name": "minAge",
						"title": "Min Age",
						"type": "`$INTEGER`",
						"short": "Minimum age for division",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Division name",
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
								"parts": []any{
									"data",
									"divisions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.divisions`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Age Reduction",
						"type": "`$NUMBER`",
						"short": "Age Reduction score",
					},
					map[string]any{
						"name": "athleteId",
						"title": "Athlete Id",
						"type": "`$STRING`",
						"short": "Athlete identifier",
					},
					map[string]any{
						"name": "athleteName",
						"title": "Athlete Name",
						"type": "`$STRING`",
						"short": "Athlete name",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"short": "Country code",
					},
					map[string]any{
						"name": "division",
						"title": "Division",
						"type": "`$STRING`",
						"short": "Age division",
					},
					map[string]any{
						"name": "league",
						"title": "League",
						"type": "`$STRING`",
						"short": "Competition league",
					},
					map[string]any{
						"name": "rank",
						"title": "Rank",
						"type": "`$INTEGER`",
						"short": "Current ranking position",
					},
				},
				"name": "leaderboard",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"data",
									"leaderboard",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rankings`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "division",
											"orig": "division",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "league",
											"orig": "league",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"division",
										"league",
									},
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
						"title": "Age Reduction",
						"type": "`$NUMBER`",
						"short": "Calculated Age Reduction",
					},
					map[string]any{
						"name": "biomarkers",
						"title": "Biomarkers",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Blood biomarker values required for Pheno Age calculation",
					},
					map[string]any{
						"name": "calculationMethod",
						"title": "Calculation Method",
						"type": "`$STRING`",
						"short": "Algorithm version used",
					},
					map[string]any{
						"name": "chronologicalAge",
						"title": "Chronological Age",
						"type": "`$NUMBER`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$NUMBER`",
							},
						},
						"short": "Input chronological age",
					},
					map[string]any{
						"name": "phenoAge",
						"title": "Pheno Age",
						"type": "`$NUMBER`",
						"short": "Calculated phenotypic biological age",
					},
				},
				"name": "pheno_age",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"data",
									"pheno-age",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Age Reduction",
						"type": "`$NUMBER`",
						"short": "Calculated Age Reduction",
					},
					map[string]any{
						"name": "athletesInLeague",
						"title": "Athletes In League",
						"type": "`$INTEGER`",
						"short": "Total athletes in target league",
					},
					map[string]any{
						"name": "biologicalAge",
						"title": "Biological Age",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Calculated biological age",
					},
					map[string]any{
						"name": "chronologicalAge",
						"title": "Chronological Age",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Actual age in years",
					},
					map[string]any{
						"name": "division",
						"title": "Division",
						"type": "`$STRING`",
						"short": "Target division for preview",
					},
					map[string]any{
						"name": "estimatedRank",
						"title": "Estimated Rank",
						"type": "`$INTEGER`",
						"short": "Estimated ranking position",
					},
					map[string]any{
						"name": "estimatedUltimateLeagueRank",
						"title": "Estimated Ultimate League Rank",
						"type": "`$INTEGER`",
						"short": "Estimated Ultimate League rank",
					},
					map[string]any{
						"name": "league",
						"title": "League",
						"type": "`$STRING`",
						"short": "Target league for preview",
					},
					map[string]any{
						"name": "percentile",
						"title": "Percentile",
						"type": "`$NUMBER`",
						"short": "Percentile ranking",
					},
				},
				"name": "rank_preview",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"data",
									"rank-preview",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "ISO country code",
					},
					map[string]any{
						"name": "countryName",
						"title": "Country Name",
						"type": "`$STRING`",
						"short": "Country name",
					},
					map[string]any{
						"name": "flagUrl",
						"title": "Flag Url",
						"type": "`$STRING`",
						"short": "URL to flag image",
						"format": "uri",
					},
				},
				"name": "reference",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"data",
									"flags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.flags`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
