# LongevityCompetition Golang SDK Reference

Complete API reference for the LongevityCompetition Golang SDK.


## LongevityCompetitionSDK

### Constructor

```go
func NewLongevityCompetitionSDK(options map[string]any) *LongevityCompetitionSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *LongevityCompetitionSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *LongevityCompetitionSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Athlete(data map[string]any) LongevityCompetitionEntity`

Create a new `Athlete` entity instance. Pass `nil` for no initial data.

#### `BortzAge(data map[string]any) LongevityCompetitionEntity`

Create a new `BortzAge` entity instance. Pass `nil` for no initial data.

#### `Competition(data map[string]any) LongevityCompetitionEntity`

Create a new `Competition` entity instance. Pass `nil` for no initial data.

#### `Leaderboard(data map[string]any) LongevityCompetitionEntity`

Create a new `Leaderboard` entity instance. Pass `nil` for no initial data.

#### `PhenoAge(data map[string]any) LongevityCompetitionEntity`

Create a new `PhenoAge` entity instance. Pass `nil` for no initial data.

#### `RankPreview(data map[string]any) LongevityCompetitionEntity`

Create a new `RankPreview` entity instance. Pass `nil` for no initial data.

#### `Reference(data map[string]any) LongevityCompetitionEntity`

Create a new `Reference` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AthleteEntity

```go
athlete := client.Athlete(nil)
fmt.Println(athlete.GetName()) // "athlete"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float64` | No |  |
| `biologicalAge` | `float64` | No |  |
| `chronologicalAge` | `float64` | No |  |
| `clockType` | `string` | No |  |
| `country` | `string` | No |  |
| `division` | `string` | No |  |
| `effectiveAgeReduction` | `float64` | No |  |
| `generation` | `string` | No |  |
| `id` | `string` | No |  |
| `lastUpdated` | `string` | No |  |
| `league` | `string` | No |  |
| `name` | `string` | No |  |
| `profileUrl` | `string` | No |  |
| `rank` | `int` | No |  |
| `ultimateLeagueRank` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Athlete(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AthleteEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BortzAgeEntity

```go
bortzAge := client.BortzAge(nil)
fmt.Println(bortzAge.GetName()) // "bortz_age"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float64` | No |  |
| `biomarkers` | `map[string]any` | Yes |  |
| `bortzAge` | `float64` | No |  |
| `chronologicalAge` | `float64` | No |  |
| `season` | `string` | No |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `ageReduction` | - |
| `biomarkers` | - |
| `bortzAge` | - |
| `chronologicalAge` | Yes |
| `season` | - |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.BortzAge(nil).Create(map[string]any{
    "biomarkers": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BortzAgeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CompetitionEntity

```go
competition := client.Competition(nil)
fmt.Println(competition.GetName()) // "competition"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageRange` | `string` | No |  |
| `id` | `string` | No |  |
| `maxAge` | `int` | No |  |
| `minAge` | `int` | No |  |
| `name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Competition(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CompetitionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LeaderboardEntity

```go
leaderboard := client.Leaderboard(nil)
fmt.Println(leaderboard.GetName()) // "leaderboard"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float64` | No |  |
| `athleteId` | `string` | No |  |
| `athleteName` | `string` | No |  |
| `country` | `string` | No |  |
| `division` | `string` | No |  |
| `league` | `string` | No |  |
| `rank` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Leaderboard(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LeaderboardEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PhenoAgeEntity

```go
phenoAge := client.PhenoAge(nil)
fmt.Println(phenoAge.GetName()) // "pheno_age"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float64` | No |  |
| `biomarkers` | `map[string]any` | Yes |  |
| `calculationMethod` | `string` | No |  |
| `chronologicalAge` | `float64` | No |  |
| `phenoAge` | `float64` | No |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `ageReduction` | - |
| `biomarkers` | - |
| `calculationMethod` | - |
| `chronologicalAge` | Yes |
| `phenoAge` | - |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.PhenoAge(nil).Create(map[string]any{
    "biomarkers": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PhenoAgeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RankPreviewEntity

```go
rankPreview := client.RankPreview(nil)
fmt.Println(rankPreview.GetName()) // "rank_preview"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float64` | No |  |
| `athletesInLeague` | `int` | No |  |
| `biologicalAge` | `float64` | Yes |  |
| `chronologicalAge` | `float64` | Yes |  |
| `division` | `string` | No |  |
| `estimatedRank` | `int` | No |  |
| `estimatedUltimateLeagueRank` | `int` | No |  |
| `league` | `string` | No |  |
| `percentile` | `float64` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

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

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RankPreviewEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ReferenceEntity

```go
reference := client.Reference(nil)
fmt.Println(reference.GetName()) // "reference"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `string` | No |  |
| `countryName` | `string` | No |  |
| `flagUrl` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Reference(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReferenceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewLongevityCompetitionSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

