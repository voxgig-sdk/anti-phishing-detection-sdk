package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewDetectionEntityFunc func(client *AntiPhishingDetectionSDK, entopts map[string]any) AntiPhishingDetectionEntity

