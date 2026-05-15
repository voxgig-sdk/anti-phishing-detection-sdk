# AntiPhishingDetection TypeScript SDK Reference

Complete API reference for the AntiPhishingDetection TypeScript SDK.


## AntiPhishingDetectionSDK

### Constructor

```ts
new AntiPhishingDetectionSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AntiPhishingDetectionSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = AntiPhishingDetectionSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `AntiPhishingDetectionSDK` instance in test mode.


### Instance Methods

#### `Detection(data?: object)`

Create a new `Detection` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DetectionEntity` instance.

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

Alias for `AntiPhishingDetectionSDK.test()`.

**Returns:** `AntiPhishingDetectionSDK` instance in test mode.


---

## DetectionEntity

```ts
const detection = client.Detection()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `detail` | ``$STRING`` | No |  |
| `indicator` | ``$ARRAY`` | No |  |
| `is_phishing` | ``$BOOLEAN`` | No |  |
| `recommendation` | ``$STRING`` | No |  |
| `resource` | ``$STRING`` | No |  |
| `scan_id` | ``$STRING`` | No |  |
| `score` | ``$NUMBER`` | No |  |
| `threat_level` | ``$STRING`` | No |  |
| `timestamp` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `detail` | - | - | - | - | - |
| `indicator` | - | - | - | - | - |
| `is_phishing` | - | - | - | - | - |
| `recommendation` | - | - | - | - | - |
| `resource` | - | - | - | - | - |
| `scan_id` | - | - | - | - | - |
| `score` | - | - | - | - | - |
| `threat_level` | - | - | - | - | - |
| `timestamp` | - | - | - | - | - |
| `url` | - | - | Yes | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Detection().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Detection().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DetectionEntity` instance with the same client and
options.

#### `client()`

Return the parent `AntiPhishingDetectionSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new AntiPhishingDetectionSDK({
  feature: {
    test: { active: true },
  }
})
```

