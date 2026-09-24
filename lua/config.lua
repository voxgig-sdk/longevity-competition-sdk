-- LongevityCompetition SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "LongevityCompetition",
      slug = "longevity-competition",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://longevityworldcup.com/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["athlete"] = {},
        ["bortz_age"] = {},
        ["competition"] = {},
        ["leaderboard"] = {},
        ["pheno_age"] = {},
        ["rank_preview"] = {},
        ["reference"] = {},
      },
    },
    entity = {
      ["athlete"] = {
        ["fields"] = {
          {
            ["name"] = "ageReduction",
            ["title"] = "Age Reduction",
            ["type"] = "`$NUMBER`",
            ["short"] = "Age Reduction score (chronological age minus biological age)",
          },
          {
            ["name"] = "biologicalAge",
            ["title"] = "Biological Age",
            ["type"] = "`$NUMBER`",
            ["short"] = "Calculated biological age",
          },
          {
            ["name"] = "chronologicalAge",
            ["title"] = "Chronological Age",
            ["type"] = "`$NUMBER`",
            ["short"] = "Actual age in years",
          },
          {
            ["name"] = "clockType",
            ["title"] = "Clock Type",
            ["type"] = "`$STRING`",
            ["short"] = "Biological aging clock used",
          },
          {
            ["name"] = "country",
            ["title"] = "Country",
            ["type"] = "`$STRING`",
            ["short"] = "Country code",
          },
          {
            ["name"] = "division",
            ["title"] = "Division",
            ["type"] = "`$STRING`",
            ["short"] = "Age division category",
          },
          {
            ["name"] = "effectiveAgeReduction",
            ["title"] = "Effective Age Reduction",
            ["type"] = "`$NUMBER`",
            ["short"] = "Effective Age Reduction used for ranking",
          },
          {
            ["name"] = "generation",
            ["title"] = "Generation",
            ["type"] = "`$STRING`",
            ["short"] = "Generation category",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique athlete identifier",
          },
          {
            ["name"] = "lastUpdated",
            ["title"] = "Last Updated",
            ["type"] = "`$STRING`",
            ["short"] = "Last result submission date",
            ["format"] = "date-time",
          },
          {
            ["name"] = "league",
            ["title"] = "League",
            ["type"] = "`$STRING`",
            ["short"] = "Competition league",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Athlete name",
          },
          {
            ["name"] = "profileUrl",
            ["title"] = "Profile Url",
            ["type"] = "`$STRING`",
            ["short"] = "URL to athlete's public profile",
            ["format"] = "uri",
          },
          {
            ["name"] = "rank",
            ["title"] = "Rank",
            ["type"] = "`$INTEGER`",
            ["short"] = "Current ranking position",
          },
          {
            ["name"] = "ultimateLeagueRank",
            ["title"] = "Ultimate League Rank",
            ["type"] = "`$INTEGER`",
            ["short"] = "Rank in Ultimate League (combined Pro and Amateur)",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "athlete",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/athletes",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "athletes",
                  },
                },
                ["parts"] = {
                  "data",
                  "athletes",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.athletes`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "division",
                      ["orig"] = "division",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "league",
                      ["orig"] = "league",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 100,
                    },
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
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
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["bortz_age"] = {
        ["fields"] = {
          {
            ["name"] = "ageReduction",
            ["title"] = "Age Reduction",
            ["type"] = "`$NUMBER`",
            ["short"] = "Calculated Age Reduction",
          },
          {
            ["name"] = "biomarkers",
            ["title"] = "Biomarkers",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Blood biomarker values required for Bortz Age calculation",
          },
          {
            ["name"] = "bortzAge",
            ["title"] = "Bortz Age",
            ["type"] = "`$NUMBER`",
            ["short"] = "Calculated Bortz biological age",
          },
          {
            ["name"] = "chronologicalAge",
            ["title"] = "Chronological Age",
            ["type"] = "`$NUMBER`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$NUMBER`",
              },
            },
            ["short"] = "Input chronological age",
          },
          {
            ["name"] = "season",
            ["title"] = "Season",
            ["type"] = "`$STRING`",
            ["short"] = "Competition season",
          },
        },
        ["name"] = "bortz_age",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/data/bortz-age",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "bortz-age",
                  },
                },
                ["parts"] = {
                  "data",
                  "bortz-age",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["competition"] = {
        ["fields"] = {
          {
            ["name"] = "ageRange",
            ["title"] = "Age Range",
            ["type"] = "`$STRING`",
            ["short"] = "Age range for this division",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Division identifier",
          },
          {
            ["name"] = "maxAge",
            ["title"] = "Max Age",
            ["type"] = "`$INTEGER`",
            ["short"] = "Maximum age for division",
          },
          {
            ["name"] = "minAge",
            ["title"] = "Min Age",
            ["type"] = "`$INTEGER`",
            ["short"] = "Minimum age for division",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Division name",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "competition",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/divisions",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "divisions",
                  },
                },
                ["parts"] = {
                  "data",
                  "divisions",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.divisions`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["leaderboard"] = {
        ["fields"] = {
          {
            ["name"] = "ageReduction",
            ["title"] = "Age Reduction",
            ["type"] = "`$NUMBER`",
            ["short"] = "Age Reduction score",
          },
          {
            ["name"] = "athleteId",
            ["title"] = "Athlete Id",
            ["type"] = "`$STRING`",
            ["short"] = "Athlete identifier",
          },
          {
            ["name"] = "athleteName",
            ["title"] = "Athlete Name",
            ["type"] = "`$STRING`",
            ["short"] = "Athlete name",
          },
          {
            ["name"] = "country",
            ["title"] = "Country",
            ["type"] = "`$STRING`",
            ["short"] = "Country code",
          },
          {
            ["name"] = "division",
            ["title"] = "Division",
            ["type"] = "`$STRING`",
            ["short"] = "Age division",
          },
          {
            ["name"] = "league",
            ["title"] = "League",
            ["type"] = "`$STRING`",
            ["short"] = "Competition league",
          },
          {
            ["name"] = "rank",
            ["title"] = "Rank",
            ["type"] = "`$INTEGER`",
            ["short"] = "Current ranking position",
          },
        },
        ["name"] = "leaderboard",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/leaderboard",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "leaderboard",
                  },
                },
                ["parts"] = {
                  "data",
                  "leaderboard",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.rankings`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "division",
                      ["orig"] = "division",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "league",
                      ["orig"] = "league",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "division",
                    "league",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["pheno_age"] = {
        ["fields"] = {
          {
            ["name"] = "ageReduction",
            ["title"] = "Age Reduction",
            ["type"] = "`$NUMBER`",
            ["short"] = "Calculated Age Reduction",
          },
          {
            ["name"] = "biomarkers",
            ["title"] = "Biomarkers",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Blood biomarker values required for Pheno Age calculation",
          },
          {
            ["name"] = "calculationMethod",
            ["title"] = "Calculation Method",
            ["type"] = "`$STRING`",
            ["short"] = "Algorithm version used",
          },
          {
            ["name"] = "chronologicalAge",
            ["title"] = "Chronological Age",
            ["type"] = "`$NUMBER`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$NUMBER`",
              },
            },
            ["short"] = "Input chronological age",
          },
          {
            ["name"] = "phenoAge",
            ["title"] = "Pheno Age",
            ["type"] = "`$NUMBER`",
            ["short"] = "Calculated phenotypic biological age",
          },
        },
        ["name"] = "pheno_age",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/data/pheno-age",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "pheno-age",
                  },
                },
                ["parts"] = {
                  "data",
                  "pheno-age",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["rank_preview"] = {
        ["fields"] = {
          {
            ["name"] = "ageReduction",
            ["title"] = "Age Reduction",
            ["type"] = "`$NUMBER`",
            ["short"] = "Calculated Age Reduction",
          },
          {
            ["name"] = "athletesInLeague",
            ["title"] = "Athletes In League",
            ["type"] = "`$INTEGER`",
            ["short"] = "Total athletes in target league",
          },
          {
            ["name"] = "biologicalAge",
            ["title"] = "Biological Age",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "Calculated biological age",
          },
          {
            ["name"] = "chronologicalAge",
            ["title"] = "Chronological Age",
            ["type"] = "`$NUMBER`",
            ["req"] = true,
            ["short"] = "Actual age in years",
          },
          {
            ["name"] = "division",
            ["title"] = "Division",
            ["type"] = "`$STRING`",
            ["short"] = "Target division for preview",
          },
          {
            ["name"] = "estimatedRank",
            ["title"] = "Estimated Rank",
            ["type"] = "`$INTEGER`",
            ["short"] = "Estimated ranking position",
          },
          {
            ["name"] = "estimatedUltimateLeagueRank",
            ["title"] = "Estimated Ultimate League Rank",
            ["type"] = "`$INTEGER`",
            ["short"] = "Estimated Ultimate League rank",
          },
          {
            ["name"] = "league",
            ["title"] = "League",
            ["type"] = "`$STRING`",
            ["short"] = "Target league for preview",
          },
          {
            ["name"] = "percentile",
            ["title"] = "Percentile",
            ["type"] = "`$NUMBER`",
            ["short"] = "Percentile ranking",
          },
        },
        ["name"] = "rank_preview",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/data/rank-preview",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "rank-preview",
                  },
                },
                ["parts"] = {
                  "data",
                  "rank-preview",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["reference"] = {
        ["fields"] = {
          {
            ["name"] = "countryCode",
            ["title"] = "Country Code",
            ["type"] = "`$STRING`",
            ["short"] = "ISO country code",
          },
          {
            ["name"] = "countryName",
            ["title"] = "Country Name",
            ["type"] = "`$STRING`",
            ["short"] = "Country name",
          },
          {
            ["name"] = "flagUrl",
            ["title"] = "Flag Url",
            ["type"] = "`$STRING`",
            ["short"] = "URL to flag image",
            ["format"] = "uri",
          },
        },
        ["name"] = "reference",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/data/flags",
                ["segments"] = {
                  {
                    ["lit"] = "data",
                  },
                  {
                    ["lit"] = "flags",
                  },
                },
                ["parts"] = {
                  "data",
                  "flags",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.flags`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
