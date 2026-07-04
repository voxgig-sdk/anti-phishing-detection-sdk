<?php
declare(strict_types=1);

// Detection entity test

require_once __DIR__ . '/../antiphishingdetection_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class DetectionEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = AntiPhishingDetectionSDK::test(null, null);
        $ent = $testsdk->Detection(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = detection_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "detection." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ANTIPHISHINGDETECTION_TEST_DETECTION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $detection_ref01_ent = $client->Detection(null);
        $detection_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.detection"), "detection_ref01"));

        $detection_ref01_data_result = $detection_ref01_ent->create($detection_ref01_data, null);
        $detection_ref01_data = Helpers::to_map($detection_ref01_data_result);
        $this->assertNotNull($detection_ref01_data);

        // LIST
        $detection_ref01_match = [];

        $detection_ref01_list_result = $detection_ref01_ent->list($detection_ref01_match, null);
        $this->assertIsArray($detection_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($detection_ref01_list_result),
            ["id" => $detection_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

    }
}

function detection_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/detection/DetectionTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = AntiPhishingDetectionSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["detection01", "detection02", "detection03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ANTIPHISHINGDETECTION_TEST_DETECTION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ANTIPHISHINGDETECTION_TEST_DETECTION_ENTID" => $idmap,
        "ANTIPHISHINGDETECTION_TEST_LIVE" => "FALSE",
        "ANTIPHISHINGDETECTION_TEST_EXPLAIN" => "FALSE",
        "ANTIPHISHINGDETECTION_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ANTIPHISHINGDETECTION_TEST_DETECTION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ANTIPHISHINGDETECTION_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["ANTIPHISHINGDETECTION_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new AntiPhishingDetectionSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["ANTIPHISHINGDETECTION_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["ANTIPHISHINGDETECTION_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
