# AntiPhishingDetection SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$STRING`",
          },
          {
            "name": "indicators",
            "type": "`$ARRAY`",
          },
          {
            "name": "isPhishing",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "recommendation",
            "type": "`$STRING`",
          },
          {
            "name": "resource",
            "type": "`$STRING`",
          },
          {
            "name": "scanId",
            "type": "`$STRING`",
          },
          {
            "name": "score",
            "type": "`$NUMBER`",
          },
          {
            "name": "threatLevel",
            "type": "`$STRING`",
          },
          {
            "name": "timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
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
                "parts": [
                  "check",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
                "parts": [
                  "scan",
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
