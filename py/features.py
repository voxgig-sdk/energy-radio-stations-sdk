# EnergyRadioStations SDK feature factory

from feature.base_feature import EnergyRadioStationsBaseFeature
from feature.test_feature import EnergyRadioStationsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: EnergyRadioStationsBaseFeature(),
        "test": lambda: EnergyRadioStationsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
