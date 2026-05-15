# EnergyRadioStations SDK utility: make_context

from core.context import EnergyRadioStationsContext


def make_context_util(ctxmap, basectx):
    return EnergyRadioStationsContext(ctxmap, basectx)
