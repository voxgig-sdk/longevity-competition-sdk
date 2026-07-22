# LongevityCompetition TypeScript SDK Reference

Complete API reference for the LongevityCompetition TypeScript SDK.


## LongevityCompetitionSDK

### Constructor

```ts
new LongevityCompetitionSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LongevityCompetitionSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = LongevityCompetitionSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `LongevityCompetitionSDK` instance in test mode.


### Instance Methods

#### `Athlete(data?: object)`

Create a new `Athlete` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AthleteEntity` instance.

#### `BortzAge(data?: object)`

Create a new `BortzAge` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BortzAgeEntity` instance.

#### `Competition(data?: object)`

Create a new `Competition` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CompetitionEntity` instance.

#### `Leaderboard(data?: object)`

Create a new `Leaderboard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LeaderboardEntity` instance.

#### `PhenoAge(data?: object)`

Create a new `PhenoAge` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhenoAgeEntity` instance.

#### `RankPreview(data?: object)`

Create a new `RankPreview` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RankPreviewEntity` instance.

#### `Reference(data?: object)`

Create a new `Reference` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReferenceEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `LongevityCompetitionSDK.test()`.

**Returns:** `LongevityCompetitionSDK` instance in test mode.


---

## AthleteEntity

```ts
const athlete = client.Athlete()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Athlete().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AthleteEntity` instance with the same client and
options.

#### `client()`

Return the parent `LongevityCompetitionSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BortzAgeEntity

```ts
const bortz_age = client.BortzAge()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age_reduction` | `number` | No |  |
| `biomarker` | `Record<string, any>` | Yes |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.BortzAge().create({
  biomarker: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BortzAgeEntity` instance with the same client and
options.

#### `client()`

Return the parent `LongevityCompetitionSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CompetitionEntity

```ts
const competition = client.Competition()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Competition().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CompetitionEntity` instance with the same client and
options.

#### `client()`

Return the parent `LongevityCompetitionSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LeaderboardEntity

```ts
const leaderboard = client.Leaderboard()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Leaderboard().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LeaderboardEntity` instance with the same client and
options.

#### `client()`

Return the parent `LongevityCompetitionSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhenoAgeEntity

```ts
const pheno_age = client.PhenoAge()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age_reduction` | `number` | No |  |
| `biomarker` | `Record<string, any>` | Yes |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PhenoAge().create({
  biomarker: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhenoAgeEntity` instance with the same client and
options.

#### `client()`

Return the parent `LongevityCompetitionSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RankPreviewEntity

```ts
const rank_preview = client.RankPreview()
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.RankPreview().create({
  biological_age: 1,
  chronological_age: 1,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RankPreviewEntity` instance with the same client and
options.

#### `client()`

Return the parent `LongevityCompetitionSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReferenceEntity

```ts
const reference = client.Reference()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `string` | No |  |
| `country_name` | `string` | No |  |
| `flag_url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Reference().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReferenceEntity` instance with the same client and
options.

#### `client()`

Return the parent `LongevityCompetitionSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new LongevityCompetitionSDK({
  feature: {
    test: { active: true },
  }
})
```

