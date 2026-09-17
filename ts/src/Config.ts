
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'LongevityCompetition',
        slug: "longevity-competition",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://longevityworldcup.com/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        athlete: {
        },
  
        bortz_age: {
        },
  
        competition: {
        },
  
        leaderboard: {
        },
  
        pheno_age: {
        },
  
        rank_preview: {
        },
  
        reference: {
        },
  
    }
  }


  entity = {
    "athlete": {
      "fields": [
        {
          "name": "ageReduction",
          "short": "Age Reduction score (chronological age minus biological age)",
          "type": "`$NUMBER`"
        },
        {
          "name": "biologicalAge",
          "short": "Calculated biological age",
          "type": "`$NUMBER`"
        },
        {
          "name": "chronologicalAge",
          "short": "Actual age in years",
          "type": "`$NUMBER`"
        },
        {
          "name": "clockType",
          "short": "Biological aging clock used",
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "short": "Country code",
          "type": "`$STRING`"
        },
        {
          "name": "division",
          "short": "Age division category",
          "type": "`$STRING`"
        },
        {
          "name": "effectiveAgeReduction",
          "short": "Effective Age Reduction used for ranking",
          "type": "`$NUMBER`"
        },
        {
          "name": "generation",
          "short": "Generation category",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique athlete identifier",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "lastUpdated",
          "short": "Last result submission date",
          "type": "`$STRING`"
        },
        {
          "name": "league",
          "short": "Competition league",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Athlete name",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "profileUrl",
          "short": "URL to athlete's public profile",
          "type": "`$STRING`"
        },
        {
          "name": "rank",
          "short": "Current ranking position",
          "type": "`$INTEGER`"
        },
        {
          "name": "ultimateLeagueRank",
          "short": "Rank in Ultimate League (combined Pro and Amateur)",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "athlete",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "division",
                    "orig": "division",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "league",
                    "orig": "league",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 100,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/data/athletes",
              "segments": [
                {
                  "lit": "data"
                },
                {
                  "lit": "athletes"
                }
              ],
              "select": {
                "exist": [
                  "division",
                  "league",
                  "limit",
                  "offset"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.athletes`"
              },
              "parts": [
                "data",
                "athletes"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "bortz_age": {
      "fields": [
        {
          "name": "ageReduction",
          "short": "Calculated Age Reduction",
          "type": "`$NUMBER`"
        },
        {
          "name": "biomarkers",
          "req": true,
          "short": "Blood biomarker values required for Bortz Age calculation",
          "type": "`$OBJECT`"
        },
        {
          "name": "bortzAge",
          "short": "Calculated Bortz biological age",
          "type": "`$NUMBER`"
        },
        {
          "name": "chronologicalAge",
          "op": {
            "create": {
              "req": true,
              "type": "`$NUMBER`"
            }
          },
          "short": "Input chronological age",
          "type": "`$NUMBER`"
        },
        {
          "name": "season",
          "short": "Competition season",
          "type": "`$STRING`"
        }
      ],
      "name": "bortz_age",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/data/bortz-age",
              "segments": [
                {
                  "lit": "data"
                },
                {
                  "lit": "bortz-age"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "data",
                "bortz-age"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "competition": {
      "fields": [
        {
          "name": "ageRange",
          "short": "Age range for this division",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Division identifier",
          "type": "`$STRING`"
        },
        {
          "name": "maxAge",
          "short": "Maximum age for division",
          "type": "`$INTEGER`"
        },
        {
          "name": "minAge",
          "short": "Minimum age for division",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "Division name",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "competition",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/data/divisions",
              "segments": [
                {
                  "lit": "data"
                },
                {
                  "lit": "divisions"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.divisions`"
              },
              "parts": [
                "data",
                "divisions"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "leaderboard": {
      "fields": [
        {
          "name": "ageReduction",
          "short": "Age Reduction score",
          "type": "`$NUMBER`"
        },
        {
          "name": "athleteId",
          "short": "Athlete identifier",
          "type": "`$STRING`"
        },
        {
          "name": "athleteName",
          "short": "Athlete name",
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "short": "Country code",
          "type": "`$STRING`"
        },
        {
          "name": "division",
          "short": "Age division",
          "type": "`$STRING`"
        },
        {
          "name": "league",
          "short": "Competition league",
          "type": "`$STRING`"
        },
        {
          "name": "rank",
          "short": "Current ranking position",
          "type": "`$INTEGER`"
        }
      ],
      "name": "leaderboard",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "division",
                    "orig": "division",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "league",
                    "orig": "league",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/data/leaderboard",
              "segments": [
                {
                  "lit": "data"
                },
                {
                  "lit": "leaderboard"
                }
              ],
              "select": {
                "exist": [
                  "division",
                  "league"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.rankings`"
              },
              "parts": [
                "data",
                "leaderboard"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "pheno_age": {
      "fields": [
        {
          "name": "ageReduction",
          "short": "Calculated Age Reduction",
          "type": "`$NUMBER`"
        },
        {
          "name": "biomarkers",
          "req": true,
          "short": "Blood biomarker values required for Pheno Age calculation",
          "type": "`$OBJECT`"
        },
        {
          "name": "calculationMethod",
          "short": "Algorithm version used",
          "type": "`$STRING`"
        },
        {
          "name": "chronologicalAge",
          "op": {
            "create": {
              "req": true,
              "type": "`$NUMBER`"
            }
          },
          "short": "Input chronological age",
          "type": "`$NUMBER`"
        },
        {
          "name": "phenoAge",
          "short": "Calculated phenotypic biological age",
          "type": "`$NUMBER`"
        }
      ],
      "name": "pheno_age",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/data/pheno-age",
              "segments": [
                {
                  "lit": "data"
                },
                {
                  "lit": "pheno-age"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "data",
                "pheno-age"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "rank_preview": {
      "fields": [
        {
          "name": "ageReduction",
          "short": "Calculated Age Reduction",
          "type": "`$NUMBER`"
        },
        {
          "name": "athletesInLeague",
          "short": "Total athletes in target league",
          "type": "`$INTEGER`"
        },
        {
          "name": "biologicalAge",
          "req": true,
          "short": "Calculated biological age",
          "type": "`$NUMBER`"
        },
        {
          "name": "chronologicalAge",
          "req": true,
          "short": "Actual age in years",
          "type": "`$NUMBER`"
        },
        {
          "name": "division",
          "short": "Target division for preview",
          "type": "`$STRING`"
        },
        {
          "name": "estimatedRank",
          "short": "Estimated ranking position",
          "type": "`$INTEGER`"
        },
        {
          "name": "estimatedUltimateLeagueRank",
          "short": "Estimated Ultimate League rank",
          "type": "`$INTEGER`"
        },
        {
          "name": "league",
          "short": "Target league for preview",
          "type": "`$STRING`"
        },
        {
          "name": "percentile",
          "short": "Percentile ranking",
          "type": "`$NUMBER`"
        }
      ],
      "name": "rank_preview",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/data/rank-preview",
              "segments": [
                {
                  "lit": "data"
                },
                {
                  "lit": "rank-preview"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "data",
                "rank-preview"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "reference": {
      "fields": [
        {
          "name": "countryCode",
          "short": "ISO country code",
          "type": "`$STRING`"
        },
        {
          "name": "countryName",
          "short": "Country name",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "flagUrl",
          "short": "URL to flag image",
          "type": "`$STRING`"
        }
      ],
      "name": "reference",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/data/flags",
              "segments": [
                {
                  "lit": "data"
                },
                {
                  "lit": "flags"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.flags`"
              },
              "parts": [
                "data",
                "flags"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

