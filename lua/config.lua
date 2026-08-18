-- AntiPhishingDetection SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "AntiPhishingDetection",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "indicators",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "isPhishing",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "recommendation",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "resource",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "scanId",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "score",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "threatLevel",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "timestamp",
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
