# AntiPhishingDetection SDK configuration

module AntiPhishingDetectionConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "AntiPhishingDetection",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.fishfish.gg",
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "detection" => {},
        },
      },
      "entity" => {
        "detection" => {
          "fields" => [
            {
              "name" => "details",
              "type" => "`$STRING`",
            },
            {
              "name" => "indicators",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "isPhishing",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "recommendation",
              "type" => "`$STRING`",
            },
            {
              "name" => "resource",
              "type" => "`$STRING`",
            },
            {
              "name" => "scanId",
              "type" => "`$STRING`",
            },
            {
              "name" => "score",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "threatLevel",
              "type" => "`$STRING`",
            },
            {
              "name" => "timestamp",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "type" => "`$STRING`",
            },
          ],
          "name" => "detection",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/check",
                  "parts" => [
                    "check",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "domain",
                        "orig" => "domain",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "scan_id",
                        "orig" => "scan_id",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "url",
                        "orig" => "url",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/scan",
                  "parts" => [
                    "scan",
                  ],
                  "select" => {
                    "exist" => [
                      "domain",
                      "scan_id",
                      "url",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.indicators`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    AntiPhishingDetectionFeatures.make_feature(name)
  end
end
