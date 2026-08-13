-- Typed models for the EnergyRadioStations SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Playout
---@field album? string
---@field artist string
---@field coverArt? string
---@field duration? number
---@field id? string
---@field playedAt string
---@field title string

---@class PlayoutListMatch
---@field station string

local M = {}

return M
