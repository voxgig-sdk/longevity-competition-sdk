# PhenoAge entity test

require "minitest/autorun"
require "json"
require_relative "../LongevityCompetition_sdk"
require_relative "runner"

class PhenoAgeEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LongevityCompetitionSDK.test(nil, nil)
    ent = testsdk.PhenoAge(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = pheno_age_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "pheno_age." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LONGEVITYCOMPETITION_TEST_PHENO_AGE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    pheno_age_ref01_ent = client.PhenoAge(nil)
    pheno_age_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.pheno_age"), "pheno_age_ref01"))

    pheno_age_ref01_data_result = pheno_age_ref01_ent.create(pheno_age_ref01_data, nil)
    pheno_age_ref01_data = Helpers.to_map(pheno_age_ref01_data_result)
    assert !pheno_age_ref01_data.nil?

  end
end

def pheno_age_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "pheno_age", "PhenoAgeTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LongevityCompetitionSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["pheno_age01", "pheno_age02", "pheno_age03"],
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
  entid_env_raw = ENV["LONGEVITYCOMPETITION_TEST_PHENO_AGE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LONGEVITYCOMPETITION_TEST_PHENO_AGE_ENTID" => idmap,
    "LONGEVITYCOMPETITION_TEST_LIVE" => "FALSE",
    "LONGEVITYCOMPETITION_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["LONGEVITYCOMPETITION_TEST_PHENO_AGE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LONGEVITYCOMPETITION_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = LongevityCompetitionSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LONGEVITYCOMPETITION_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LONGEVITYCOMPETITION_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
