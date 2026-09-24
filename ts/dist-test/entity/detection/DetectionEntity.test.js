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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "details": { "a": true, "h": "Details", "n": "details", "r": false, "sh": "Additional information about the detection", "t": "`$STRING`", "key$": "details", "index$": 0 }, "indicators": { "a": true, "h": "Indicators", "n": "indicators", "r": false, "sh": "List of phishing indicators detected", "t": "`$ARRAY`", "key$": "indicators", "index$": 1 }, "isPhishing": { "a": true, "h": "Is Phishing", "n": "isPhishing", "r": false, "sh": "Whether the URL is identified as phishing", "t": "`$BOOLEAN`", "key$": "isPhishing", "index$": 2 }, "recommendation": { "a": true, "h": "Recommendation", "n": "recommendation", "r": false, "sh": "Recommended action based on the scan results", "t": "`$STRING`", "key$": "recommendation", "index$": 3 }, "resource": { "a": true, "h": "Resource", "n": "resource", "r": false, "sh": "The scanned resource (URL or domain)", "t": "`$STRING`", "key$": "resource", "index$": 4 }, "scanId": { "a": true, "h": "Scan Id", "n": "scanId", "r": false, "sh": "Unique identifier for the scan", "t": "`$STRING`", "key$": "scanId", "index$": 5 }, "score": { "a": true, "h": "Score", "n": "score", "r": false, "sh": "Confidence score of the detection (0-100)", "t": "`$NUMBER`", "key$": "score", "index$": 6 }, "threatLevel": { "a": true, "h": "Threat Level", "n": "threatLevel", "r": false, "sh": "The severity level of the threat", "t": "`$STRING`", "key$": "threatLevel", "index$": 7 }, "timestamp": { "a": true, "fo": "date-time", "h": "Timestamp", "n": "timestamp", "r": false, "sh": "When the scan was performed", "t": "`$STRING`", "key$": "timestamp", "index$": 8 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The analyzed URL", "t": "`$STRING`", "key$": "url", "index$": 9 } }, "name": "detection", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /check", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/check", "q": {}, "r": {}, "s": [{ "lit": "check" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /scan", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "domain", "or": "domain", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "scan_id", "or": "scan_id", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "url", "or": "url", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/scan", "q": { "exist": ["domain", "scan_id", "url"] }, "r": {}, "s": [{ "lit": "scan" }], "t": { "req": "`reqdata`", "res": "`body.indicators`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "detection", "name__orig": "detection", "Name": "Detection", "name_": "detection", "name-": "detection", "NAME": "DETECTION", "index$": 0 }, { "active": true, "entity": "detection", "key$": "BasicDetectionFlow", "kind": "basic", "name": "BasicDetectionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "detection_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "detection_ref01" } }], "index$": 1 }] }, 'Detection', { "POST /check": { "protocol": "http", "operationId": "checkUrl", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["url"], "properties": { "url": { "type": "string", "format": "uri", "description": "The URL to check for phishing threats", "example": "https://example.com", "key$": "url" } }, "index$": 1 } } } }, "responses": { "200": { "description": "Successful analysis of the URL", "content": { "application/json": { "schema": { "type": "object", "properties": { "url": { "type": "string", "description": "The analyzed URL", "key$": "url" }, "isPhishing": { "type": "boolean", "description": "Whether the URL is identified as phishing", "key$": "isPhishing" }, "threatLevel": { "type": "string", "enum": ["low", "medium", "high", "critical"], "description": "The severity level of the threat", "key$": "threatLevel" }, "score": { "type": "number", "description": "Confidence score of the detection (0-100)", "key$": "score" }, "details": { "type": "string", "description": "Additional information about the detection", "key$": "details" } }, "index$": 0 } } } }, "400": { "description": "Bad request - invalid URL format", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" }, "details": { "type": "string", "description": "Additional error details" } }, "required": ["error"], "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Too many requests - rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" }, "details": { "type": "string", "description": "Additional error details" } }, "required": ["error"], "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" }, "details": { "type": "string", "description": "Additional error details" } }, "required": ["error"], "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authentication" } } }, "GET /scan": { "protocol": "http", "operationId": "scanResource", "responses": { "200": { "description": "Successful scan operation", "content": { "application/json": { "schema": { "type": "object", "properties": { "scanId": { "description": "Unique identifier for the scan", "key$": "scanId", "type": "string" }, "timestamp": { "description": "When the scan was performed", "format": "date-time", "key$": "timestamp", "type": "string" }, "resource": { "description": "The scanned resource (URL or domain)", "key$": "resource", "type": "string" }, "isPhishing": { "description": "Whether the resource is identified as phishing", "key$": "isPhishing", "type": "boolean" }, "threatLevel": { "description": "The severity level of the threat", "enum": ["low", "medium", "high", "critical"], "key$": "threatLevel", "type": "string" }, "indicators": { "description": "List of phishing indicators detected", "items": { "type": "string" }, "key$": "indicators", "type": "array" }, "recommendation": { "description": "Recommended action based on the scan results", "key$": "recommendation", "type": "string" } }, "index$": 0 } } } }, "400": { "description": "Bad request - invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" }, "details": { "type": "string", "description": "Additional error details" } }, "required": ["error"], "x-ref": "#/components/schemas/Error" } } } }, "404": { "description": "Scan not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" }, "details": { "type": "string", "description": "Additional error details" } }, "required": ["error"], "x-ref": "#/components/schemas/Error" } } } }, "429": { "description": "Too many requests - rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" }, "details": { "type": "string", "description": "Additional error details" } }, "required": ["error"], "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" }, "details": { "type": "string", "description": "Additional error details" } }, "required": ["error"], "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "url", "in": "query", "description": "URL to scan for phishing threats", "required": false, "schema": { "type": "string", "format": "uri" }, "index$": 0 }, { "name": "domain", "in": "query", "description": "Domain to scan for phishing threats", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "scanId", "in": "query", "description": "ID of a previous scan to retrieve results", "required": false, "schema": { "type": "string" }, "index$": 2 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authentication" } } } });
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