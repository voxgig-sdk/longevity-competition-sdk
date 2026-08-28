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
| `ageReduction` | `Float` | No | Age Reduction score (chronological age minus biological age) |
| `biologicalAge` | `Float` | No | Calculated biological age |
| `chronologicalAge` | `Float` | No | Actual age in years |
| `clockType` | `String` | No | Biological aging clock used |
| `country` | `String` | No | Country code |
| `division` | `String` | No | Age division category |
| `effectiveAgeReduction` | `Float` | No | Effective Age Reduction used for ranking |
| `generation` | `String` | No | Generation category |
| `id` | `String` | No | Unique athlete identifier |
| `lastUpdated` | `String` | No | Last result submission date |
| `league` | `String` | No | Competition league |
| `name` | `String` | No | Athlete name |
| `profileUrl` | `String` | No | URL to athlete's public profile |
| `rank` | `Integer` | No | Current ranking position |
| `ultimateLeagueRank` | `Integer` | No | Rank in Ultimate League (combined Pro and Amateur) |

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
| `ageReduction` | `Float` | No | Calculated Age Reduction |
| `biomarkers` | `Hash` | Yes | Blood biomarker values required for Bortz Age calculation |
| `bortzAge` | `Float` | No | Calculated Bortz biological age |
| `chronologicalAge` | `Float` | No | Input chronological age |
| `season` | `String` | No | Competition season |

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
| `ageRange` | `String` | No | Age range for this division |
| `id` | `String` | No | Division identifier |
| `maxAge` | `Integer` | No | Maximum age for division |
| `minAge` | `Integer` | No | Minimum age for division |
| `name` | `String` | No | Division name |

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
| `ageReduction` | `Float` | No | Age Reduction score |
| `athleteId` | `String` | No | Athlete identifier |
| `athleteName` | `String` | No | Athlete name |
| `country` | `String` | No | Country code |
| `division` | `String` | No | Age division |
| `league` | `String` | No | Competition league |
| `rank` | `Integer` | No | Current ranking position |

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
| `ageReduction` | `Float` | No | Calculated Age Reduction |
| `biomarkers` | `Hash` | Yes | Blood biomarker values required for Pheno Age calculation |
| `calculationMethod` | `String` | No | Algorithm version used |
| `chronologicalAge` | `Float` | No | Input chronological age |
| `phenoAge` | `Float` | No | Calculated phenotypic biological age |

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
| `ageReduction` | `Float` | No | Calculated Age Reduction |
| `athletesInLeague` | `Integer` | No | Total athletes in target league |
| `biologicalAge` | `Float` | Yes | Calculated biological age |
| `chronologicalAge` | `Float` | Yes | Actual age in years |
| `division` | `String` | No | Target division for preview |
| `estimatedRank` | `Integer` | No | Estimated ranking position |
| `estimatedUltimateLeagueRank` | `Integer` | No | Estimated Ultimate League rank |
| `league` | `String` | No | Target league for preview |
| `percentile` | `Float` | No | Percentile ranking |

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
| `countryCode` | `String` | No | ISO country code |
| `countryName` | `String` | No | Country name |
| `flagUrl` | `String` | No | URL to flag image |

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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

