# Longevity Competition API

The Longevity Competition API provides access to real-time information about participants, rankings, events, and historical data related to the Longevity World Cup. It enables users to retrieve public rankings, athlete profiles, and detailed competition rules, facilitating engagement with the longevity-focused sporting community.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 7 entities and 7 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Athlete

Results: Successful response with athlete data.

SDK operations: `list`.

Key fields to recognise:

- `ageReduction`: Age Reduction score (chronological age minus biological age)
- `biologicalAge`: Calculated biological age
- `chronologicalAge`: Actual age in years
- `clockType`: Biological aging clock used
- `country`: Country code

### BortzAge

Results: Successful Bortz Age calculation.

SDK operations: `create`.

Key fields to recognise:

- `ageReduction`: Calculated Age Reduction
- `biomarkers`: Blood biomarker values required for Bortz Age calculation
- `bortzAge`: Calculated Bortz biological age
- `chronologicalAge`: Input chronological age
- `season`: Competition season

### Competition

Results: Successful response with division data.

SDK operations: `list`.

Key fields to recognise:

- `ageRange`: Age range for this division
- `id`: Division identifier
- `maxAge`: Maximum age for division
- `minAge`: Minimum age for division
- `name`: Division name

### Leaderboard

Results: Successful response with leaderboard data.

SDK operations: `list`.

Key fields to recognise:

- `ageReduction`: Age Reduction score
- `athleteId`: Athlete identifier
- `athleteName`: Athlete name
- `country`: Country code
- `division`: Age division

### PhenoAge

Results: Successful Pheno Age calculation.

SDK operations: `create`.

Key fields to recognise:

- `ageReduction`: Calculated Age Reduction
- `biomarkers`: Blood biomarker values required for Pheno Age calculation
- `calculationMethod`: Algorithm version used
- `chronologicalAge`: Input chronological age
- `phenoAge`: Calculated phenotypic biological age

### RankPreview

Results: Successful rank preview.

SDK operations: `create`.

Key fields to recognise:

- `ageReduction`: Calculated Age Reduction
- `athletesInLeague`: Total athletes in target league
- `biologicalAge`: Calculated biological age
- `chronologicalAge`: Actual age in years
- `division`: Target division for preview

### Reference

Results: Successful response with flag data.

SDK operations: `list`.

Key fields to recognise:

- `countryCode`: ISO country code
- `countryName`: Country name
- `flagUrl`: URL to flag image

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Athlete | `list` | `GET /data/athletes` | See reference |
| BortzAge | `create` | `POST /data/bortz-age` | See reference |
| Competition | `list` | `GET /data/divisions` | See reference |
| Leaderboard | `list` | `GET /data/leaderboard` | See reference |
| PhenoAge | `create` | `POST /data/pheno-age` | See reference |
| RankPreview | `create` | `POST /data/rank-preview` | See reference |
| Reference | `list` | `GET /data/flags` | See reference |

## Connect to the API

- Production API server: `https://longevityworldcup.com/api`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `longevity-competition_list`: List records for an entity. Supported entities: `athlete`, `competition`, `leaderboard`, `reference`.
- `longevity-competition_load`: Load one record for an entity. No active entity supports this operation.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

