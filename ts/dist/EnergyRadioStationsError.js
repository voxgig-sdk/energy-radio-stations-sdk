"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyRadioStationsError = void 0;
class EnergyRadioStationsError extends Error {
    isEnergyRadioStationsError = true;
    sdk = 'EnergyRadioStations';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.EnergyRadioStationsError = EnergyRadioStationsError;
//# sourceMappingURL=EnergyRadioStationsError.js.map