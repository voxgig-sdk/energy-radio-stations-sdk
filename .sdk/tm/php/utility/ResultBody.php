<?php
declare(strict_types=1);

// EnergyRadioStations SDK utility: result_body

class EnergyRadioStationsResultBody
{
    public static function call(EnergyRadioStationsContext $ctx): ?EnergyRadioStationsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
