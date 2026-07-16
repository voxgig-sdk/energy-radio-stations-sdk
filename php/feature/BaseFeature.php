<?php
declare(strict_types=1);

// EnergyRadioStations SDK base feature

class EnergyRadioStationsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(EnergyRadioStationsContext $ctx, array $options): void {}
    public function PostConstruct(EnergyRadioStationsContext $ctx): void {}
    public function PostConstructEntity(EnergyRadioStationsContext $ctx): void {}
    public function SetData(EnergyRadioStationsContext $ctx): void {}
    public function GetData(EnergyRadioStationsContext $ctx): void {}
    public function GetMatch(EnergyRadioStationsContext $ctx): void {}
    public function SetMatch(EnergyRadioStationsContext $ctx): void {}
    public function PrePoint(EnergyRadioStationsContext $ctx): void {}
    public function PreSpec(EnergyRadioStationsContext $ctx): void {}
    public function PreRequest(EnergyRadioStationsContext $ctx): void {}
    public function PreResponse(EnergyRadioStationsContext $ctx): void {}
    public function PreResult(EnergyRadioStationsContext $ctx): void {}
    public function PreDone(EnergyRadioStationsContext $ctx): void {}
    public function PreUnexpected(EnergyRadioStationsContext $ctx): void {}
}
