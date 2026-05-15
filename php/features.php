<?php
declare(strict_types=1);

// EnergyRadioStations SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class EnergyRadioStationsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new EnergyRadioStationsBaseFeature();
            case "test":
                return new EnergyRadioStationsTestFeature();
            default:
                return new EnergyRadioStationsBaseFeature();
        }
    }
}
