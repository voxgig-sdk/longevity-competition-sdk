# LongevityCompetition Ruby SDK



The Ruby SDK for the LongevityCompetition API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Athlete` — with named operations (`list`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/longevity-competition-sdk/releases](https://github.com/voxgig-sdk/longevity-competition-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "LongevityCompetition_sdk"

client = LongevityCompetitionSDK.new
```

### 2. List athlete records

```ruby
begin
  # list returns an Array of Athlete records — iterate directly.
  athletes = client.Athlete.list
  athletes.each do |item|
    puts "#{item["id"]} #{item["age_reduction"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  athletes = client.Athlete.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = LongevityCompetitionSDK.test

# Entity ops return the bare mock record (raises on error).
athlete = client.Athlete.list()
puts athlete
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = LongevityCompetitionSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### LongevityCompetitionSDK

```ruby
require_relative "LongevityCompetition_sdk"
client = LongevityCompetitionSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = LongevityCompetitionSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LongevityCompetitionSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `LongevityCompetitionError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Athlete

| Field | Description |
| --- | --- |
| `age_reduction` |  |
| `biological_age` |  |
| `chronological_age` |  |
| `clock_type` |  |
| `country` |  |
| `division` |  |
| `effective_age_reduction` |  |
| `generation` |  |
| `id` |  |
| `last_updated` |  |
| `league` |  |
| `name` |  |
| `profile_url` |  |
| `rank` |  |
| `ultimate_league_rank` |  |

Operations: List.

API path: `/data/athletes`

#### BortzAge

| Field | Description |
| --- | --- |
| `age_reduction` |  |
| `biomarker` |  |
| `bortz_age` |  |
| `chronological_age` |  |
| `season` |  |

Operations: Create.

API path: `/data/bortz-age`

#### Competition

| Field | Description |
| --- | --- |
| `age_range` |  |
| `id` |  |
| `max_age` |  |
| `min_age` |  |
| `name` |  |

Operations: List.

API path: `/data/divisions`

#### Leaderboard

| Field | Description |
| --- | --- |
| `age_reduction` |  |
| `athlete_id` |  |
| `athlete_name` |  |
| `country` |  |
| `division` |  |
| `league` |  |
| `rank` |  |

Operations: List.

API path: `/data/leaderboard`

#### PhenoAge

| Field | Description |
| --- | --- |
| `age_reduction` |  |
| `biomarker` |  |
| `calculation_method` |  |
| `chronological_age` |  |
| `pheno_age` |  |

Operations: Create.

API path: `/data/pheno-age`

#### RankPreview

| Field | Description |
| --- | --- |
| `age_reduction` |  |
| `athletes_in_league` |  |
| `biological_age` |  |
| `chronological_age` |  |
| `division` |  |
| `estimated_rank` |  |
| `estimated_ultimate_league_rank` |  |
| `league` |  |
| `percentile` |  |

Operations: Create.

API path: `/data/rank-preview`

#### Reference

| Field | Description |
| --- | --- |
| `country_code` |  |
| `country_name` |  |
| `flag_url` |  |

Operations: List.

API path: `/data/flags`



## Entities


### Athlete

Create an instance: `athlete = client.Athlete`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_reduction` | `Float` |  |
| `biological_age` | `Float` |  |
| `chronological_age` | `Float` |  |
| `clock_type` | `String` |  |
| `country` | `String` |  |
| `division` | `String` |  |
| `effective_age_reduction` | `Float` |  |
| `generation` | `String` |  |
| `id` | `String` |  |
| `last_updated` | `String` |  |
| `league` | `String` |  |
| `name` | `String` |  |
| `profile_url` | `String` |  |
| `rank` | `Integer` |  |
| `ultimate_league_rank` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of Athlete records (raises on error).
athletes = client.Athlete.list
```


### BortzAge

Create an instance: `bortz_age = client.BortzAge`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_reduction` | `Float` |  |
| `biomarker` | `Hash` |  |
| `bortz_age` | `Float` |  |
| `chronological_age` | `Float` |  |
| `season` | `String` |  |

#### Example: Create

```ruby
bortz_age = client.BortzAge.create({
  "biomarker" => {}, # Hash
})
```


### Competition

Create an instance: `competition = client.Competition`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_range` | `String` |  |
| `id` | `String` |  |
| `max_age` | `Integer` |  |
| `min_age` | `Integer` |  |
| `name` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Competition records (raises on error).
competitions = client.Competition.list
```


### Leaderboard

Create an instance: `leaderboard = client.Leaderboard`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_reduction` | `Float` |  |
| `athlete_id` | `String` |  |
| `athlete_name` | `String` |  |
| `country` | `String` |  |
| `division` | `String` |  |
| `league` | `String` |  |
| `rank` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of Leaderboard records (raises on error).
leaderboards = client.Leaderboard.list
```


### PhenoAge

Create an instance: `pheno_age = client.PhenoAge`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_reduction` | `Float` |  |
| `biomarker` | `Hash` |  |
| `calculation_method` | `String` |  |
| `chronological_age` | `Float` |  |
| `pheno_age` | `Float` |  |

#### Example: Create

```ruby
pheno_age = client.PhenoAge.create({
  "biomarker" => {}, # Hash
})
```


### RankPreview

Create an instance: `rank_preview = client.RankPreview`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_reduction` | `Float` |  |
| `athletes_in_league` | `Integer` |  |
| `biological_age` | `Float` |  |
| `chronological_age` | `Float` |  |
| `division` | `String` |  |
| `estimated_rank` | `Integer` |  |
| `estimated_ultimate_league_rank` | `Integer` |  |
| `league` | `String` |  |
| `percentile` | `Float` |  |

#### Example: Create

```ruby
rank_preview = client.RankPreview.create({
  "biological_age" => 1, # Float
  "chronological_age" => 1, # Float
})
```


### Reference

Create an instance: `reference = client.Reference`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | `String` |  |
| `country_name` | `String` |  |
| `flag_url` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Reference records (raises on error).
references = client.Reference.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── LongevityCompetition_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`LongevityCompetition_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
athlete = client.Athlete
athlete.list()

# athlete.data_get now returns the athlete data from the last list
# athlete.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
