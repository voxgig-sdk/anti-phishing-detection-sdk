# AntiPhishingDetection PHP SDK Reference

Complete API reference for the AntiPhishingDetection PHP SDK.


## AntiPhishingDetectionSDK

### Constructor

```php
require_once __DIR__ . '/antiphishingdetection_sdk.php';

$client = new AntiPhishingDetectionSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AntiPhishingDetectionSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = AntiPhishingDetectionSDK::test();
```


### Instance Methods

#### `Detection($data = null)`

Create a new `DetectionEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): AntiPhishingDetectionUtility`

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

## DetectionEntity

```php
$detection = $client->Detection();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `string` | No | Additional information about the detection |
| `indicators` | `array` | No | List of phishing indicators detected |
| `isPhishing` | `bool` | No | Whether the URL is identified as phishing |
| `recommendation` | `string` | No | Recommended action based on the scan results |
| `resource` | `string` | No | The scanned resource (URL or domain) |
| `scanId` | `string` | No | Unique identifier for the scan |
| `score` | `float` | No | Confidence score of the detection (0-100) |
| `threatLevel` | `string` | No | The severity level of the threat |
| `timestamp` | `string` | No | When the scan was performed |
| `url` | `string` | No | The analyzed URL |

### Field Usage by Operation

| Field | list | create |
| --- | --- | --- |
| `details` | - | - |
| `indicators` | - | - |
| `isPhishing` | - | - |
| `recommendation` | - | - |
| `resource` | - | - |
| `scanId` | - | - |
| `score` | - | - |
| `threatLevel` | - | - |
| `timestamp` | - | - |
| `url` | - | Yes |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Detection()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Detection()->list();
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

#### `make(): DetectionEntity`

Create a new `DetectionEntity` instance with the same client and
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
$client = new AntiPhishingDetectionSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

