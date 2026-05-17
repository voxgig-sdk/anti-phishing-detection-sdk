package voxgigantiphishingdetectionsdk

import (
	"github.com/voxgig-sdk/anti-phishing-detection-sdk/go/core"
	"github.com/voxgig-sdk/anti-phishing-detection-sdk/go/entity"
	"github.com/voxgig-sdk/anti-phishing-detection-sdk/go/feature"
	_ "github.com/voxgig-sdk/anti-phishing-detection-sdk/go/utility"
)

// Type aliases preserve external API.
type AntiPhishingDetectionSDK = core.AntiPhishingDetectionSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AntiPhishingDetectionEntity = core.AntiPhishingDetectionEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AntiPhishingDetectionError = core.AntiPhishingDetectionError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewDetectionEntityFunc = func(client *core.AntiPhishingDetectionSDK, entopts map[string]any) core.AntiPhishingDetectionEntity {
		return entity.NewDetectionEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAntiPhishingDetectionSDK = core.NewAntiPhishingDetectionSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
