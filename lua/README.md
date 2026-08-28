# LongevityCompetition Lua SDK



The Lua SDK for the LongevityCompetition API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Athlete()` — each with the same small set of operations (`list`, `create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/longevity-competition-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("longevity-competition_sdk")

local client = sdk.new()
```

### 2. List athlete records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local athletes, err = client:Athlete():list()
if err then error(err) end

for _, item in ipairs(athletes) do
  print(item["id"], item["clockType"])
end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local competitions, err = client:Competition():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Competition():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### LongevityCompetitionSDK

```lua
local sdk = require("longevity-competition_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LongevityCompetitionSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Athlete` | `(data) -> AthleteEntity` | Create an Athlete entity instance. |
| `BortzAge` | `(data) -> BortzAgeEntity` | Create a BortzAge entity instance. |
| `Competition` | `(data) -> CompetitionEntity` | Create a Competition entity instance. |
| `Leaderboard` | `(data) -> LeaderboardEntity` | Create a Leaderboard entity instance. |
| `PhenoAge` | `(data) -> PhenoAgeEntity` | Create a PhenoAge entity instance. |
| `RankPreview` | `(data) -> RankPreviewEntity` | Create a RankPreview entity instance. |
| `Reference` | `(data) -> ReferenceEntity` | Create a Reference entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `create` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local athlete, err = client:Athlete():list()
    if err then error(err) end
    -- athlete is the record list

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Athlete

| Field | Description |
| --- | --- |
| `ageReduction` | Age Reduction score (chronological age minus biological age) |
| `biologicalAge` | Calculated biological age |
| `chronologicalAge` | Actual age in years |
| `clockType` | Biological aging clock used |
| `country` | Country code |
| `division` | Age division category |
| `effectiveAgeReduction` | Effective Age Reduction used for ranking |
| `generation` | Generation category |
| `id` | Unique athlete identifier |
| `lastUpdated` | Last result submission date |
| `league` | Competition league |
| `name` | Athlete name |
| `profileUrl` | URL to athlete's public profile |
| `rank` | Current ranking position |
| `ultimateLeagueRank` | Rank in Ultimate League (combined Pro and Amateur) |

Operations: List.

API path: `/data/athletes`

#### BortzAge

| Field | Description |
| --- | --- |
| `ageReduction` | Calculated Age Reduction |
| `biomarkers` | Blood biomarker values required for Bortz Age calculation |
| `bortzAge` | Calculated Bortz biological age |
| `chronologicalAge` | Input chronological age |
| `season` | Competition season |

Operations: Create.

API path: `/data/bortz-age`

#### Competition

| Field | Description |
| --- | --- |
| `ageRange` | Age range for this division |
| `id` | Division identifier |
| `maxAge` | Maximum age for division |
| `minAge` | Minimum age for division |
| `name` | Division name |

Operations: List.

API path: `/data/divisions`

#### Leaderboard

| Field | Description |
| --- | --- |
| `ageReduction` | Age Reduction score |
| `athleteId` | Athlete identifier |
| `athleteName` | Athlete name |
| `country` | Country code |
| `division` | Age division |
| `league` | Competition league |
| `rank` | Current ranking position |

Operations: List.

API path: `/data/leaderboard`

#### PhenoAge

| Field | Description |
| --- | --- |
| `ageReduction` | Calculated Age Reduction |
| `biomarkers` | Blood biomarker values required for Pheno Age calculation |
| `calculationMethod` | Algorithm version used |
| `chronologicalAge` | Input chronological age |
| `phenoAge` | Calculated phenotypic biological age |

Operations: Create.

API path: `/data/pheno-age`

#### RankPreview

| Field | Description |
| --- | --- |
| `ageReduction` | Calculated Age Reduction |
| `athletesInLeague` | Total athletes in target league |
| `biologicalAge` | Calculated biological age |
| `chronologicalAge` | Actual age in years |
| `division` | Target division for preview |
| `estimatedRank` | Estimated ranking position |
| `estimatedUltimateLeagueRank` | Estimated Ultimate League rank |
| `league` | Target league for preview |
| `percentile` | Percentile ranking |

Operations: Create.

API path: `/data/rank-preview`

#### Reference

| Field | Description |
| --- | --- |
| `countryCode` | ISO country code |
| `countryName` | Country name |
| `flagUrl` | URL to flag image |

Operations: List.

API path: `/data/flags`



## Entities


### Athlete

Create an instance: `local athlete = client:Athlete(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `number` | Age Reduction score (chronological age minus biological age) |
| `biologicalAge` | `number` | Calculated biological age |
| `chronologicalAge` | `number` | Actual age in years |
| `clockType` | `string` | Biological aging clock used |
| `country` | `string` | Country code |
| `division` | `string` | Age division category |
| `effectiveAgeReduction` | `number` | Effective Age Reduction used for ranking |
| `generation` | `string` | Generation category |
| `id` | `string` | Unique athlete identifier |
| `lastUpdated` | `string` | Last result submission date |
| `league` | `string` | Competition league |
| `name` | `string` | Athlete name |
| `profileUrl` | `string` | URL to athlete's public profile |
| `rank` | `number` | Current ranking position |
| `ultimateLeagueRank` | `number` | Rank in Ultimate League (combined Pro and Amateur) |

#### Example: List

```lua
local athletes, err = client:Athlete():list()
```


### BortzAge

Create an instance: `local bortz_age = client:BortzAge(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `number` | Calculated Age Reduction |
| `biomarkers` | `table` | Blood biomarker values required for Bortz Age calculation |
| `bortzAge` | `number` | Calculated Bortz biological age |
| `chronologicalAge` | `number` | Input chronological age |
| `season` | `string` | Competition season |

#### Example: Create

```lua
local bortz_age, err = client:BortzAge():create({
  biomarkers = {}, -- table
})
```


### Competition

Create an instance: `local competition = client:Competition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageRange` | `string` | Age range for this division |
| `id` | `string` | Division identifier |
| `maxAge` | `number` | Maximum age for division |
| `minAge` | `number` | Minimum age for division |
| `name` | `string` | Division name |

#### Example: List

```lua
local competitions, err = client:Competition():list()
```


### Leaderboard

Create an instance: `local leaderboard = client:Leaderboard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `number` | Age Reduction score |
| `athleteId` | `string` | Athlete identifier |
| `athleteName` | `string` | Athlete name |
| `country` | `string` | Country code |
| `division` | `string` | Age division |
| `league` | `string` | Competition league |
| `rank` | `number` | Current ranking position |

#### Example: List

```lua
local leaderboards, err = client:Leaderboard():list()
```


### PhenoAge

Create an instance: `local pheno_age = client:PhenoAge(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `number` | Calculated Age Reduction |
| `biomarkers` | `table` | Blood biomarker values required for Pheno Age calculation |
| `calculationMethod` | `string` | Algorithm version used |
| `chronologicalAge` | `number` | Input chronological age |
| `phenoAge` | `number` | Calculated phenotypic biological age |

#### Example: Create

```lua
local pheno_age, err = client:PhenoAge():create({
  biomarkers = {}, -- table
})
```


### RankPreview

Create an instance: `local rank_preview = client:RankPreview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `number` | Calculated Age Reduction |
| `athletesInLeague` | `number` | Total athletes in target league |
| `biologicalAge` | `number` | Calculated biological age |
| `chronologicalAge` | `number` | Actual age in years |
| `division` | `string` | Target division for preview |
| `estimatedRank` | `number` | Estimated ranking position |
| `estimatedUltimateLeagueRank` | `number` | Estimated Ultimate League rank |
| `league` | `string` | Target league for preview |
| `percentile` | `number` | Percentile ranking |

#### Example: Create

```lua
local rank_preview, err = client:RankPreview():create({
  biologicalAge = 1, -- number
  chronologicalAge = 1, -- number
})
```


### Reference

Create an instance: `local reference = client:Reference(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryCode` | `string` | ISO country code |
| `countryName` | `string` | Country name |
| `flagUrl` | `string` | URL to flag image |

#### Example: List

```lua
local references, err = client:Reference():list()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── longevity-competition_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`longevity-competition_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local competition = client:Competition()
competition:list()

-- competition:data_get() now returns the competition data from the last list
-- competition:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
