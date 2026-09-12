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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.fishfish.gg",
            "auth": {
                "prefix": "",
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
            "short": "Additional information about the detection",
            "type": "`$STRING`",
          },
          {
            "name": "indicators",
            "short": "List of phishing indicators detected",
            "type": "`$ARRAY`",
          },
          {
            "name": "isPhishing",
            "short": "Whether the URL is identified as phishing",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "recommendation",
            "short": "Recommended action based on the scan results",
            "type": "`$STRING`",
          },
          {
            "name": "resource",
            "short": "The scanned resource (URL or domain)",
            "type": "`$STRING`",
          },
          {
            "name": "scanId",
            "short": "Unique identifier for the scan",
            "type": "`$STRING`",
          },
          {
            "name": "score",
            "short": "Confidence score of the detection (0-100)",
            "type": "`$NUMBER`",
          },
          {
            "name": "threatLevel",
            "short": "The severity level of the threat",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "timestamp",
            "short": "When the scan was performed",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The analyzed URL",
            "type": "`$STRING`",
          },
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
                    "lit": "check",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "check",
                ],
              },
            ],
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "scan_id",
                      "orig": "scan_id",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "url",
                      "orig": "url",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/scan",
                "segments": [
                  {
                    "lit": "scan",
                  },
                ],
                "select": {
                  "exist": [
                    "domain",
                    "scan_id",
                    "url",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.indicators`",
                },
                "parts": [
                  "scan",
                ],
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
