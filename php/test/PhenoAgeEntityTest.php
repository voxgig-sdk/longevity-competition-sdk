<?php
declare(strict_types=1);

// PhenoAge entity test

require_once __DIR__ . '/../longevitycompetition_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PhenoAgeEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LongevityCompetitionSDK::test(null, null);
        $ent = $testsdk->PhenoAge(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = pheno_age_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "pheno_age." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LONGEVITY_COMPETITION_TEST_PHENO_AGE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $pheno_age_ref01_ent = $client->PhenoAge(null);
        $pheno_age_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.pheno_age"), "pheno_age_ref01"));

        $pheno_age_ref01_data_result = $pheno_age_ref01_ent->create($pheno_age_ref01_data, null);
        $pheno_age_ref01_data = Helpers::to_map(is_object($pheno_age_ref01_data_result) && method_exists($pheno_age_ref01_data_result, 'data_get') ? $pheno_age_ref01_data_result->data_get() : $pheno_age_ref01_data_result);
        $this->assertNotNull($pheno_age_ref01_data);

    }
}

function pheno_age_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/pheno_age/PhenoAgeTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LongevityCompetitionSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["pheno_age01", "pheno_age02", "pheno_age03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LONGEVITY_COMPETITION_TEST_PHENO_AGE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LONGEVITY_COMPETITION_TEST_PHENO_AGE_ENTID" => $idmap,
        "LONGEVITY_COMPETITION_TEST_LIVE" => "FALSE",
        "LONGEVITY_COMPETITION_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LONGEVITY_COMPETITION_TEST_PHENO_AGE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LONGEVITY_COMPETITION_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new LongevityCompetitionSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["LONGEVITY_COMPETITION_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["LONGEVITY_COMPETITION_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
