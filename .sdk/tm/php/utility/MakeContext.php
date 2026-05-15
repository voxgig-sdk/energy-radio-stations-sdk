<?php
declare(strict_types=1);

// EnergyRadioStations SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class EnergyRadioStationsMakeContext
{
    public static function call(array $ctxmap, ?EnergyRadioStationsContext $basectx): EnergyRadioStationsContext
    {
        return new EnergyRadioStationsContext($ctxmap, $basectx);
    }
}
