# EnergyRadioStations SDK control

from __future__ import annotations


class EnergyRadioStationsControl:
    def __init__(self, opts=None):
        if opts is None:
            opts = {}
        self.throw_err = opts.get("throw_err")
        self.err = None
        self.explain = opts.get("explain")
