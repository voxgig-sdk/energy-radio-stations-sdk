<?php
declare(strict_types=1);

// EnergyRadioStations SDK configuration

class EnergyRadioStationsConfig
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
                "name" => "EnergyRadioStations",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://energy.ch",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "playout" => [],
                ],
            ],
            "entity" => [
        'playout' => [
          'fields' => [
            [
              'name' => 'album',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artist',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'coverArt',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'duration',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'playedAt',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'playout',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'energy-bern',
                        'kind' => 'param',
                        'name' => 'station',
                        'orig' => 'station',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/channels/{station}/playouts',
                  'parts' => [
                    'api',
                    'channels',
                    '{station}',
                    'playouts',
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'station',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'channel',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return EnergyRadioStationsFeatures::make_feature($name);
    }
}
