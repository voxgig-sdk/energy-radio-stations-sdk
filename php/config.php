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
                "slug" => "energy-radio-stations",
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
              'short' => 'Album name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artist',
              'req' => true,
              'short' => 'Artist name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'coverArt',
              'short' => 'URL to album cover image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'duration',
              'short' => 'Song duration in seconds',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the playlist entry',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'playedAt',
              'req' => true,
              'short' => 'Timestamp when the song was played',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'req' => true,
              'short' => 'Song title',
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
