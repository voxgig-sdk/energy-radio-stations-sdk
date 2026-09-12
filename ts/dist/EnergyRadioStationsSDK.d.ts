import { PlayoutEntity } from './entity/PlayoutEntity';
export type * from './EnergyRadioStationsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { EnergyRadioStationsEntityBase } from './EnergyRadioStationsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class EnergyRadioStationsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Playout(entopts?: Record<string, any>): PlayoutEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): EnergyRadioStationsSDK;
    tester(testopts?: any, sdkopts?: any): EnergyRadioStationsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof EnergyRadioStationsSDK;
export { stdutil, config, BaseFeature, EnergyRadioStationsEntityBase, EnergyRadioStationsSDK, SDK, };
