package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/anti-phishing-detection-sdk/go"
	"github.com/voxgig-sdk/anti-phishing-detection-sdk/go/core"

	vs "github.com/voxgig-sdk/anti-phishing-detection-sdk/go/utility/struct"
)

func TestDetectionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Detection(nil)
		if ent == nil {
			t.Fatal("expected non-nil DetectionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := detectionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "detection." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set ANTIPHISHINGDETECTION_TEST_DETECTION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		detectionRef01Ent := client.Detection(nil)
		detectionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "detection"}, setup.data), "detection_ref01"))

		detectionRef01DataResult, err := detectionRef01Ent.Create(detectionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		detectionRef01Data = core.ToMapAny(detectionRef01DataResult)
		if detectionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LIST
		detectionRef01Match := map[string]any{}

		detectionRef01ListResult, err := detectionRef01Ent.List(detectionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		detectionRef01List, detectionRef01ListOk := detectionRef01ListResult.([]any)
		if !detectionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", detectionRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(detectionRef01List), map[string]any{"id": detectionRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func detectionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "detection", "DetectionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read detection test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse detection test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"detection01", "detection02", "detection03"},
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
	entidEnvRaw := os.Getenv("ANTIPHISHINGDETECTION_TEST_DETECTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ANTIPHISHINGDETECTION_TEST_DETECTION_ENTID": idmap,
		"ANTIPHISHINGDETECTION_TEST_LIVE":      "FALSE",
		"ANTIPHISHINGDETECTION_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["ANTIPHISHINGDETECTION_TEST_DETECTION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ANTIPHISHINGDETECTION_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewAntiPhishingDetectionSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ANTIPHISHINGDETECTION_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ANTIPHISHINGDETECTION_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
