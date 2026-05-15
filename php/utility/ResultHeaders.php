<?php
declare(strict_types=1);

// EnergyRadioStations SDK utility: result_headers

class EnergyRadioStationsResultHeaders
{
    public static function call(EnergyRadioStationsContext $ctx): ?EnergyRadioStationsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
