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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.fishfish.gg",
      auth = {
        prefix = "",
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
            ["short"] = "Additional information about the detection",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "indicators",
            ["short"] = "List of phishing indicators detected",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "isPhishing",
            ["short"] = "Whether the URL is identified as phishing",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "recommendation",
            ["short"] = "Recommended action based on the scan results",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "resource",
            ["short"] = "The scanned resource (URL or domain)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "scanId",
            ["short"] = "Unique identifier for the scan",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "score",
            ["short"] = "Confidence score of the detection (0-100)",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "threatLevel",
            ["short"] = "The severity level of the threat",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "timestamp",
            ["short"] = "When the scan was performed",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The analyzed URL",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "detection",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/check",
                ["parts"] = {
                  "check",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "domain",
                      ["orig"] = "domain",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "scan_id",
                      ["orig"] = "scan_id",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "url",
                      ["orig"] = "url",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/scan",
                ["parts"] = {
                  "scan",
                },
                ["select"] = {
                  ["exist"] = {
                    "domain",
                    "scan_id",
                    "url",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.indicators`",
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
