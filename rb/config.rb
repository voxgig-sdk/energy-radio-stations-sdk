# EnergyRadioStations SDK configuration

module EnergyRadioStationsConfig
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
              "active" => true,
              "name" => "album",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "artist",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "cover_art",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "duration",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "id",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "played_at",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "title",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 6,
            },
          ],
          "name" => "playout",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => "energy-bern",
                        "kind" => "param",
                        "name" => "station",
                        "orig" => "station",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
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
                  "index$" => 0,
                },
              ],
              "key$" => "list",
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
