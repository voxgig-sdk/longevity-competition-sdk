# LongevityCompetition TypeScript SDK



The TypeScript SDK for the LongevityCompetition API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Athlete()` — each with a small set of operations (`list`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/longevity-competition-sdk/releases](https://github.com/voxgig-sdk/longevity-competition-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { LongevityCompetitionSDK } from '@voxgig-sdk/longevity-competition-sdk'

const client = new LongevityCompetitionSDK()
```

### 2. List athlete records

`list()` resolves to an array of Athlete ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const athletes = await client.Athlete().list()

for (const athlete of athletes) {
  console.log(athlete)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const competitions = await client.Competition().list()
  console.log(competitions)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = LongevityCompetitionSDK.test()

const competition = await client.Competition().list()
// competition is the entity, populated with mock response data
// — call competition.data() for the record itself
console.log(competition)
```

You can also use the instance method:

```ts
const client = new LongevityCompetitionSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Competition()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new LongevityCompetitionSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LONGEVITY_COMPETITION_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### LongevityCompetitionSDK

#### Constructor

```ts
new LongevityCompetitionSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Athlete(data?)` | `AthleteEntity` | Create an Athlete entity instance. |
| `BortzAge(data?)` | `BortzAgeEntity` | Create a BortzAge entity instance. |
| `Competition(data?)` | `CompetitionEntity` | Create a Competition entity instance. |
| `Leaderboard(data?)` | `LeaderboardEntity` | Create a Leaderboard entity instance. |
| `PhenoAge(data?)` | `PhenoAgeEntity` | Create a PhenoAge entity instance. |
| `RankPreview(data?)` | `RankPreviewEntity` | Create a RankPreview entity instance. |
| `Reference(data?)` | `ReferenceEntity` | Create a Reference entity instance. |
| `tester(testopts?, sdkopts?)` | `LongevityCompetitionSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `LongevityCompetitionSDK.test(testopts?, sdkopts?)` | `LongevityCompetitionSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): LongevityCompetitionSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `create` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list.

API path: `/data/athletes`

#### BortzAge

| Field | Description |
| --- | --- |
| `ageReduction` | Calculated Age Reduction |
| `biomarkers` | Blood biomarker values required for Bortz Age calculation |
| `bortzAge` | Calculated Bortz biological age |
| `chronologicalAge` | Input chronological age |
| `season` | Competition season |

Operations: create.

API path: `/data/bortz-age`

#### Competition

| Field | Description |
| --- | --- |
| `ageRange` | Age range for this division |
| `id` | Division identifier |
| `maxAge` | Maximum age for division |
| `minAge` | Minimum age for division |
| `name` | Division name |

Operations: list.

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

Operations: list.

API path: `/data/leaderboard`

#### PhenoAge

| Field | Description |
| --- | --- |
| `ageReduction` | Calculated Age Reduction |
| `biomarkers` | Blood biomarker values required for Pheno Age calculation |
| `calculationMethod` | Algorithm version used |
| `chronologicalAge` | Input chronological age |
| `phenoAge` | Calculated phenotypic biological age |

Operations: create.

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

Operations: create.

API path: `/data/rank-preview`

#### Reference

| Field | Description |
| --- | --- |
| `countryCode` | ISO country code |
| `countryName` | Country name |
| `flagUrl` | URL to flag image |

Operations: list.

API path: `/data/flags`



## Entities


### Athlete

Create an instance: `const athlete = client.Athlete()`

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

```ts
const athletes = await client.Athlete().list()
```


### BortzAge

Create an instance: `const bortz_age = client.BortzAge()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `number` | Calculated Age Reduction |
| `biomarkers` | `Record<string, any>` | Blood biomarker values required for Bortz Age calculation |
| `bortzAge` | `number` | Calculated Bortz biological age |
| `chronologicalAge` | `number` | Input chronological age |
| `season` | `string` | Competition season |

#### Example: Create

```ts
const bortz_age = await client.BortzAge().create({
  biomarkers: {},
})
```


### Competition

Create an instance: `const competition = client.Competition()`

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

```ts
const competitions = await client.Competition().list()
```


### Leaderboard

Create an instance: `const leaderboard = client.Leaderboard()`

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

```ts
const leaderboards = await client.Leaderboard().list()
```


### PhenoAge

Create an instance: `const pheno_age = client.PhenoAge()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `number` | Calculated Age Reduction |
| `biomarkers` | `Record<string, any>` | Blood biomarker values required for Pheno Age calculation |
| `calculationMethod` | `string` | Algorithm version used |
| `chronologicalAge` | `number` | Input chronological age |
| `phenoAge` | `number` | Calculated phenotypic biological age |

#### Example: Create

```ts
const pheno_age = await client.PhenoAge().create({
  biomarkers: {},
})
```


### RankPreview

Create an instance: `const rank_preview = client.RankPreview()`

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

```ts
const rank_preview = await client.RankPreview().create({
  biologicalAge: 1,
  chronologicalAge: 1,
})
```


### Reference

Create an instance: `const reference = client.Reference()`

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

```ts
const references = await client.Reference().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
longevity-competition/
├── src/
│   ├── LongevityCompetitionSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { LongevityCompetitionSDK } from '@voxgig-sdk/longevity-competition-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const competition = client.Competition()
await competition.list()

// competition.data() now returns the competition data from the last `list`
// competition.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
