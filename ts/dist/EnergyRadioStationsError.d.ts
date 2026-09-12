import { Context } from './Context';
declare class EnergyRadioStationsError extends Error {
    isEnergyRadioStationsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { EnergyRadioStationsError };
