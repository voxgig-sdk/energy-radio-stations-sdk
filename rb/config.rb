# EnergyRadioStations SDK configuration

module EnergyRadioStationsConfig
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
        "name" => "EnergyRadioStations",
        "slug" => "energy-radio-stations",
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
        "base" => "https://energy.ch",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "playout" => {},
        },
      },
      "entity" => {
        "playout" => {
          "fields" => [
            {
              "name" => "album",
              "short" => "Album name",
              "type" => "`$STRING`",
            },
            {
              "name" => "artist",
              "req" => true,
              "short" => "Artist name",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "coverArt",
              "short" => "URL to album cover image",
              "type" => "`$STRING`",
            },
            {
              "name" => "duration",
              "short" => "Song duration in seconds",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the playlist entry",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "playedAt",
              "req" => true,
              "short" => "Timestamp when the song was played",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "req" => true,
              "short" => "Song title",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "playout",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "energy-bern",
                        "kind" => "param",
                        "name" => "station",
                        "orig" => "station",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/channels/{station}/playouts",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "channels",
                    },
                    {
                      "var" => "station",
                    },
                    {
                      "lit" => "playouts",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "station",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "channels",
                    "{station}",
                    "playouts",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "channel",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    EnergyRadioStationsFeatures.make_feature(name)
  end
end
