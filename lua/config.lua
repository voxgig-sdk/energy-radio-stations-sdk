-- EnergyRadioStations SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "EnergyRadioStations",
      slug = "energy-radio-stations",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://energy.ch",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["playout"] = {},
      },
    },
    entity = {
      ["playout"] = {
        ["fields"] = {
          {
            ["name"] = "album",
            ["short"] = "Album name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "artist",
            ["req"] = true,
            ["short"] = "Artist name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "coverArt",
            ["short"] = "URL to album cover image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "duration",
            ["short"] = "Song duration in seconds",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["short"] = "Unique identifier for the playlist entry",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "playedAt",
            ["req"] = true,
            ["short"] = "Timestamp when the song was played",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["req"] = true,
            ["short"] = "Song title",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "playout",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "energy-bern",
                      ["kind"] = "param",
                      ["name"] = "station",
                      ["orig"] = "station",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = 20,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/channels/{station}/playouts",
                ["parts"] = {
                  "api",
                  "channels",
                  "{station}",
                  "playouts",
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "station",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "channel",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
