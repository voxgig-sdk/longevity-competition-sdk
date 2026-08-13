# LongevityCompetition Lua SDK Reference

Complete API reference for the LongevityCompetition Lua SDK.


## LongevityCompetitionSDK

### Constructor

```lua
local sdk = require("longevity-competition_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Athlete(data)`

Create a new `Athlete` entity instance. Pass `nil` for no initial data.

#### `BortzAge(data)`

Create a new `BortzAge` entity instance. Pass `nil` for no initial data.

#### `Competition(data)`

Create a new `Competition` entity instance. Pass `nil` for no initial data.

#### `Leaderboard(data)`

Create a new `Leaderboard` entity instance. Pass `nil` for no initial data.

#### `PhenoAge(data)`

Create a new `PhenoAge` entity instance. Pass `nil` for no initial data.

#### `RankPreview(data)`

Create a new `RankPreview` entity instance. Pass `nil` for no initial data.

#### `Reference(data)`

Create a new `Reference` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AthleteEntity

```lua
local athlete = client:Athlete(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `number` | No |  |
| `biologicalAge` | `number` | No |  |
| `chronologicalAge` | `number` | No |  |
| `clockType` | `string` | No |  |
| `country` | `string` | No |  |
| `division` | `string` | No |  |
| `effectiveAgeReduction` | `number` | No |  |
| `generation` | `string` | No |  |
| `id` | `string` | No |  |
| `lastUpdated` | `string` | No |  |
| `league` | `string` | No |  |
| `name` | `string` | No |  |
| `profileUrl` | `string` | No |  |
| `rank` | `number` | No |  |
| `ultimateLeagueRank` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Athlete():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AthleteEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BortzAgeEntity

```lua
local bortz_age = client:BortzAge(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `number` | No |  |
| `biomarkers` | `table` | Yes |  |
| `bortzAge` | `number` | No |  |
| `chronologicalAge` | `number` | No |  |
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:BortzAge():create({
  biomarkers = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BortzAgeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CompetitionEntity

```lua
local competition = client:Competition(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageRange` | `string` | No |  |
| `id` | `string` | No |  |
| `maxAge` | `number` | No |  |
| `minAge` | `number` | No |  |
| `name` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Competition():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CompetitionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LeaderboardEntity

```lua
local leaderboard = client:Leaderboard(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `number` | No |  |
| `athleteId` | `string` | No |  |
| `athleteName` | `string` | No |  |
| `country` | `string` | No |  |
| `division` | `string` | No |  |
| `league` | `string` | No |  |
| `rank` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Leaderboard():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LeaderboardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhenoAgeEntity

```lua
local pheno_age = client:PhenoAge(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `number` | No |  |
| `biomarkers` | `table` | Yes |  |
| `calculationMethod` | `string` | No |  |
| `chronologicalAge` | `number` | No |  |
| `phenoAge` | `number` | No |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `ageReduction` | - |
| `biomarkers` | - |
| `calculationMethod` | - |
| `chronologicalAge` | Yes |
| `phenoAge` | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:PhenoAge():create({
  biomarkers = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhenoAgeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RankPreviewEntity

```lua
local rank_preview = client:RankPreview(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `number` | No |  |
| `athletesInLeague` | `number` | No |  |
| `biologicalAge` | `number` | Yes |  |
| `chronologicalAge` | `number` | Yes |  |
| `division` | `string` | No |  |
| `estimatedRank` | `number` | No |  |
| `estimatedUltimateLeagueRank` | `number` | No |  |
| `league` | `string` | No |  |
| `percentile` | `number` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:RankPreview():create({
  biologicalAge = --[[ number ]],
  chronologicalAge = --[[ number ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RankPreviewEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReferenceEntity

```lua
local reference = client:Reference(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `string` | No |  |
| `countryName` | `string` | No |  |
| `flagUrl` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Reference():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReferenceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

