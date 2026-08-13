# LongevityCompetition PHP SDK



The PHP SDK for the LongevityCompetition API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Athlete()` — with named operations (`list`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/longevity-competition-sdk/releases](https://github.com/voxgig-sdk/longevity-competition-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'longevitycompetition_sdk.php';

$client = new LongevityCompetitionSDK();
```

### 2. List athlete records

```php
try {
    // list() returns an array of Athlete records — iterate directly.
    $athletes = $client->Athlete()->list();
    foreach ($athletes as $item) {
        echo $item["id"] . " " . $item["ageReduction"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $competitions = $client->Competition()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = LongevityCompetitionSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$competition = $client->Competition()->list();
print_r($competition);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new LongevityCompetitionSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
LONGEVITY_COMPETITION_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### LongevityCompetitionSDK

```php
require_once 'longevitycompetition_sdk.php';
$client = new LongevityCompetitionSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = LongevityCompetitionSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### LongevityCompetitionSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Athlete` | `($data): AthleteEntity` | Create an Athlete entity instance. |
| `BortzAge` | `($data): BortzAgeEntity` | Create a BortzAge entity instance. |
| `Competition` | `($data): CompetitionEntity` | Create a Competition entity instance. |
| `Leaderboard` | `($data): LeaderboardEntity` | Create a Leaderboard entity instance. |
| `PhenoAge` | `($data): PhenoAgeEntity` | Create a PhenoAge entity instance. |
| `RankPreview` | `($data): RankPreviewEntity` | Create a RankPreview entity instance. |
| `Reference` | `($data): ReferenceEntity` | Create a Reference entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Athlete

| Field | Description |
| --- | --- |
| `ageReduction` |  |
| `biologicalAge` |  |
| `chronologicalAge` |  |
| `clockType` |  |
| `country` |  |
| `division` |  |
| `effectiveAgeReduction` |  |
| `generation` |  |
| `id` |  |
| `lastUpdated` |  |
| `league` |  |
| `name` |  |
| `profileUrl` |  |
| `rank` |  |
| `ultimateLeagueRank` |  |

Operations: List.

API path: `/data/athletes`

#### BortzAge

| Field | Description |
| --- | --- |
| `ageReduction` |  |
| `biomarkers` |  |
| `bortzAge` |  |
| `chronologicalAge` |  |
| `season` |  |

Operations: Create.

API path: `/data/bortz-age`

#### Competition

| Field | Description |
| --- | --- |
| `ageRange` |  |
| `id` |  |
| `maxAge` |  |
| `minAge` |  |
| `name` |  |

Operations: List.

API path: `/data/divisions`

#### Leaderboard

| Field | Description |
| --- | --- |
| `ageReduction` |  |
| `athleteId` |  |
| `athleteName` |  |
| `country` |  |
| `division` |  |
| `league` |  |
| `rank` |  |

Operations: List.

API path: `/data/leaderboard`

#### PhenoAge

| Field | Description |
| --- | --- |
| `ageReduction` |  |
| `biomarkers` |  |
| `calculationMethod` |  |
| `chronologicalAge` |  |
| `phenoAge` |  |

Operations: Create.

API path: `/data/pheno-age`

#### RankPreview

| Field | Description |
| --- | --- |
| `ageReduction` |  |
| `athletesInLeague` |  |
| `biologicalAge` |  |
| `chronologicalAge` |  |
| `division` |  |
| `estimatedRank` |  |
| `estimatedUltimateLeagueRank` |  |
| `league` |  |
| `percentile` |  |

Operations: Create.

API path: `/data/rank-preview`

#### Reference

| Field | Description |
| --- | --- |
| `countryCode` |  |
| `countryName` |  |
| `flagUrl` |  |

Operations: List.

API path: `/data/flags`



## Entities


### Athlete

Create an instance: `$athlete = $client->Athlete();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float` |  |
| `biologicalAge` | `float` |  |
| `chronologicalAge` | `float` |  |
| `clockType` | `string` |  |
| `country` | `string` |  |
| `division` | `string` |  |
| `effectiveAgeReduction` | `float` |  |
| `generation` | `string` |  |
| `id` | `string` |  |
| `lastUpdated` | `string` |  |
| `league` | `string` |  |
| `name` | `string` |  |
| `profileUrl` | `string` |  |
| `rank` | `int` |  |
| `ultimateLeagueRank` | `int` |  |

#### Example: List

```php
// list() returns an array of Athlete records (throws on error).
$athletes = $client->Athlete()->list();
```


### BortzAge

Create an instance: `$bortz_age = $client->BortzAge();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float` |  |
| `biomarkers` | `array` |  |
| `bortzAge` | `float` |  |
| `chronologicalAge` | `float` |  |
| `season` | `string` |  |

#### Example: Create

```php
$bortz_age = $client->BortzAge()->create([
    "biomarkers" => null, // array
]);
```


### Competition

Create an instance: `$competition = $client->Competition();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageRange` | `string` |  |
| `id` | `string` |  |
| `maxAge` | `int` |  |
| `minAge` | `int` |  |
| `name` | `string` |  |

#### Example: List

```php
// list() returns an array of Competition records (throws on error).
$competitions = $client->Competition()->list();
```


### Leaderboard

Create an instance: `$leaderboard = $client->Leaderboard();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float` |  |
| `athleteId` | `string` |  |
| `athleteName` | `string` |  |
| `country` | `string` |  |
| `division` | `string` |  |
| `league` | `string` |  |
| `rank` | `int` |  |

#### Example: List

```php
// list() returns an array of Leaderboard records (throws on error).
$leaderboards = $client->Leaderboard()->list();
```


### PhenoAge

Create an instance: `$pheno_age = $client->PhenoAge();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float` |  |
| `biomarkers` | `array` |  |
| `calculationMethod` | `string` |  |
| `chronologicalAge` | `float` |  |
| `phenoAge` | `float` |  |

#### Example: Create

```php
$pheno_age = $client->PhenoAge()->create([
    "biomarkers" => null, // array
]);
```


### RankPreview

Create an instance: `$rank_preview = $client->RankPreview();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ageReduction` | `float` |  |
| `athletesInLeague` | `int` |  |
| `biologicalAge` | `float` |  |
| `chronologicalAge` | `float` |  |
| `division` | `string` |  |
| `estimatedRank` | `int` |  |
| `estimatedUltimateLeagueRank` | `int` |  |
| `league` | `string` |  |
| `percentile` | `float` |  |

#### Example: Create

```php
$rank_preview = $client->RankPreview()->create([
    "biologicalAge" => null, // float
    "chronologicalAge" => null, // float
]);
```


### Reference

Create an instance: `$reference = $client->Reference();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryCode` | `string` |  |
| `countryName` | `string` |  |
| `flagUrl` | `string` |  |

#### Example: List

```php
// list() returns an array of Reference records (throws on error).
$references = $client->Reference()->list();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── longevitycompetition_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`longevitycompetition_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$competition = $client->Competition();
$competition->list();

// $competition->data_get() now returns the competition data from the last list
// $competition->match_get() returns the last match criteria
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
