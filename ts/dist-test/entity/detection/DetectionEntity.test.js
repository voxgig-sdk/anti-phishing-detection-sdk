"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DetectionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ANTI_PHISHING_DETECTION_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ANTI_PHISHING_DETECTION_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AntiPhishingDetectionSDK.test();
        const ent = testsdk.Detection();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ANTI_PHISHING_DETECTION_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'detection.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "details", "req": false, "short": "Additional information about the detection", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "indicators", "req": false, "short": "List of phishing indicators detected", "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "isPhishing", "req": false, "short": "Whether the URL is identified as phishing", "type": "`$BOOLEAN`", "index$": 2 }, { "active": true, "name": "recommendation", "req": false, "short": "Recommended action based on the scan results", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "resource", "req": false, "short": "The scanned resource (URL or domain)", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "scanId", "req": false, "short": "Unique identifier for the scan", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "score", "req": false, "short": "Confidence score of the detection (0-100)", "type": "`$NUMBER`", "index$": 6 }, { "active": true, "name": "threatLevel", "req": false, "short": "The severity level of the threat", "type": "`$STRING`", "index$": 7 }, { "active": true, "format": "date-time", "name": "timestamp", "req": false, "short": "When the scan was performed", "type": "`$STRING`", "index$": 8 }, { "active": true, "format": "uri", "name": "url", "op": { "create": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "The analyzed URL", "type": "`$STRING`", "index$": 9 }], "name": "detection", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /check", "json": "{\"operationId\":\"checkUrl\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"url\":{\"description\":\"The URL to check for phishing threats\",\"example\":\"https://example.com\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"url\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"details\":{\"description\":\"Additional information about the detection\",\"type\":\"string\"},\"isPhishing\":{\"description\":\"Whether the URL is identified as phishing\",\"type\":\"boolean\"},\"score\":{\"description\":\"Confidence score of the detection (0-100)\",\"type\":\"number\"},\"threatLevel\":{\"description\":\"The severity level of the threat\",\"enum\":[\"low\",\"medium\",\"high\",\"critical\"],\"type\":\"string\"},\"url\":{\"description\":\"The analyzed URL\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful analysis of the URL\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid URL format\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Too many requests - rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/check", "segments": [{ "lit": "check" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "domain", "orig": "domain", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "scan_id", "orig": "scan_id", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "url", "orig": "url", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /scan", "json": "{\"operationId\":\"scanResource\",\"parameters\":[{\"description\":\"URL to scan for phishing threats\",\"in\":\"query\",\"name\":\"url\",\"required\":false,\"schema\":{\"format\":\"uri\",\"type\":\"string\"}},{\"description\":\"Domain to scan for phishing threats\",\"in\":\"query\",\"name\":\"domain\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"ID of a previous scan to retrieve results\",\"in\":\"query\",\"name\":\"scanId\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"indicators\":{\"description\":\"List of phishing indicators detected\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"isPhishing\":{\"description\":\"Whether the resource is identified as phishing\",\"type\":\"boolean\"},\"recommendation\":{\"description\":\"Recommended action based on the scan results\",\"type\":\"string\"},\"resource\":{\"description\":\"The scanned resource (URL or domain)\",\"type\":\"string\"},\"scanId\":{\"description\":\"Unique identifier for the scan\",\"type\":\"string\"},\"threatLevel\":{\"description\":\"The severity level of the threat\",\"enum\":[\"low\",\"medium\",\"high\",\"critical\"],\"type\":\"string\"},\"timestamp\":{\"description\":\"When the scan was performed\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful scan operation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Scan not found\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Too many requests - rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/scan", "segments": [{ "lit": "scan" }], "select": { "exist": ["domain", "scan_id", "url"] }, "transform": { "req": "`reqdata`", "res": "`body.indicators`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "detection", "name__orig": "detection", "Name": "Detection", "name_": "detection", "name-": "detection", "NAME": "DETECTION", "index$": 0 }, { "active": true, "entity": "detection", "key$": "BasicDetectionFlow", "kind": "basic", "name": "BasicDetectionFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "detection_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "detection_ref01" } }], "index$": 1 }] }, 'Detection');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const detection_ref01_ent = client.Detection();
        let detection_ref01_data = setup.data.new.detection['detection_ref01'];
        detection_ref01_data = (await detection_ref01_ent.create(detection_ref01_data)).data();
        (0, node_assert_1.default)(null != detection_ref01_data);
        // LIST
        const detection_ref01_match = {};
        const detection_ref01_list = (await detection_ref01_ent.list(detection_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/detection/DetectionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AntiPhishingDetectionSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['detection01', 'detection02', 'detection03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ANTI_PHISHING_DETECTION_TEST_DETECTION_ENTID': idmap,
        'ANTI_PHISHING_DETECTION_TEST_LIVE': 'FALSE',
        'ANTI_PHISHING_DETECTION_TEST_EXPLAIN': 'FALSE',
        'ANTI_PHISHING_DETECTION_APIKEY': '',
    });
    idmap = env['ANTI_PHISHING_DETECTION_TEST_DETECTION_ENTID'];
    const live = 'TRUE' === env.ANTI_PHISHING_DETECTION_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ANTI_PHISHING_DETECTION_TEST_DETECTION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AntiPhishingDetectionSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.ANTI_PHISHING_DETECTION_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ANTI_PHISHING_DETECTION_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=DetectionEntity.test.js.map