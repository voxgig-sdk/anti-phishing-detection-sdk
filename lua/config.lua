-- AntiPhishingDetection SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "AntiPhishingDetection",
      slug = "anti-phishing-detection",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.fishfish.gg",
      auth = {
        prefix = "",
        name = "X-API-Key",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["detection"] = {},
      },
    },
    entity = {
      ["detection"] = {
        ["fields"] = {
          {
            ["name"] = "details",
            ["title"] = "Details",
            ["type"] = "`$STRING`",
            ["short"] = "Additional information about the detection",
          },
          {
            ["name"] = "indicators",
            ["title"] = "Indicators",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of phishing indicators detected",
          },
          {
            ["name"] = "isPhishing",
            ["title"] = "Is Phishing",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Whether the URL is identified as phishing",
          },
          {
            ["name"] = "recommendation",
            ["title"] = "Recommendation",
            ["type"] = "`$STRING`",
            ["short"] = "Recommended action based on the scan results",
          },
          {
            ["name"] = "resource",
            ["title"] = "Resource",
            ["type"] = "`$STRING`",
            ["short"] = "The scanned resource (URL or domain)",
          },
          {
            ["name"] = "scanId",
            ["title"] = "Scan Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the scan",
          },
          {
            ["name"] = "score",
            ["title"] = "Score",
            ["type"] = "`$NUMBER`",
            ["short"] = "Confidence score of the detection (0-100)",
          },
          {
            ["name"] = "threatLevel",
            ["title"] = "Threat Level",
            ["type"] = "`$STRING`",
            ["short"] = "The severity level of the threat",
          },
          {
            ["name"] = "timestamp",
            ["title"] = "Timestamp",
            ["type"] = "`$STRING`",
            ["short"] = "When the scan was performed",
            ["format"] = "date-time",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The analyzed URL",
            ["format"] = "uri",
          },
        },
        ["name"] = "detection",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/check",
                ["segments"] = {
                  {
                    ["lit"] = "check",
                  },
                },
                ["parts"] = {
                  "check",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/scan",
                ["segments"] = {
                  {
                    ["lit"] = "scan",
                  },
                },
                ["parts"] = {
                  "scan",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.indicators`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "domain",
                      ["orig"] = "domain",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "scan_id",
                      ["orig"] = "scanId",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "url",
                      ["orig"] = "url",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
