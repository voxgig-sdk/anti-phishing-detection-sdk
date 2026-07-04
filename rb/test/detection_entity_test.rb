# Detection entity test

require "minitest/autorun"
require "json"
require_relative "../AntiPhishingDetection_sdk"
require_relative "runner"

class DetectionEntityTest < Minitest::Test
  def test_create_instance
    testsdk = AntiPhishingDetectionSDK.test(nil, nil)
    ent = testsdk.Detection(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = detection_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "detection." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set ANTIPHISHINGDETECTION_TEST_DETECTION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    detection_ref01_ent = client.Detection(nil)
    detection_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.detection"), "detection_ref01"))

    detection_ref01_data_result = detection_ref01_ent.create(detection_ref01_data, nil)
    detection_ref01_data = Helpers.to_map(detection_ref01_data_result)
    assert !detection_ref01_data.nil?

    # LIST
    detection_ref01_match = {}

    detection_ref01_list_result = detection_ref01_ent.list(detection_ref01_match, nil)
    assert detection_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(detection_ref01_list_result),
      { "id" => detection_ref01_data["id"] })
    assert !Vs.isempty(found_item)

  end
end

def detection_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "detection", "DetectionTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = AntiPhishingDetectionSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["detection01", "detection02", "detection03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["ANTIPHISHINGDETECTION_TEST_DETECTION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ANTIPHISHINGDETECTION_TEST_DETECTION_ENTID" => idmap,
    "ANTIPHISHINGDETECTION_TEST_LIVE" => "FALSE",
    "ANTIPHISHINGDETECTION_TEST_EXPLAIN" => "FALSE",
    "ANTIPHISHINGDETECTION_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["ANTIPHISHINGDETECTION_TEST_DETECTION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["ANTIPHISHINGDETECTION_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["ANTIPHISHINGDETECTION_APIKEY"],
      },
      extra || {},
    ])
    client = AntiPhishingDetectionSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["ANTIPHISHINGDETECTION_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["ANTIPHISHINGDETECTION_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
