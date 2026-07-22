package voxgiglongevitycompetitionsdk

import (
	"github.com/voxgig-sdk/longevity-competition-sdk/go/core"
	"github.com/voxgig-sdk/longevity-competition-sdk/go/entity"
	"github.com/voxgig-sdk/longevity-competition-sdk/go/feature"
	_ "github.com/voxgig-sdk/longevity-competition-sdk/go/utility"
)

// Type aliases preserve external API.
type LongevityCompetitionSDK = core.LongevityCompetitionSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type LongevityCompetitionEntity = core.LongevityCompetitionEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type LongevityCompetitionError = core.LongevityCompetitionError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAthleteEntityFunc = func(client *core.LongevityCompetitionSDK, entopts map[string]any) core.LongevityCompetitionEntity {
		return entity.NewAthleteEntity(client, entopts)
	}
	core.NewBortzAgeEntityFunc = func(client *core.LongevityCompetitionSDK, entopts map[string]any) core.LongevityCompetitionEntity {
		return entity.NewBortzAgeEntity(client, entopts)
	}
	core.NewCompetitionEntityFunc = func(client *core.LongevityCompetitionSDK, entopts map[string]any) core.LongevityCompetitionEntity {
		return entity.NewCompetitionEntity(client, entopts)
	}
	core.NewLeaderboardEntityFunc = func(client *core.LongevityCompetitionSDK, entopts map[string]any) core.LongevityCompetitionEntity {
		return entity.NewLeaderboardEntity(client, entopts)
	}
	core.NewPhenoAgeEntityFunc = func(client *core.LongevityCompetitionSDK, entopts map[string]any) core.LongevityCompetitionEntity {
		return entity.NewPhenoAgeEntity(client, entopts)
	}
	core.NewRankPreviewEntityFunc = func(client *core.LongevityCompetitionSDK, entopts map[string]any) core.LongevityCompetitionEntity {
		return entity.NewRankPreviewEntity(client, entopts)
	}
	core.NewReferenceEntityFunc = func(client *core.LongevityCompetitionSDK, entopts map[string]any) core.LongevityCompetitionEntity {
		return entity.NewReferenceEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewLongevityCompetitionSDK = core.NewLongevityCompetitionSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewLongevityCompetitionSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *LongevityCompetitionSDK  { return NewLongevityCompetitionSDK(nil) }
func Test() *LongevityCompetitionSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
