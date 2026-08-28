# LongevityCompetition PHP SDK Reference

Complete API reference for the LongevityCompetition PHP SDK.


## LongevityCompetitionSDK

### Constructor

```php
require_once __DIR__ . '/longevitycompetition_sdk.php';

$client = new LongevityCompetitionSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LongevityCompetitionSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = LongevityCompetitionSDK::test();
```


### Instance Methods

#### `Athlete($data = null)`

Create a new `AthleteEntity` instance. Pass `null` for no initial data.

#### `BortzAge($data = null)`

Create a new `BortzAgeEntity` instance. Pass `null` for no initial data.

#### `Competition($data = null)`

Create a new `CompetitionEntity` instance. Pass `null` for no initial data.

#### `Leaderboard($data = null)`

Create a new `LeaderboardEntity` instance. Pass `null` for no initial data.

#### `PhenoAge($data = null)`

Create a new `PhenoAgeEntity` instance. Pass `null` for no initial data.

#### `RankPreview($data = null)`

Create a new `RankPreviewEntity` instance. Pass `null` for no initial data.

#### `Reference($data = null)`

Create a new `ReferenceEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): LongevityCompetitionUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AthleteEntity

```php
$athlete = $client->Athlete();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float` | No | Age Reduction score (chronological age minus biological age) |
| `biologicalAge` | `float` | No | Calculated biological age |
| `chronologicalAge` | `float` | No | Actual age in years |
| `clockType` | `string` | No | Biological aging clock used |
| `country` | `string` | No | Country code |
| `division` | `string` | No | Age division category |
| `effectiveAgeReduction` | `float` | No | Effective Age Reduction used for ranking |
| `generation` | `string` | No | Generation category |
| `id` | `string` | No | Unique athlete identifier |
| `lastUpdated` | `string` | No | Last result submission date |
| `league` | `string` | No | Competition league |
| `name` | `string` | No | Athlete name |
| `profileUrl` | `string` | No | URL to athlete's public profile |
| `rank` | `int` | No | Current ranking position |
| `ultimateLeagueRank` | `int` | No | Rank in Ultimate League (combined Pro and Amateur) |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Athlete()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AthleteEntity`

Create a new `AthleteEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BortzAgeEntity

```php
$bortz_age = $client->BortzAge();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float` | No | Calculated Age Reduction |
| `biomarkers` | `array` | Yes | Blood biomarker values required for Bortz Age calculation |
| `bortzAge` | `float` | No | Calculated Bortz biological age |
| `chronologicalAge` | `float` | No | Input chronological age |
| `season` | `string` | No | Competition season |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `ageReduction` | - |
| `biomarkers` | - |
| `bortzAge` | - |
| `chronologicalAge` | Yes |
| `season` | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->BortzAge()->create([
  "biomarkers" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BortzAgeEntity`

Create a new `BortzAgeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CompetitionEntity

```php
$competition = $client->Competition();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageRange` | `string` | No | Age range for this division |
| `id` | `string` | No | Division identifier |
| `maxAge` | `int` | No | Maximum age for division |
| `minAge` | `int` | No | Minimum age for division |
| `name` | `string` | No | Division name |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Competition()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CompetitionEntity`

Create a new `CompetitionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LeaderboardEntity

```php
$leaderboard = $client->Leaderboard();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float` | No | Age Reduction score |
| `athleteId` | `string` | No | Athlete identifier |
| `athleteName` | `string` | No | Athlete name |
| `country` | `string` | No | Country code |
| `division` | `string` | No | Age division |
| `league` | `string` | No | Competition league |
| `rank` | `int` | No | Current ranking position |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Leaderboard()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LeaderboardEntity`

Create a new `LeaderboardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PhenoAgeEntity

```php
$pheno_age = $client->PhenoAge();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float` | No | Calculated Age Reduction |
| `biomarkers` | `array` | Yes | Blood biomarker values required for Pheno Age calculation |
| `calculationMethod` | `string` | No | Algorithm version used |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->PhenoAge()->create([
  "biomarkers" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PhenoAgeEntity`

Create a new `PhenoAgeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RankPreviewEntity

```php
$rank_preview = $client->RankPreview();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ageReduction` | `float` | No | Calculated Age Reduction |
| `athletesInLeague` | `int` | No | Total athletes in target league |
| `biologicalAge` | `float` | Yes | Calculated biological age |
| `chronologicalAge` | `float` | Yes | Actual age in years |
| `division` | `string` | No | Target division for preview |
| `estimatedRank` | `int` | No | Estimated ranking position |
| `estimatedUltimateLeagueRank` | `int` | No | Estimated Ultimate League rank |
| `league` | `string` | No | Target league for preview |
| `percentile` | `float` | No | Percentile ranking |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->RankPreview()->create([
  "biologicalAge" => null, // float
  "chronologicalAge" => null, // float
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RankPreviewEntity`

Create a new `RankPreviewEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReferenceEntity

```php
$reference = $client->Reference();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `string` | No | ISO country code |
| `countryName` | `string` | No | Country name |
| `flagUrl` | `string` | No | URL to flag image |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Reference()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReferenceEntity`

Create a new `ReferenceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new LongevityCompetitionSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
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

