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
| `age_reduction` | `number` | No |  |
| `biological_age` | `number` | No |  |
| `chronological_age` | `number` | No |  |
| `clock_type` | `string` | No |  |
| `country` | `string` | No |  |
| `division` | `string` | No |  |
| `effective_age_reduction` | `number` | No |  |
| `generation` | `string` | No |  |
| `id` | `string` | No |  |
| `last_updated` | `string` | No |  |
| `league` | `string` | No |  |
| `name` | `string` | No |  |
| `profile_url` | `string` | No |  |
| `rank` | `number` | No |  |
| `ultimate_league_rank` | `number` | No |  |

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
| `age_reduction` | `number` | No |  |
| `biomarker` | `table` | Yes |  |
| `bortz_age` | `number` | No |  |
| `chronological_age` | `number` | No |  |
| `season` | `string` | No |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `age_reduction` | - |
| `biomarker` | - |
| `bortz_age` | - |
| `chronological_age` | Yes |
| `season` | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:BortzAge():create({
  biomarker = --[[ table ]],
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
| `age_range` | `string` | No |  |
| `id` | `string` | No |  |
| `max_age` | `number` | No |  |
| `min_age` | `number` | No |  |
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
| `age_reduction` | `number` | No |  |
| `athlete_id` | `string` | No |  |
| `athlete_name` | `string` | No |  |
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
| `age_reduction` | `number` | No |  |
| `biomarker` | `table` | Yes |  |
| `calculation_method` | `string` | No |  |
| `chronological_age` | `number` | No |  |
| `pheno_age` | `number` | No |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `age_reduction` | - |
| `biomarker` | - |
| `calculation_method` | - |
| `chronological_age` | Yes |
| `pheno_age` | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:PhenoAge():create({
  biomarker = --[[ table ]],
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
| `age_reduction` | `number` | No |  |
| `athletes_in_league` | `number` | No |  |
| `biological_age` | `number` | Yes |  |
| `chronological_age` | `number` | Yes |  |
| `division` | `string` | No |  |
| `estimated_rank` | `number` | No |  |
| `estimated_ultimate_league_rank` | `number` | No |  |
| `league` | `string` | No |  |
| `percentile` | `number` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:RankPreview():create({
  biological_age = --[[ number ]],
  chronological_age = --[[ number ]],
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
| `country_code` | `string` | No |  |
| `country_name` | `string` | No |  |
| `flag_url` | `string` | No |  |

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

