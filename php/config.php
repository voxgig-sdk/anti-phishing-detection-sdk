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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'indicators',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'isPhishing',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'recommendation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'resource',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'scanId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'score',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'threatLevel',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'timestamp',
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
