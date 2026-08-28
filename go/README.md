# LongevityCompetition Golang SDK



The Golang SDK for the LongevityCompetition API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Athlete(nil)` — each with the same small set of operations (`List`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/longevity-competition-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/longevity-competition-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/longevity-competition-sdk/go=../longevity-competition-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/longevity-competition-sdk/go"
)

func main() {
    client := sdk.New()

    // List athlete records — the value is the array of records itself.
    athletes, err := client.Athlete(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range athletes.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
competitions, err := client.Competition(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = competitions
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

competition, err := client.Competition(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(competition) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewLongevityCompetitionSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LONGEVITY_COMPETITION_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewLongevityCompetitionSDK

```go
func NewLongevityCompetitionSDK(options map[string]any) *LongevityCompetitionSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *LongevityCompetitionSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LongevityCompetitionSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Athlete` | `(data map[string]any) LongevityCompetitionEntity` | Create an Athlete entity instance. |
| `BortzAge` | `(data map[string]any) LongevityCompetitionEntity` | Create a BortzAge entity instance. |
| `Competition` | `(data map[string]any) LongevityCompetitionEntity` | Create a Competition entity instance. |
| `Leaderboard` | `(data map[string]any) LongevityCompetitionEntity` | Create a Leaderboard entity instance. |
| `PhenoAge` | `(data map[string]any) LongevityCompetitionEntity` | Create a PhenoAge entity instance. |
| `RankPreview` | `(data map[string]any) LongevityCompetitionEntity` | Create a RankPreview entity instance. |
| `Reference` | `(data map[string]any) LongevityCompetitionEntity` | Create a Reference entity instance. |

### Entity interface (LongevityCompetitionEntity)

All entities implement the `LongevityCompetitionEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Create` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    athlete, err := client.Athlete(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // athlete is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Athlete

| Field | Description |
| --- | --- |
| `"ageReduction"` | Age Reduction score (chronological age minus biological age) |
| `"biologicalAge"` | Calculated biological age |
| `"chronologicalAge"` | Actual age in years |
| `"clockType"` | Biological aging clock used |
| `"country"` | Country code |
| `"division"` | Age division category |
| `"effectiveAgeReduction"` | Effective Age Reduction used for ranking |
| `"generation"` | Generation category |
| `"id"` | Unique athlete identifier |
| `"lastUpdated"` | Last result submission date |
| `"league"` | Competition league |
| `"name"` | Athlete name |
| `"profileUrl"` | URL to athlete's public profile |
| `"rank"` | Current ranking position |
| `"ultimateLeagueRank"` | Rank in Ultimate League (combined Pro and Amateur) |

Operations: List.

API path: `/data/athletes`

#### BortzAge

| Field | Description |
| --- | --- |
| `"ageReduction"` | Calculated Age Reduction |
| `"biomarkers"` | Blood biomarker values required for Bortz Age calculation |
| `"bortzAge"` | Calculated Bortz biological age |
| `"chronologicalAge"` | Input chronological age |
| `"season"` | Competition season |

Operations: Create.

API path: `/data/bortz-age`

#### Competition

| Field | Description |
| --- | --- |
| `"ageRange"` | Age range for this division |
| `"id"` | Division identifier |
| `"maxAge"` | Maximum age for division |
| `"minAge"` | Minimum age for division |
| `"name"` | Division name |

Operations: List.

API path: `/data/divisions`

#### Leaderboard

| Field | Description |
| --- | --- |
| `"ageReduction"` | Age Reduction score |
| `"athleteId"` | Athlete identifier |
| `"athleteName"` | Athlete name |
| `"country"` | Country code |
| `"division"` | Age division |
| `"league"` | Competition league |
| `"rank"` | Current ranking position |

Operations: List.

API path: `/data/leaderboard`

#### PhenoAge

| Field | Description |
| --- | --- |
| `"ageReduction"` | Calculated Age Reduction |
| `"biomarkers"` | Blood biomarker values required for Pheno Age calculation |
| `"calculationMethod"` | Algorithm version used |
| `"chronologicalAge"` | Input chronological age |
| `"phenoAge"` | Calculated phenotypic biological age |

Operations: Create.

API path: `/data/pheno-age`

#### RankPreview

| Field | Description |
| --- | --- |
| `"ageReduction"` | Calculated Age Reduction |
| `"athletesInLeague"` | Total athletes in target league |
| `"biologicalAge"` | Calculated biological age |
| `"chronologicalAge"` | Actual age in years |
| `"division"` | Target division for preview |
| `"estimatedRank"` | Estimated ranking position |
| `"estimatedUltimateLeagueRank"` | Estimated Ultimate League rank |
| `"league"` | Target league for preview |
| `"percentile"` | Percentile ranking |

Operations: Create.

API path: `/data/rank-preview`

#### Reference

| Field | Description |
| --- | --- |
| `"countryCode"` | ISO country code |
| `"countryName"` | Country name |
| `"flagUrl"` | URL to flag image |

Operations: List.

API path: `/data/flags`



## Entities


### Athlete

Create an instance: `athlete := client.Athlete(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float64` | Age Reduction score (chronological age minus biological age) |
| `biologicalAge` | `float64` | Calculated biological age |
| `chronologicalAge` | `float64` | Actual age in years |
| `clockType` | `string` | Biological aging clock used |
| `country` | `string` | Country code |
| `division` | `string` | Age division category |
| `effectiveAgeReduction` | `float64` | Effective Age Reduction used for ranking |
| `generation` | `string` | Generation category |
| `id` | `string` | Unique athlete identifier |
| `lastUpdated` | `string` | Last result submission date |
| `league` | `string` | Competition league |
| `name` | `string` | Athlete name |
| `profileUrl` | `string` | URL to athlete's public profile |
| `rank` | `int` | Current ranking position |
| `ultimateLeagueRank` | `int` | Rank in Ultimate League (combined Pro and Amateur) |

#### Example: List

```go
athletes, err := client.Athlete(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(athletes) // the array of records
```


### BortzAge

Create an instance: `bortzAge := client.BortzAge(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float64` | Calculated Age Reduction |
| `biomarkers` | `map[string]any` | Blood biomarker values required for Bortz Age calculation |
| `bortzAge` | `float64` | Calculated Bortz biological age |
| `chronologicalAge` | `float64` | Input chronological age |
| `season` | `string` | Competition season |

#### Example: Create

```go
result, err := client.BortzAge(nil).Create(map[string]any{
    "biomarkers": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Competition

Create an instance: `competition := client.Competition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageRange` | `string` | Age range for this division |
| `id` | `string` | Division identifier |
| `maxAge` | `int` | Maximum age for division |
| `minAge` | `int` | Minimum age for division |
| `name` | `string` | Division name |

#### Example: List

```go
competitions, err := client.Competition(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(competitions) // the array of records
```


### Leaderboard

Create an instance: `leaderboard := client.Leaderboard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float64` | Age Reduction score |
| `athleteId` | `string` | Athlete identifier |
| `athleteName` | `string` | Athlete name |
| `country` | `string` | Country code |
| `division` | `string` | Age division |
| `league` | `string` | Competition league |
| `rank` | `int` | Current ranking position |

#### Example: List

```go
leaderboards, err := client.Leaderboard(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(leaderboards) // the array of records
```


### PhenoAge

Create an instance: `phenoAge := client.PhenoAge(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float64` | Calculated Age Reduction |
| `biomarkers` | `map[string]any` | Blood biomarker values required for Pheno Age calculation |
| `calculationMethod` | `string` | Algorithm version used |
| `chronologicalAge` | `float64` | Input chronological age |
| `phenoAge` | `float64` | Calculated phenotypic biological age |

#### Example: Create

```go
result, err := client.PhenoAge(nil).Create(map[string]any{
    "biomarkers": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### RankPreview

Create an instance: `rankPreview := client.RankPreview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float64` | Calculated Age Reduction |
| `athletesInLeague` | `int` | Total athletes in target league |
| `biologicalAge` | `float64` | Calculated biological age |
| `chronologicalAge` | `float64` | Actual age in years |
| `division` | `string` | Target division for preview |
| `estimatedRank` | `int` | Estimated ranking position |
| `estimatedUltimateLeagueRank` | `int` | Estimated Ultimate League rank |
| `league` | `string` | Target league for preview |
| `percentile` | `float64` | Percentile ranking |

#### Example: Create

```go
result, err := client.RankPreview(nil).Create(map[string]any{
    "biologicalAge": 1,
    "chronologicalAge": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Reference

Create an instance: `reference := client.Reference(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryCode` | `string` | ISO country code |
| `countryName` | `string` | Country name |
| `flagUrl` | `string` | URL to flag image |

#### Example: List

```go
references, err := client.Reference(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(references) // the array of records
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/longevity-competition-sdk/go/
├── longevity-competition.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/longevity-competition-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
competition := client.Competition(nil)
competition.List(nil, nil)

// competition.Data() now returns the competition data from the last list
// competition.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
