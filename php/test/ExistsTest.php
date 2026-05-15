<?php
declare(strict_types=1);

// EnergyRadioStations SDK exists test

require_once __DIR__ . '/../energyradiostations_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = EnergyRadioStationsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
