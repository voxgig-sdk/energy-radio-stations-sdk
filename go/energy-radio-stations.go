package voxgigenergyradiostationssdk

import (
	"github.com/voxgig-sdk/energy-radio-stations-sdk/core"
	"github.com/voxgig-sdk/energy-radio-stations-sdk/entity"
	"github.com/voxgig-sdk/energy-radio-stations-sdk/feature"
	_ "github.com/voxgig-sdk/energy-radio-stations-sdk/utility"
)

// Type aliases preserve external API.
type EnergyRadioStationsSDK = core.EnergyRadioStationsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type EnergyRadioStationsEntity = core.EnergyRadioStationsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type EnergyRadioStationsError = core.EnergyRadioStationsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewPlaylistEntityFunc = func(client *core.EnergyRadioStationsSDK, entopts map[string]any) core.EnergyRadioStationsEntity {
		return entity.NewPlaylistEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewEnergyRadioStationsSDK = core.NewEnergyRadioStationsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
