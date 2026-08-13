package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/longevity-competition-sdk/go"
	"github.com/voxgig-sdk/longevity-competition-sdk/go/core"

	vs "github.com/voxgig-sdk/longevity-competition-sdk/go/utility/struct"
)

func TestRankPreviewEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RankPreview(nil)
		if ent == nil {
			t.Fatal("expected non-nil RankPreviewEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := rank_previewBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "rank_preview." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LONGEVITY_COMPETITION_TEST_RANK_PREVIEW_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		rankPreviewRef01Ent := client.RankPreview(nil)
		rankPreviewRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "rank_preview"}, setup.data), "rank_preview_ref01"))

		rankPreviewRef01DataResult, err := rankPreviewRef01Ent.Create(rankPreviewRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		rankPreviewRef01Data = core.ToMapAny(entityData(rankPreviewRef01DataResult))
		if rankPreviewRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func rank_previewBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "rank_preview", "RankPreviewTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read rank_preview test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse rank_preview test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"rank_preview01", "rank_preview02", "rank_preview03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LONGEVITY_COMPETITION_TEST_RANK_PREVIEW_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LONGEVITY_COMPETITION_TEST_RANK_PREVIEW_ENTID": idmap,
		"LONGEVITY_COMPETITION_TEST_LIVE":      "FALSE",
		"LONGEVITY_COMPETITION_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["LONGEVITY_COMPETITION_TEST_RANK_PREVIEW_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LONGEVITY_COMPETITION_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewLongevityCompetitionSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LONGEVITY_COMPETITION_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LONGEVITY_COMPETITION_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
