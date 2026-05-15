<?php
declare(strict_types=1);

// EnergyRadioStations SDK utility: feature_add

class EnergyRadioStationsFeatureAdd
{
    public static function call(EnergyRadioStationsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
