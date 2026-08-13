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
| `ageReduction` | `float` | No |  |
| `biologicalAge` | `float` | No |  |
| `chronologicalAge` | `float` | No |  |
| `clockType` | `string` | No |  |
| `country` | `string` | No |  |
| `division` | `string` | No |  |
| `effectiveAgeReduction` | `float` | No |  |
| `generation` | `string` | No |  |
| `id` | `string` | No |  |
| `lastUpdated` | `string` | No |  |
| `league` | `string` | No |  |
| `name` | `string` | No |  |
| `profileUrl` | `string` | No |  |
| `rank` | `int` | No |  |
| `ultimateLeagueRank` | `int` | No |  |

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
| `ageReduction` | `float` | No |  |
| `biomarkers` | `array` | Yes |  |
| `bortzAge` | `float` | No |  |
| `chronologicalAge` | `float` | No |  |
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
| `ageRange` | `string` | No |  |
| `id` | `string` | No |  |
| `maxAge` | `int` | No |  |
| `minAge` | `int` | No |  |
| `name` | `string` | No |  |

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
| `ageReduction` | `float` | No |  |
| `athleteId` | `string` | No |  |
| `athleteName` | `string` | No |  |
| `country` | `string` | No |  |
| `division` | `string` | No |  |
| `league` | `string` | No |  |
| `rank` | `int` | No |  |

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
| `ageReduction` | `float` | No |  |
| `biomarkers` | `array` | Yes |  |
| `calculationMethod` | `string` | No |  |
| `chronologicalAge` | `float` | No |  |
| `phenoAge` | `float` | No |  |

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
| `ageReduction` | `float` | No |  |
| `athletesInLeague` | `int` | No |  |
| `biologicalAge` | `float` | Yes |  |
| `chronologicalAge` | `float` | Yes |  |
| `division` | `string` | No |  |
| `estimatedRank` | `int` | No |  |
| `estimatedUltimateLeagueRank` | `int` | No |  |
| `league` | `string` | No |  |
| `percentile` | `float` | No |  |

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
| `countryCode` | `string` | No |  |
| `countryName` | `string` | No |  |
| `flagUrl` | `string` | No |  |

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

