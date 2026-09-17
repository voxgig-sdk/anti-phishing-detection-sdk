
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'AntiPhishingDetection',
        slug: "anti-phishing-detection",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
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
 retry:     {
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
 test:     {
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
 timeout:     {
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

  }


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
      
        detection: {
        },
  
    }
  }


  entity = {
    "detection": {
      "fields": [
        {
          "name": "details",
          "short": "Additional information about the detection",
          "type": "`$STRING`"
        },
        {
          "name": "indicators",
          "short": "List of phishing indicators detected",
          "type": "`$ARRAY`"
        },
        {
          "name": "isPhishing",
          "short": "Whether the URL is identified as phishing",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "recommendation",
          "short": "Recommended action based on the scan results",
          "type": "`$STRING`"
        },
        {
          "name": "resource",
          "short": "The scanned resource (URL or domain)",
          "type": "`$STRING`"
        },
        {
          "name": "scanId",
          "short": "Unique identifier for the scan",
          "type": "`$STRING`"
        },
        {
          "name": "score",
          "short": "Confidence score of the detection (0-100)",
          "type": "`$NUMBER`"
        },
        {
          "name": "threatLevel",
          "short": "The severity level of the threat",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "timestamp",
          "short": "When the scan was performed",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "url",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "The analyzed URL",
          "type": "`$STRING`"
        }
      ],
      "name": "detection",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/check",
              "segments": [
                {
                  "lit": "check"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "check"
              ]
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "domain",
                    "orig": "domain",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "scan_id",
                    "orig": "scan_id",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "url",
                    "orig": "url",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/scan",
              "segments": [
                {
                  "lit": "scan"
                }
              ],
              "select": {
                "exist": [
                  "domain",
                  "scan_id",
                  "url"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.indicators`"
              },
              "parts": [
                "scan"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

