<?php
declare(strict_types=1);

// Playlist entity test

require_once __DIR__ . '/../energyradiostations_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PlaylistEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = EnergyRadioStationsSDK::test(null, null);
        $ent = $testsdk->Playlist(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = playlist_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "playlist." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ENERGYRADIOSTATIONS_TEST_PLAYLIST_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $playlist_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.playlist")));
        $playlist_ref01_data = null;
        if (count($playlist_ref01_data_raw) > 0) {
            $playlist_ref01_data = Helpers::to_map($playlist_ref01_data_raw[0][1]);
        }

        // LIST
        $playlist_ref01_ent = $client->Playlist(null);
        $playlist_ref01_match = [
            "station_id" => $setup["idmap"]["station01"],
        ];

        [$playlist_ref01_list_result, $err] = $playlist_ref01_ent->list($playlist_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($playlist_ref01_list_result);

    }
}

function playlist_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/playlist/PlaylistTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = EnergyRadioStationsSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["playlist01", "playlist02", "playlist03", "station01", "station02", "station03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ENERGYRADIOSTATIONS_TEST_PLAYLIST_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ENERGYRADIOSTATIONS_TEST_PLAYLIST_ENTID" => $idmap,
        "ENERGYRADIOSTATIONS_TEST_LIVE" => "FALSE",
        "ENERGYRADIOSTATIONS_TEST_EXPLAIN" => "FALSE",
        "ENERGYRADIOSTATIONS_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ENERGYRADIOSTATIONS_TEST_PLAYLIST_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ENERGYRADIOSTATIONS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["ENERGYRADIOSTATIONS_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new EnergyRadioStationsSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["ENERGYRADIOSTATIONS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["ENERGYRADIOSTATIONS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
