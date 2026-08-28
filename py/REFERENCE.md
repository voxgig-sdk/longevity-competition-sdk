# LongevityCompetition Python SDK Reference

Complete API reference for the LongevityCompetition Python SDK.


## LongevityCompetitionSDK

### Constructor

```python
from longevitycompetition_sdk import LongevityCompetitionSDK

client = LongevityCompetitionSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LongevityCompetitionSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = LongevityCompetitionSDK.test()
```


### Instance Methods

#### `Athlete(data=None)`

Create a new `AthleteEntity` instance. Pass `None` for no initial data.

#### `BortzAge(data=None)`

Create a new `BortzAgeEntity` instance. Pass `None` for no initial data.

#### `Competition(data=None)`

Create a new `CompetitionEntity` instance. Pass `None` for no initial data.

#### `Leaderboard(data=None)`

Create a new `LeaderboardEntity` instance. Pass `None` for no initial data.

#### `PhenoAge(data=None)`

Create a new `PhenoAgeEntity` instance. Pass `None` for no initial data.

#### `RankPreview(data=None)`

Create a new `RankPreviewEntity` instance. Pass `None` for no initial data.

#### `Reference(data=None)`

Create a new `ReferenceEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AthleteEntity

```python
athlete = client.Athlete()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float` | No | Age Reduction score (chronological age minus biological age) |
| `biologicalAge` | `float` | No | Calculated biological age |
| `chronologicalAge` | `float` | No | Actual age in years |
| `clockType` | `str` | No | Biological aging clock used |
| `country` | `str` | No | Country code |
| `division` | `str` | No | Age division category |
| `effectiveAgeReduction` | `float` | No | Effective Age Reduction used for ranking |
| `generation` | `str` | No | Generation category |
| `id` | `str` | No | Unique athlete identifier |
| `lastUpdated` | `str` | No | Last result submission date |
| `league` | `str` | No | Competition league |
| `name` | `str` | No | Athlete name |
| `profileUrl` | `str` | No | URL to athlete's public profile |
| `rank` | `int` | No | Current ranking position |
| `ultimateLeagueRank` | `int` | No | Rank in Ultimate League (combined Pro and Amateur) |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Athlete().list()
for athlete in results:
    print(athlete)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AthleteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BortzAgeEntity

```python
bortz_age = client.BortzAge()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float` | No | Calculated Age Reduction |
| `biomarkers` | `dict` | Yes | Blood biomarker values required for Bortz Age calculation |
| `bortzAge` | `float` | No | Calculated Bortz biological age |
| `chronologicalAge` | `float` | No | Input chronological age |
| `season` | `str` | No | Competition season |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `ageReduction` | - |
| `biomarkers` | - |
| `bortzAge` | - |
| `chronologicalAge` | Yes |
| `season` | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.BortzAge().create({
    "biomarkers": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BortzAgeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CompetitionEntity

```python
competition = client.Competition()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageRange` | `str` | No | Age range for this division |
| `id` | `str` | No | Division identifier |
| `maxAge` | `int` | No | Maximum age for division |
| `minAge` | `int` | No | Minimum age for division |
| `name` | `str` | No | Division name |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Competition().list()
for competition in results:
    print(competition)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CompetitionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LeaderboardEntity

```python
leaderboard = client.Leaderboard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float` | No | Age Reduction score |
| `athleteId` | `str` | No | Athlete identifier |
| `athleteName` | `str` | No | Athlete name |
| `country` | `str` | No | Country code |
| `division` | `str` | No | Age division |
| `league` | `str` | No | Competition league |
| `rank` | `int` | No | Current ranking position |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Leaderboard().list()
for leaderboard in results:
    print(leaderboard)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LeaderboardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PhenoAgeEntity

```python
pheno_age = client.PhenoAge()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float` | No | Calculated Age Reduction |
| `biomarkers` | `dict` | Yes | Blood biomarker values required for Pheno Age calculation |
| `calculationMethod` | `str` | No | Algorithm version used |
| `chronologicalAge` | `float` | No | Input chronological age |
| `phenoAge` | `float` | No | Calculated phenotypic biological age |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `ageReduction` | - |
| `biomarkers` | - |
| `calculationMethod` | - |
| `chronologicalAge` | Yes |
| `phenoAge` | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.PhenoAge().create({
    "biomarkers": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhenoAgeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RankPreviewEntity

```python
rank_preview = client.RankPreview()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float` | No | Calculated Age Reduction |
| `athletesInLeague` | `int` | No | Total athletes in target league |
| `biologicalAge` | `float` | Yes | Calculated biological age |
| `chronologicalAge` | `float` | Yes | Actual age in years |
| `division` | `str` | No | Target division for preview |
| `estimatedRank` | `int` | No | Estimated ranking position |
| `estimatedUltimateLeagueRank` | `int` | No | Estimated Ultimate League rank |
| `league` | `str` | No | Target league for preview |
| `percentile` | `float` | No | Percentile ranking |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.RankPreview().create({
    "biologicalAge": 1,  # float
    "chronologicalAge": 1,  # float
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RankPreviewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReferenceEntity

```python
reference = client.Reference()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `str` | No | ISO country code |
| `countryName` | `str` | No | Country name |
| `flagUrl` | `str` | No | URL to flag image |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Reference().list()
for reference in results:
    print(reference)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReferenceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = LongevityCompetitionSDK({
    "feature": {
        "test": {"active": True},
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

