import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "athlete",
    "accessor": "Athlete",
    "op": "list",
    "method": "GET",
    "path": "/data/athletes",
    "args": [],
    "select": {
      "division": "v1",
      "league": "v1",
      "limit": 100,
      "offset": 0
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "league",
      "division",
      "limit",
      "offset"
    ],
    "queryArgs": [
      {
        "name": "division",
        "wire": "division"
      },
      {
        "name": "league",
        "wire": "league"
      },
      {
        "name": "limit",
        "wire": "limit"
      },
      {
        "name": "offset",
        "wire": "offset"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "athletes": [
        {
          "id": "x",
          "name": "x",
          "profileUrl": "x",
          "chronologicalAge": 1,
          "biologicalAge": 1,
          "ageReduction": 1,
          "effectiveAgeReduction": 1,
          "league": "Pro",
          "division": "x",
          "generation": "x",
          "rank": 1,
          "ultimateLeagueRank": 1,
          "country": "x",
          "clockType": "PhenoAge",
          "lastUpdated": "2026-01-01T00:00:00Z"
        }
      ],
      "total": 1,
      "limit": 1,
      "offset": 1
    },
    "idField": "id"
  },
  {
    "entity": "bortz_age",
    "accessor": "BortzAge",
    "op": "create",
    "method": "POST",
    "path": "/data/bortz-age",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "bortzAge": 1,
      "chronologicalAge": 1,
      "ageReduction": 1,
      "season": "x"
    },
    "idField": "id"
  },
  {
    "entity": "competition",
    "accessor": "Competition",
    "op": "list",
    "method": "GET",
    "path": "/data/divisions",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "divisions": [
        {
          "id": "x",
          "name": "x",
          "ageRange": "x",
          "minAge": 1,
          "maxAge": 1
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "leaderboard",
    "accessor": "Leaderboard",
    "op": "list",
    "method": "GET",
    "path": "/data/leaderboard",
    "args": [],
    "select": {
      "division": "v1",
      "league": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "league",
      "division"
    ],
    "queryArgs": [
      {
        "name": "division",
        "wire": "division"
      },
      {
        "name": "league",
        "wire": "league"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "rankings": [
        {
          "rank": 1,
          "athleteId": "x",
          "athleteName": "x",
          "ageReduction": 1,
          "league": "x",
          "division": "x",
          "country": "x"
        }
      ],
      "lastUpdated": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "pheno_age",
    "accessor": "PhenoAge",
    "op": "create",
    "method": "POST",
    "path": "/data/pheno-age",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "phenoAge": 1,
      "chronologicalAge": 1,
      "ageReduction": 1,
      "calculationMethod": "x"
    },
    "idField": "id"
  },
  {
    "entity": "rank_preview",
    "accessor": "RankPreview",
    "op": "create",
    "method": "POST",
    "path": "/data/rank-preview",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "estimatedRank": 1,
      "estimatedUltimateLeagueRank": 1,
      "ageReduction": 1,
      "percentile": 1,
      "athletesInLeague": 1
    },
    "idField": "id"
  },
  {
    "entity": "reference",
    "accessor": "Reference",
    "op": "list",
    "method": "GET",
    "path": "/data/flags",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "flags": [
        {
          "countryCode": "x",
          "countryName": "x",
          "flagUrl": "x"
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
