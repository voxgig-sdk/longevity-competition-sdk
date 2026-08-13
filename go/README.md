# LongevityCompetition Golang SDK



The Golang SDK for the LongevityCompetition API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Athlete(nil)` — each with the same small set of operations (`List`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
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
| `"ageReduction"` |  |
| `"biologicalAge"` |  |
| `"chronologicalAge"` |  |
| `"clockType"` |  |
| `"country"` |  |
| `"division"` |  |
| `"effectiveAgeReduction"` |  |
| `"generation"` |  |
| `"id"` |  |
| `"lastUpdated"` |  |
| `"league"` |  |
| `"name"` |  |
| `"profileUrl"` |  |
| `"rank"` |  |
| `"ultimateLeagueRank"` |  |

Operations: List.

API path: `/data/athletes`

#### BortzAge

| Field | Description |
| --- | --- |
| `"ageReduction"` |  |
| `"biomarkers"` |  |
| `"bortzAge"` |  |
| `"chronologicalAge"` |  |
| `"season"` |  |

Operations: Create.

API path: `/data/bortz-age`

#### Competition

| Field | Description |
| --- | --- |
| `"ageRange"` |  |
| `"id"` |  |
| `"maxAge"` |  |
| `"minAge"` |  |
| `"name"` |  |

Operations: List.

API path: `/data/divisions`

#### Leaderboard

| Field | Description |
| --- | --- |
| `"ageReduction"` |  |
| `"athleteId"` |  |
| `"athleteName"` |  |
| `"country"` |  |
| `"division"` |  |
| `"league"` |  |
| `"rank"` |  |

Operations: List.

API path: `/data/leaderboard`

#### PhenoAge

| Field | Description |
| --- | --- |
| `"ageReduction"` |  |
| `"biomarkers"` |  |
| `"calculationMethod"` |  |
| `"chronologicalAge"` |  |
| `"phenoAge"` |  |

Operations: Create.

API path: `/data/pheno-age`

#### RankPreview

| Field | Description |
| --- | --- |
| `"ageReduction"` |  |
| `"athletesInLeague"` |  |
| `"biologicalAge"` |  |
| `"chronologicalAge"` |  |
| `"division"` |  |
| `"estimatedRank"` |  |
| `"estimatedUltimateLeagueRank"` |  |
| `"league"` |  |
| `"percentile"` |  |

Operations: Create.

API path: `/data/rank-preview`

#### Reference

| Field | Description |
| --- | --- |
| `"countryCode"` |  |
| `"countryName"` |  |
| `"flagUrl"` |  |

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
| `ageReduction` | `float64` |  |
| `biologicalAge` | `float64` |  |
| `chronologicalAge` | `float64` |  |
| `clockType` | `string` |  |
| `country` | `string` |  |
| `division` | `string` |  |
| `effectiveAgeReduction` | `float64` |  |
| `generation` | `string` |  |
| `id` | `string` |  |
| `lastUpdated` | `string` |  |
| `league` | `string` |  |
| `name` | `string` |  |
| `profileUrl` | `string` |  |
| `rank` | `int` |  |
| `ultimateLeagueRank` | `int` |  |

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
| `ageReduction` | `float64` |  |
| `biomarkers` | `map[string]any` |  |
| `bortzAge` | `float64` |  |
| `chronologicalAge` | `float64` |  |
| `season` | `string` |  |

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
| `ageRange` | `string` |  |
| `id` | `string` |  |
| `maxAge` | `int` |  |
| `minAge` | `int` |  |
| `name` | `string` |  |

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
| `ageReduction` | `float64` |  |
| `athleteId` | `string` |  |
| `athleteName` | `string` |  |
| `country` | `string` |  |
| `division` | `string` |  |
| `league` | `string` |  |
| `rank` | `int` |  |

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
| `ageReduction` | `float64` |  |
| `biomarkers` | `map[string]any` |  |
| `calculationMethod` | `string` |  |
| `chronologicalAge` | `float64` |  |
| `phenoAge` | `float64` |  |

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
| `ageReduction` | `float64` |  |
| `athletesInLeague` | `int` |  |
| `biologicalAge` | `float64` |  |
| `chronologicalAge` | `float64` |  |
| `division` | `string` |  |
| `estimatedRank` | `int` |  |
| `estimatedUltimateLeagueRank` | `int` |  |
| `league` | `string` |  |
| `percentile` | `float64` |  |

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
| `countryCode` | `string` |  |
| `countryName` | `string` |  |
| `flagUrl` | `string` |  |

#### Example: List

```go
references, err := client.Reference(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(references) // the array of records
```


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
