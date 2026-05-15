package = "voxgig-sdk-energy-radio-stations"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/energy-radio-stations-sdk.git"
}
description = {
  summary = "EnergyRadioStations SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["energy-radio-stations_sdk"] = "energy-radio-stations_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
