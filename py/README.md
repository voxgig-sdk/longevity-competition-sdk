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
    athletes = client.Athlete().list()
    print(athletes)
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

# Entity ops return the bare record and raise on error.
athlete = client.Athlete().list()
# athlete contains the mock response record
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

Entity operations return the bare result data (a `dict` for single-entity
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

Create an instance: `athlete = client.Athlete()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age_reduction` | `float` |  |
| `biological_age` | `float` |  |
| `chronological_age` | `float` |  |
| `clock_type` | `str` |  |
| `country` | `str` |  |
| `division` | `str` |  |
| `effective_age_reduction` | `float` |  |
| `generation` | `str` |  |
| `id` | `str` |  |
| `last_updated` | `str` |  |
| `league` | `str` |  |
| `name` | `str` |  |
| `profile_url` | `str` |  |
| `rank` | `int` |  |
| `ultimate_league_rank` | `int` |  |

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
| `age_reduction` | `float` |  |
| `biomarker` | `dict` |  |
| `bortz_age` | `float` |  |
| `chronological_age` | `float` |  |
| `season` | `str` |  |

#### Example: Create

```python
bortz_age = client.BortzAge().create({
    "biomarker": {},  # dict
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
| `age_range` | `str` |  |
| `id` | `str` |  |
| `max_age` | `int` |  |
| `min_age` | `int` |  |
| `name` | `str` |  |

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
| `age_reduction` | `float` |  |
| `athlete_id` | `str` |  |
| `athlete_name` | `str` |  |
| `country` | `str` |  |
| `division` | `str` |  |
| `league` | `str` |  |
| `rank` | `int` |  |

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
| `age_reduction` | `float` |  |
| `biomarker` | `dict` |  |
| `calculation_method` | `str` |  |
| `chronological_age` | `float` |  |
| `pheno_age` | `float` |  |

#### Example: Create

```python
pheno_age = client.PhenoAge().create({
    "biomarker": {},  # dict
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
| `age_reduction` | `float` |  |
| `athletes_in_league` | `int` |  |
| `biological_age` | `float` |  |
| `chronological_age` | `float` |  |
| `division` | `str` |  |
| `estimated_rank` | `int` |  |
| `estimated_ultimate_league_rank` | `int` |  |
| `league` | `str` |  |
| `percentile` | `float` |  |

#### Example: Create

```python
rank_preview = client.RankPreview().create({
    "biological_age": 1,  # float
    "chronological_age": 1,  # float
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
| `country_code` | `str` |  |
| `country_name` | `str` |  |
| `flag_url` | `str` |  |

#### Example: List

```python
references = client.Reference().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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
athlete = client.Athlete()
athlete.list()

# athlete.data_get() now returns the athlete data from the last list
# athlete.match_get() returns the last match criteria
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
