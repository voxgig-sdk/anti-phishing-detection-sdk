import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "detection",
    "accessor": "Detection",
    "op": "create",
    "method": "POST",
    "path": "/check",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "url",
      "domain",
      "scanId"
    ],
    "queryArgs": [
      {
        "name": "domain",
        "wire": "domain"
      },
      {
        "name": "scan_id",
        "wire": "scanId"
      },
      {
        "name": "url",
        "wire": "url"
      }
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
