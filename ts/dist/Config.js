"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'AntiPhishingDetection',
        slug: "anti-phishing-detection",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.fishfish.gg",
        auth: {
            prefix: '',
            name: 'X-API-Key',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            detection: {},
        }
    };
    entity = {
        "detection": {
            "fields": [
                {
                    "name": "details",
                    "title": "Details",
                    "type": "`$STRING`",
                    "short": "Additional information about the detection"
                },
                {
                    "name": "indicators",
                    "title": "Indicators",
                    "type": "`$ARRAY`",
                    "short": "List of phishing indicators detected"
                },
                {
                    "name": "isPhishing",
                    "title": "Is Phishing",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the URL is identified as phishing"
                },
                {
                    "name": "recommendation",
                    "title": "Recommendation",
                    "type": "`$STRING`",
                    "short": "Recommended action based on the scan results"
                },
                {
                    "name": "resource",
                    "title": "Resource",
                    "type": "`$STRING`",
                    "short": "The scanned resource (URL or domain)"
                },
                {
                    "name": "scanId",
                    "title": "Scan Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier for the scan"
                },
                {
                    "name": "score",
                    "title": "Score",
                    "type": "`$NUMBER`",
                    "short": "Confidence score of the detection (0-100)"
                },
                {
                    "name": "threatLevel",
                    "title": "Threat Level",
                    "type": "`$STRING`",
                    "short": "The severity level of the threat"
                },
                {
                    "name": "timestamp",
                    "title": "Timestamp",
                    "type": "`$STRING`",
                    "short": "When the scan was performed",
                    "format": "date-time"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "op": {
                        "create": {
                            "req": true,
                            "type": "`$STRING`"
                        }
                    },
                    "short": "The analyzed URL",
                    "format": "uri"
                }
            ],
            "name": "detection",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/check",
                            "segments": [
                                {
                                    "lit": "check"
                                }
                            ],
                            "parts": [
                                "check"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/scan",
                            "segments": [
                                {
                                    "lit": "scan"
                                }
                            ],
                            "parts": [
                                "scan"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.indicators`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "scan_id",
                                        "orig": "scanId",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "url",
                                        "orig": "url",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "domain",
                                    "scan_id",
                                    "url"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map