<?php
declare(strict_types=1);

// EnergyRadioStations SDK utility: prepare_body

class EnergyRadioStationsPrepareBody
{
    public static function call(EnergyRadioStationsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
