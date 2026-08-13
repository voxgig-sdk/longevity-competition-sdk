# LongevityCompetition Ruby SDK Reference

Complete API reference for the LongevityCompetition Ruby SDK.


## LongevityCompetitionSDK

### Constructor

```ruby
require_relative 'LongevityCompetition_sdk'

client = LongevityCompetitionSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LongevityCompetitionSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = LongevityCompetitionSDK.test
```


### Instance Methods

#### `Athlete(data = nil)`

Create a new `Athlete` entity instance. Pass `nil` for no initial data.

#### `BortzAge(data = nil)`

Create a new `BortzAge` entity instance. Pass `nil` for no initial data.

#### `Competition(data = nil)`

Create a new `Competition` entity instance. Pass `nil` for no initial data.

#### `Leaderboard(data = nil)`

Create a new `Leaderboard` entity instance. Pass `nil` for no initial data.

#### `PhenoAge(data = nil)`

Create a new `PhenoAge` entity instance. Pass `nil` for no initial data.

#### `RankPreview(data = nil)`

Create a new `RankPreview` entity instance. Pass `nil` for no initial data.

#### `Reference(data = nil)`

Create a new `Reference` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AthleteEntity

```ruby
athlete = client.Athlete
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `Float` | No |  |
| `biologicalAge` | `Float` | No |  |
| `chronologicalAge` | `Float` | No |  |
| `clockType` | `String` | No |  |
| `country` | `String` | No |  |
| `division` | `String` | No |  |
| `effectiveAgeReduction` | `Float` | No |  |
| `generation` | `String` | No |  |
| `id` | `String` | No |  |
| `lastUpdated` | `String` | No |  |
| `league` | `String` | No |  |
| `name` | `String` | No |  |
| `profileUrl` | `String` | No |  |
| `rank` | `Integer` | No |  |
| `ultimateLeagueRank` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Athlete.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AthleteEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BortzAgeEntity

```ruby
bortz_age = client.BortzAge
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `Float` | No |  |
| `biomarkers` | `Hash` | Yes |  |
| `bortzAge` | `Float` | No |  |
| `chronologicalAge` | `Float` | No |  |
| `season` | `String` | No |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `ageReduction` | - |
| `biomarkers` | - |
| `bortzAge` | - |
| `chronologicalAge` | Yes |
| `season` | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.BortzAge.create({
  "biomarkers" => {}, # Hash
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BortzAgeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CompetitionEntity

```ruby
competition = client.Competition
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageRange` | `String` | No |  |
| `id` | `String` | No |  |
| `maxAge` | `Integer` | No |  |
| `minAge` | `Integer` | No |  |
| `name` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Competition.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CompetitionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LeaderboardEntity

```ruby
leaderboard = client.Leaderboard
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `Float` | No |  |
| `athleteId` | `String` | No |  |
| `athleteName` | `String` | No |  |
| `country` | `String` | No |  |
| `division` | `String` | No |  |
| `league` | `String` | No |  |
| `rank` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Leaderboard.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LeaderboardEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PhenoAgeEntity

```ruby
pheno_age = client.PhenoAge
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `Float` | No |  |
| `biomarkers` | `Hash` | Yes |  |
| `calculationMethod` | `String` | No |  |
| `chronologicalAge` | `Float` | No |  |
| `phenoAge` | `Float` | No |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `ageReduction` | - |
| `biomarkers` | - |
| `calculationMethod` | - |
| `chronologicalAge` | Yes |
| `phenoAge` | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.PhenoAge.create({
  "biomarkers" => {}, # Hash
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PhenoAgeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RankPreviewEntity

```ruby
rank_preview = client.RankPreview
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `Float` | No |  |
| `athletesInLeague` | `Integer` | No |  |
| `biologicalAge` | `Float` | Yes |  |
| `chronologicalAge` | `Float` | Yes |  |
| `division` | `String` | No |  |
| `estimatedRank` | `Integer` | No |  |
| `estimatedUltimateLeagueRank` | `Integer` | No |  |
| `league` | `String` | No |  |
| `percentile` | `Float` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.RankPreview.create({
  "biologicalAge" => 1, # Float
  "chronologicalAge" => 1, # Float
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RankPreviewEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReferenceEntity

```ruby
reference = client.Reference
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `String` | No |  |
| `countryName` | `String` | No |  |
| `flagUrl` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Reference.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReferenceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = LongevityCompetitionSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

