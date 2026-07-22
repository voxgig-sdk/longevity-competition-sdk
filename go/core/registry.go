package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAthleteEntityFunc func(client *LongevityCompetitionSDK, entopts map[string]any) LongevityCompetitionEntity

var NewBortzAgeEntityFunc func(client *LongevityCompetitionSDK, entopts map[string]any) LongevityCompetitionEntity

var NewCompetitionEntityFunc func(client *LongevityCompetitionSDK, entopts map[string]any) LongevityCompetitionEntity

var NewLeaderboardEntityFunc func(client *LongevityCompetitionSDK, entopts map[string]any) LongevityCompetitionEntity

var NewPhenoAgeEntityFunc func(client *LongevityCompetitionSDK, entopts map[string]any) LongevityCompetitionEntity

var NewRankPreviewEntityFunc func(client *LongevityCompetitionSDK, entopts map[string]any) LongevityCompetitionEntity

var NewReferenceEntityFunc func(client *LongevityCompetitionSDK, entopts map[string]any) LongevityCompetitionEntity

