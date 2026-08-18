
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'AntiPhishingDetection',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.fishfish.gg",

    auth: {
      prefix: '',
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
          "type": "`$STRING`"
        },
        {
          "name": "indicators",
          "type": "`$ARRAY`"
        },
        {
          "name": "isPhishing",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "recommendation",
          "type": "`$STRING`"
        },
        {
          "name": "resource",
          "type": "`$STRING`"
        },
        {
          "name": "scanId",
          "type": "`$STRING`"
        },
        {
          "name": "score",
          "type": "`$NUMBER`"
        },
        {
          "name": "threatLevel",
          "type": "`$STRING`"
        },
        {
          "name": "timestamp",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
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
              "parts": [
                "check"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "scan"
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
              }
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
  config
}

