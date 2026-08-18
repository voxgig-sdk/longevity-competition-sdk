
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'LongevityCompetition',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$NUMBER`"
        },
        {
          "name": "biologicalAge",
          "type": "`$NUMBER`"
        },
        {
          "name": "chronologicalAge",
          "type": "`$NUMBER`"
        },
        {
          "name": "clockType",
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "type": "`$STRING`"
        },
        {
          "name": "division",
          "type": "`$STRING`"
        },
        {
          "name": "effectiveAgeReduction",
          "type": "`$NUMBER`"
        },
        {
          "name": "generation",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "lastUpdated",
          "type": "`$STRING`"
        },
        {
          "name": "league",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "profileUrl",
          "type": "`$STRING`"
        },
        {
          "name": "rank",
          "type": "`$INTEGER`"
        },
        {
          "name": "ultimateLeagueRank",
          "type": "`$INTEGER`"
        }
      ],
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
              "parts": [
                "data",
                "athletes"
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
              }
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
          "type": "`$NUMBER`"
        },
        {
          "name": "biomarkers",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "bortzAge",
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
          "type": "`$NUMBER`"
        },
        {
          "name": "season",
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
              "parts": [
                "data",
                "bortz-age"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "maxAge",
          "type": "`$INTEGER`"
        },
        {
          "name": "minAge",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        }
      ],
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
              "parts": [
                "data",
                "divisions"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.divisions`"
              }
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
          "type": "`$NUMBER`"
        },
        {
          "name": "athleteId",
          "type": "`$STRING`"
        },
        {
          "name": "athleteName",
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "type": "`$STRING`"
        },
        {
          "name": "division",
          "type": "`$STRING`"
        },
        {
          "name": "league",
          "type": "`$STRING`"
        },
        {
          "name": "rank",
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
              "parts": [
                "data",
                "leaderboard"
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
              }
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
          "type": "`$NUMBER`"
        },
        {
          "name": "biomarkers",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "calculationMethod",
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
          "type": "`$NUMBER`"
        },
        {
          "name": "phenoAge",
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
              "parts": [
                "data",
                "pheno-age"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$NUMBER`"
        },
        {
          "name": "athletesInLeague",
          "type": "`$INTEGER`"
        },
        {
          "name": "biologicalAge",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "chronologicalAge",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "division",
          "type": "`$STRING`"
        },
        {
          "name": "estimatedRank",
          "type": "`$INTEGER`"
        },
        {
          "name": "estimatedUltimateLeagueRank",
          "type": "`$INTEGER`"
        },
        {
          "name": "league",
          "type": "`$STRING`"
        },
        {
          "name": "percentile",
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
              "parts": [
                "data",
                "rank-preview"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$STRING`"
        },
        {
          "name": "countryName",
          "type": "`$STRING`"
        },
        {
          "name": "flagUrl",
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
              "parts": [
                "data",
                "flags"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.flags`"
              }
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
  config
}

