import { EnergyRadioStationsEntityBase } from '../EnergyRadioStationsEntityBase';
import type { EnergyRadioStationsSDK } from '../EnergyRadioStationsSDK';
import type { Control } from '../types';
import type { Playout, PlayoutListMatch } from '../EnergyRadioStationsTypes';
declare class PlayoutEntity extends EnergyRadioStationsEntityBase<Playout> {
    constructor(client: EnergyRadioStationsSDK, entopts: any);
    make(this: PlayoutEntity): PlayoutEntity;
    list(this: any, reqmatch?: PlayoutListMatch, ctrl?: Control): Promise<PlayoutEntity[]>;
}
export { PlayoutEntity };
