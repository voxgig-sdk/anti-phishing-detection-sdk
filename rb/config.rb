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
        "slug" => "anti-phishing-detection",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.fishfish.gg",
        "auth" => {
          "prefix" => "",
          "name" => "X-API-Key",
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
              "title" => "Details",
              "type" => "`$STRING`",
              "short" => "Additional information about the detection",
            },
            {
              "name" => "indicators",
              "title" => "Indicators",
              "type" => "`$ARRAY`",
              "short" => "List of phishing indicators detected",
            },
            {
              "name" => "isPhishing",
              "title" => "Is Phishing",
              "type" => "`$BOOLEAN`",
              "short" => "Whether the URL is identified as phishing",
            },
            {
              "name" => "recommendation",
              "title" => "Recommendation",
              "type" => "`$STRING`",
              "short" => "Recommended action based on the scan results",
            },
            {
              "name" => "resource",
              "title" => "Resource",
              "type" => "`$STRING`",
              "short" => "The scanned resource (URL or domain)",
            },
            {
              "name" => "scanId",
              "title" => "Scan Id",
              "type" => "`$STRING`",
              "short" => "Unique identifier for the scan",
            },
            {
              "name" => "score",
              "title" => "Score",
              "type" => "`$NUMBER`",
              "short" => "Confidence score of the detection (0-100)",
            },
            {
              "name" => "threatLevel",
              "title" => "Threat Level",
              "type" => "`$STRING`",
              "short" => "The severity level of the threat",
            },
            {
              "name" => "timestamp",
              "title" => "Timestamp",
              "type" => "`$STRING`",
              "short" => "When the scan was performed",
              "format" => "date-time",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "short" => "The analyzed URL",
              "format" => "uri",
            },
          ],
          "name" => "detection",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/check",
                  "segments" => [
                    {
                      "lit" => "check",
                    },
                  ],
                  "parts" => [
                    "check",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/scan",
                  "segments" => [
                    {
                      "lit" => "scan",
                    },
                  ],
                  "parts" => [
                    "scan",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.indicators`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "domain",
                        "orig" => "domain",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "scan_id",
                        "orig" => "scanId",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "url",
                        "orig" => "url",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "domain",
                      "scan_id",
                      "url",
                    ],
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
