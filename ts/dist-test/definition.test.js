"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
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
            "limit": "v1",
            "offset": "v1"
        },
        "headers": [],
        "query": [
            "league",
            "division",
            "limit",
            "offset"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "athletes": [
                {
                    "ageReduction": 1,
                    "biologicalAge": 1,
                    "chronologicalAge": 1,
                    "clockType": "PhenoAge",
                    "country": "x",
                    "division": "x",
                    "effectiveAgeReduction": 1,
                    "generation": "x",
                    "id": "x",
                    "lastUpdated": "2026-01-01T00:00:00Z",
                    "league": "Pro",
                    "name": "x",
                    "profileUrl": "x",
                    "rank": 1,
                    "ultimateLeagueRank": 1
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
        "query": [],
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
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "divisions": [
                {
                    "ageRange": "x",
                    "id": "x",
                    "maxAge": 1,
                    "minAge": 1,
                    "name": "x"
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
        "query": [
            "league",
            "division"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "rankings": [
                {
                    "ageReduction": 1,
                    "athleteId": "x",
                    "athleteName": "x",
                    "country": "x",
                    "division": "x",
                    "league": "x",
                    "rank": 1
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
        "query": [],
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
        "query": [],
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
        "query": [],
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
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map