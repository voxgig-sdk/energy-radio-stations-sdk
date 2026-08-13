# frozen_string_literal: true

# Typed models for the EnergyRadioStations SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Playout entity data model.
#
# @!attribute [rw] album
#   @return [String, nil]
#
# @!attribute [rw] artist
#   @return [String]
#
# @!attribute [rw] coverArt
#   @return [String, nil]
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] playedAt
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
Playout = Struct.new(
  :album,
  :artist,
  :coverArt,
  :duration,
  :id,
  :playedAt,
  :title,
  keyword_init: true
)

# Request payload for Playout#list.
#
# @!attribute [rw] station
#   @return [String]
PlayoutListMatch = Struct.new(
  :station,
  keyword_init: true
)

