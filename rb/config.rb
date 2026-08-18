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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "type" => "`$STRING`",
            },
            {
              "name" => "artist",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "coverArt",
              "type" => "`$STRING`",
            },
            {
              "name" => "duration",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "playedAt",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
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
                  "parts" => [
                    "api",
                    "channels",
                    "{station}",
                    "playouts",
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
