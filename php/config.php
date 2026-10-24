<?php
declare(strict_types=1);

// AntiPhishingDetection SDK configuration

class AntiPhishingDetectionConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "AntiPhishingDetection",
                "slug" => "anti-phishing-detection",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://api.fishfish.gg",
                "auth" => [
                    "prefix" => "",
                    "name" => "X-API-Key",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "detection" => [],
                ],
            ],
            "entity" => [
        'detection' => [
          'fields' => [
            [
              'name' => 'details',
              'title' => 'Details',
              'type' => '`$STRING`',
              'short' => 'Additional information about the detection',
            ],
            [
              'name' => 'indicators',
              'title' => 'Indicators',
              'type' => '`$ARRAY`',
              'short' => 'List of phishing indicators detected',
            ],
            [
              'name' => 'isPhishing',
              'title' => 'Is Phishing',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether the URL is identified as phishing',
            ],
            [
              'name' => 'recommendation',
              'title' => 'Recommendation',
              'type' => '`$STRING`',
              'short' => 'Recommended action based on the scan results',
            ],
            [
              'name' => 'resource',
              'title' => 'Resource',
              'type' => '`$STRING`',
              'short' => 'The scanned resource (URL or domain)',
            ],
            [
              'name' => 'scanId',
              'title' => 'Scan Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the scan',
            ],
            [
              'name' => 'score',
              'title' => 'Score',
              'type' => '`$NUMBER`',
              'short' => 'Confidence score of the detection (0-100)',
            ],
            [
              'name' => 'threatLevel',
              'title' => 'Threat Level',
              'type' => '`$STRING`',
              'short' => 'The severity level of the threat',
            ],
            [
              'name' => 'timestamp',
              'title' => 'Timestamp',
              'type' => '`$STRING`',
              'short' => 'When the scan was performed',
              'format' => 'date-time',
            ],
            [
              'name' => 'url',
              'title' => 'Url',
              'type' => '`$STRING`',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'The analyzed URL',
              'format' => 'uri',
            ],
          ],
          'name' => 'detection',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/check',
                  'segments' => [
                    [
                      'lit' => 'check',
                    ],
                  ],
                  'parts' => [
                    'check',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/scan',
                  'segments' => [
                    [
                      'lit' => 'scan',
                    ],
                  ],
                  'parts' => [
                    'scan',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.indicators`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'domain',
                        'orig' => 'domain',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'scan_id',
                        'orig' => 'scanId',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'url',
                        'orig' => 'url',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'field' => true,
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return AntiPhishingDetectionFeatures::make_feature($name);
    }
}
