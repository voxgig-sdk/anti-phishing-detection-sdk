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
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.fishfish.gg",
                "auth" => [
                    "prefix" => "",
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
              'short' => 'Additional information about the detection',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'indicators',
              'short' => 'List of phishing indicators detected',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'isPhishing',
              'short' => 'Whether the URL is identified as phishing',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'recommendation',
              'short' => 'Recommended action based on the scan results',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'resource',
              'short' => 'The scanned resource (URL or domain)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'scanId',
              'short' => 'Unique identifier for the scan',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'score',
              'short' => 'Confidence score of the detection (0-100)',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'threatLevel',
              'short' => 'The severity level of the threat',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timestamp',
              'short' => 'When the scan was performed',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'The analyzed URL',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'detection',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/check',
                  'parts' => [
                    'check',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'domain',
                        'orig' => 'domain',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'scan_id',
                        'orig' => 'scan_id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'url',
                        'orig' => 'url',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/scan',
                  'parts' => [
                    'scan',
                  ],
                  'select' => [
                    'exist' => [
                      'domain',
                      'scan_id',
                      'url',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.indicators`',
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
