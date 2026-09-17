# LongevityCompetition Python SDK



The Python SDK for the LongevityCompetition API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Athlete()` — each
carrying a small, uniform set of operations (`list`, `create`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/longevity-competition-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from longevitycompetition_sdk import LongevityCompetitionSDK

client = LongevityCompetitionSDK()
```

### 2. List athlete records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    athletes = client.Athlete().list()
    for athlete in athletes:
        print(athlete)
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    competitions = client.Competition().list()
    print(competitions)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = LongevityCompetitionSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
competition = client.Competition().list()
# competition contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = LongevityCompetitionSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### LongevityCompetitionSDK

```python
from longevitycompetition_sdk import LongevityCompetitionSDK

client = LongevityCompetitionSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = LongevityCompetitionSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### LongevityCompetitionSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `athlete = client.Athlete()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float` | Age Reduction score (chronological age minus biological age) |
| `biologicalAge` | `float` | Calculated biological age |
| `chronologicalAge` | `float` | Actual age in years |
| `clockType` | `str` | Biological aging clock used |
| `country` | `str` | Country code |
| `division` | `str` | Age division category |
| `effectiveAgeReduction` | `float` | Effective Age Reduction used for ranking |
| `generation` | `str` | Generation category |
| `id` | `str` | Unique athlete identifier |
| `lastUpdated` | `str` | Last result submission date |
| `league` | `str` | Competition league |
| `name` | `str` | Athlete name |
| `profileUrl` | `str` | URL to athlete's public profile |
| `rank` | `int` | Current ranking position |
| `ultimateLeagueRank` | `int` | Rank in Ultimate League (combined Pro and Amateur) |

#### Example: List

```python
athletes = client.Athlete().list()
```


### BortzAge

Create an instance: `bortz_age = client.BortzAge()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float` | Calculated Age Reduction |
| `biomarkers` | `dict` | Blood biomarker values required for Bortz Age calculation |
| `bortzAge` | `float` | Calculated Bortz biological age |
| `chronologicalAge` | `float` | Input chronological age |
| `season` | `str` | Competition season |

#### Example: Create

```python
bortz_age = client.BortzAge().create({
    "biomarkers": {},  # dict
})
```


### Competition

Create an instance: `competition = client.Competition()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageRange` | `str` | Age range for this division |
| `id` | `str` | Division identifier |
| `maxAge` | `int` | Maximum age for division |
| `minAge` | `int` | Minimum age for division |
| `name` | `str` | Division name |

#### Example: List

```python
competitions = client.Competition().list()
```


### Leaderboard

Create an instance: `leaderboard = client.Leaderboard()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float` | Age Reduction score |
| `athleteId` | `str` | Athlete identifier |
| `athleteName` | `str` | Athlete name |
| `country` | `str` | Country code |
| `division` | `str` | Age division |
| `league` | `str` | Competition league |
| `rank` | `int` | Current ranking position |

#### Example: List

```python
leaderboards = client.Leaderboard().list()
```


### PhenoAge

Create an instance: `pheno_age = client.PhenoAge()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float` | Calculated Age Reduction |
| `biomarkers` | `dict` | Blood biomarker values required for Pheno Age calculation |
| `calculationMethod` | `str` | Algorithm version used |
| `chronologicalAge` | `float` | Input chronological age |
| `phenoAge` | `float` | Calculated phenotypic biological age |

#### Example: Create

```python
pheno_age = client.PhenoAge().create({
    "biomarkers": {},  # dict
})
```


### RankPreview

Create an instance: `rank_preview = client.RankPreview()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float` | Calculated Age Reduction |
| `athletesInLeague` | `int` | Total athletes in target league |
| `biologicalAge` | `float` | Calculated biological age |
| `chronologicalAge` | `float` | Actual age in years |
| `division` | `str` | Target division for preview |
| `estimatedRank` | `int` | Estimated ranking position |
| `estimatedUltimateLeagueRank` | `int` | Estimated Ultimate League rank |
| `league` | `str` | Target league for preview |
| `percentile` | `float` | Percentile ranking |

#### Example: Create

```python
rank_preview = client.RankPreview().create({
    "biologicalAge": 1,  # float
    "chronologicalAge": 1,  # float
})
```


### Reference

Create an instance: `reference = client.Reference()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryCode` | `str` | ISO country code |
| `countryName` | `str` | Country name |
| `flagUrl` | `str` | URL to flag image |

#### Example: List

```python
references = client.Reference().list()
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── longevitycompetition_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`longevitycompetition_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
competition = client.Competition()
competition.list()

# competition.data_get() now returns the competition data from the last list
# competition.match_get() returns the last match criteria
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
