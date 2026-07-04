# Typed models for the EnergyRadioStations SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Playout:
    artist: str
    played_at: str
    title: str
    album: Optional[str] = None
    cover_art: Optional[str] = None
    duration: Optional[int] = None
    id: Optional[str] = None


@dataclass
class PlayoutListMatch:
    station: str

