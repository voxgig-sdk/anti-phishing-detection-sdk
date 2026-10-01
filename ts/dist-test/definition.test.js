"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "detection",
        "accessor": "Detection",
        "op": "create",
        "method": "POST",
        "path": "/check",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "url": "x",
            "isPhishing": true,
            "threatLevel": "low",
            "score": 1,
            "details": "x"
        },
        "idField": "id"
    },
    {
        "entity": "detection",
        "accessor": "Detection",
        "op": "list",
        "method": "GET",
        "path": "/scan",
        "args": [],
        "select": {
            "domain": "v1",
            "scan_id": "v1",
            "url": "v1"
        },
        "headers": [],
        "query": [
            "url",
            "domain",
            "scanId"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "scanId": "x",
            "timestamp": "2026-01-01T00:00:00Z",
            "resource": "x",
            "isPhishing": true,
            "threatLevel": "low",
            "indicators": [
                "x"
            ],
            "recommendation": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map