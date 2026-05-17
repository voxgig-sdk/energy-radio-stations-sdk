package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewPlayoutEntityFunc func(client *EnergyRadioStationsSDK, entopts map[string]any) EnergyRadioStationsEntity

