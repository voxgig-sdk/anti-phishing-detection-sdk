# AntiPhishingDetection SDK



Available for [Golang](go/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Detection** |  | `/check` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/anti-phishing-detection-sdk"

client := sdk.NewAntiPhishingDetectionSDK(map[string]any{
    "apikey": os.Getenv("ANTI-PHISHING-DETECTION_APIKEY"),
})

// List all detections
detections, err := client.Detection(nil).List(nil, nil)
```

### Lua

```lua
local sdk = require("anti-phishing-detection_sdk")

local client = sdk.new({
  apikey = os.getenv("ANTI-PHISHING-DETECTION_APIKEY"),
})

-- List all detections
local detections, err = client:Detection(nil):list(nil, nil)
```

### PHP

```php
<?php
require_once 'antiphishingdetection_sdk.php';

$client = new AntiPhishingDetectionSDK([
    "apikey" => getenv("ANTI-PHISHING-DETECTION_APIKEY"),
]);

// List all detections
[$detections, $err] = $client->Detection(null)->list(null, null);
```

### Python

```python
import os
from antiphishingdetection_sdk import AntiPhishingDetectionSDK

client = AntiPhishingDetectionSDK({
    "apikey": os.environ.get("ANTI-PHISHING-DETECTION_APIKEY"),
})

# List all detections
detections, err = client.Detection(None).list(None, None)
```

### Ruby

```ruby
require_relative "AntiPhishingDetection_sdk"

client = AntiPhishingDetectionSDK.new({
  "apikey" => ENV["ANTI-PHISHING-DETECTION_APIKEY"],
})

# List all detections
detections, err = client.Detection(nil).list(nil, nil)
```

### TypeScript

```ts
import { AntiPhishingDetectionSDK } from 'anti-phishing-detection'

const client = new AntiPhishingDetectionSDK({
  apikey: process.env.ANTI-PHISHING-DETECTION_APIKEY,
})

// List all detections
const detections = await client.Detection().list()
```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Detection(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Detection(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = AntiPhishingDetectionSDK::test(null, null);
[$result, $err] = $client->Detection(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = AntiPhishingDetectionSDK.test(None, None)
result, err = client.Detection(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = AntiPhishingDetectionSDK.test(nil, nil)
result, err = client.Detection(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = AntiPhishingDetectionSDK.test()
const result = await client.Detection().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

