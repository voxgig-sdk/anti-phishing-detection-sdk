# AntiPhishingDetection SDK

Check whether a domain or URL is known phishing, malware, or safe via the community-run FishFish threat database

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Anti-Phishing Detection

[FishFish](https://fishfish.gg/) is an anti-phishing service that focuses on quick, automated detection of malicious resources before they can be used at scale. The community maintains a shared database of domains and URLs categorised as `safe`, `phishing`, or `malware`, exposed through the API at `https://api.fishfish.gg`.

What you can do with the API:

- Look up a single domain via `GET /v1/domains/{domain}` to retrieve its current category.
- List tracked domains via `GET /v1/domains` for bulk consumption.
- Equivalent `/v1/urls` endpoints exist for full URL classifications.
- Subscribe to live database changes over a WebSocket stream at `wss://api.fishfish.gg/v1/stream` instead of polling.

Read endpoints are publicly accessible with CORS enabled. Submitting, editing, or deleting entries requires an API token in the `Authorization` header; session tokens issued via `/users/@me/tokens` are valid for one hour and must be refreshed from a long-lived main token.

## Try it

**TypeScript**
```bash
npm install anti-phishing-detection
```

**Python**
```bash
pip install anti-phishing-detection-sdk
```

**PHP**
```bash
composer require voxgig/anti-phishing-detection-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/anti-phishing-detection-sdk/go
```

**Ruby**
```bash
gem install anti-phishing-detection-sdk
```

**Lua**
```bash
luarocks install anti-phishing-detection-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { AntiPhishingDetectionSDK } from 'anti-phishing-detection'

const client = new AntiPhishingDetectionSDK({})

// List all detections
const detections = await client.Detection().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o anti-phishing-detection-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "anti-phishing-detection": {
      "command": "/abs/path/to/anti-phishing-detection-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Detection** | Phishing and malware classifications for domains and URLs, served from the FishFish threat database under `/v1/domains/{domain}` and `/v1/urls/{url}`, with a `wss://api.fishfish.gg/v1/stream` feed for live updates. | `/check` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from antiphishingdetection_sdk import AntiPhishingDetectionSDK

client = AntiPhishingDetectionSDK({})

# List all detections
detections, err = client.Detection(None).list(None, None)
```

### PHP

```php
<?php
require_once 'antiphishingdetection_sdk.php';

$client = new AntiPhishingDetectionSDK([]);

// List all detections
[$detections, $err] = $client->Detection(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/anti-phishing-detection-sdk/go"

client := sdk.NewAntiPhishingDetectionSDK(map[string]any{})

// List all detections
detections, err := client.Detection(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "AntiPhishingDetection_sdk"

client = AntiPhishingDetectionSDK.new({})

# List all detections
detections, err = client.Detection(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("anti-phishing-detection_sdk")

local client = sdk.new({})

-- List all detections
local detections, err = client:Detection(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = AntiPhishingDetectionSDK.test()
const result = await client.Detection().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = AntiPhishingDetectionSDK.test(None, None)
result, err = client.Detection(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = AntiPhishingDetectionSDK::test(null, null);
[$result, $err] = $client->Detection(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Detection(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = AntiPhishingDetectionSDK.test(nil, nil)
result, err = client.Detection(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Detection(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Anti-Phishing Detection

- Upstream: [https://fishfish.gg/](https://fishfish.gg/)
- API docs: [https://api.fishfish.gg/docs](https://api.fishfish.gg/docs)

- No explicit licence is published alongside the FishFish API or its threat data.
- Read access to domain and URL lookups is open; write operations require an API key as an anti-abuse measure.
- Treat returned classifications as advisory and verify before taking automated action against users.

---

Generated from the Anti-Phishing Detection OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
