# AntiPhishingDetection SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "AntiPhishingDetection",
            "slug": "anti-phishing-detection",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.fishfish.gg",
            "auth": {
                "prefix": "",
                "name": "X-API-Key",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "detection": {},
            },
        },
        "entity": {
      "detection": {
        "fields": [
          {
            "name": "details",
            "title": "Details",
            "type": "`$STRING`",
            "short": "Additional information about the detection",
          },
          {
            "name": "indicators",
            "title": "Indicators",
            "type": "`$ARRAY`",
            "short": "List of phishing indicators detected",
          },
          {
            "name": "isPhishing",
            "title": "Is Phishing",
            "type": "`$BOOLEAN`",
            "short": "Whether the URL is identified as phishing",
          },
          {
            "name": "recommendation",
            "title": "Recommendation",
            "type": "`$STRING`",
            "short": "Recommended action based on the scan results",
          },
          {
            "name": "resource",
            "title": "Resource",
            "type": "`$STRING`",
            "short": "The scanned resource (URL or domain)",
          },
          {
            "name": "scanId",
            "title": "Scan Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the scan",
          },
          {
            "name": "score",
            "title": "Score",
            "type": "`$NUMBER`",
            "short": "Confidence score of the detection (0-100)",
          },
          {
            "name": "threatLevel",
            "title": "Threat Level",
            "type": "`$STRING`",
            "short": "The severity level of the threat",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$STRING`",
            "short": "When the scan was performed",
            "format": "date-time",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The analyzed URL",
            "format": "uri",
          },
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
                    "lit": "check",
                  },
                ],
                "parts": [
                  "check",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "scan",
                  },
                ],
                "parts": [
                  "scan",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.indicators`",
                },
                "args": {
                  "query": [
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "scan_id",
                      "orig": "scan_id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "url",
                      "orig": "url",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain",
                    "scan_id",
                    "url",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
