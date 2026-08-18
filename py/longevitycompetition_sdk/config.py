# LongevityCompetition SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "LongevityCompetition",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://longevityworldcup.com/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "athlete": {},
                "bortz_age": {},
                "competition": {},
                "leaderboard": {},
                "pheno_age": {},
                "rank_preview": {},
                "reference": {},
            },
        },
        "entity": {
      "athlete": {
        "fields": [
          {
            "name": "ageReduction",
            "type": "`$NUMBER`",
          },
          {
            "name": "biologicalAge",
            "type": "`$NUMBER`",
          },
          {
            "name": "chronologicalAge",
            "type": "`$NUMBER`",
          },
          {
            "name": "clockType",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "type": "`$STRING`",
          },
          {
            "name": "division",
            "type": "`$STRING`",
          },
          {
            "name": "effectiveAgeReduction",
            "type": "`$NUMBER`",
          },
          {
            "name": "generation",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "lastUpdated",
            "type": "`$STRING`",
          },
          {
            "name": "league",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "profileUrl",
            "type": "`$STRING`",
          },
          {
            "name": "rank",
            "type": "`$INTEGER`",
          },
          {
            "name": "ultimateLeagueRank",
            "type": "`$INTEGER`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "league",
                      "orig": "league",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 100,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/data/athletes",
                "parts": [
                  "data",
                  "athletes",
                ],
                "select": {
                  "exist": [
                    "division",
                    "league",
                    "limit",
                    "offset",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.athletes`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "bortz_age": {
        "fields": [
          {
            "name": "ageReduction",
            "type": "`$NUMBER`",
          },
          {
            "name": "biomarkers",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "bortzAge",
            "type": "`$NUMBER`",
          },
          {
            "name": "chronologicalAge",
            "op": {
              "create": {
                "req": True,
                "type": "`$NUMBER`",
              },
            },
            "type": "`$NUMBER`",
          },
          {
            "name": "season",
            "type": "`$STRING`",
          },
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
                  "bortz-age",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "competition": {
        "fields": [
          {
            "name": "ageRange",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "maxAge",
            "type": "`$INTEGER`",
          },
          {
            "name": "minAge",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
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
                  "divisions",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.divisions`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "leaderboard": {
        "fields": [
          {
            "name": "ageReduction",
            "type": "`$NUMBER`",
          },
          {
            "name": "athleteId",
            "type": "`$STRING`",
          },
          {
            "name": "athleteName",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "type": "`$STRING`",
          },
          {
            "name": "division",
            "type": "`$STRING`",
          },
          {
            "name": "league",
            "type": "`$STRING`",
          },
          {
            "name": "rank",
            "type": "`$INTEGER`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "league",
                      "orig": "league",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/data/leaderboard",
                "parts": [
                  "data",
                  "leaderboard",
                ],
                "select": {
                  "exist": [
                    "division",
                    "league",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rankings`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "pheno_age": {
        "fields": [
          {
            "name": "ageReduction",
            "type": "`$NUMBER`",
          },
          {
            "name": "biomarkers",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "calculationMethod",
            "type": "`$STRING`",
          },
          {
            "name": "chronologicalAge",
            "op": {
              "create": {
                "req": True,
                "type": "`$NUMBER`",
              },
            },
            "type": "`$NUMBER`",
          },
          {
            "name": "phenoAge",
            "type": "`$NUMBER`",
          },
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
                  "pheno-age",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "rank_preview": {
        "fields": [
          {
            "name": "ageReduction",
            "type": "`$NUMBER`",
          },
          {
            "name": "athletesInLeague",
            "type": "`$INTEGER`",
          },
          {
            "name": "biologicalAge",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "chronologicalAge",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "division",
            "type": "`$STRING`",
          },
          {
            "name": "estimatedRank",
            "type": "`$INTEGER`",
          },
          {
            "name": "estimatedUltimateLeagueRank",
            "type": "`$INTEGER`",
          },
          {
            "name": "league",
            "type": "`$STRING`",
          },
          {
            "name": "percentile",
            "type": "`$NUMBER`",
          },
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
                  "rank-preview",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "reference": {
        "fields": [
          {
            "name": "countryCode",
            "type": "`$STRING`",
          },
          {
            "name": "countryName",
            "type": "`$STRING`",
          },
          {
            "name": "flagUrl",
            "type": "`$STRING`",
          },
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
                  "flags",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.flags`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
