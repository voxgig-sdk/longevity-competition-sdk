import { LongevityCompetitionEntityBase } from '../LongevityCompetitionEntityBase';
import type { LongevityCompetitionSDK } from '../LongevityCompetitionSDK';
import type { Control } from '../types';
import type { BortzAge, BortzAgeCreateData } from '../LongevityCompetitionTypes';
declare class BortzAgeEntity extends LongevityCompetitionEntityBase<BortzAge> {
    constructor(client: LongevityCompetitionSDK, entopts: any);
    make(this: BortzAgeEntity): BortzAgeEntity;
    create(this: any, reqdata?: BortzAgeCreateData, ctrl?: Control): Promise<BortzAgeEntity>;
}
export { BortzAgeEntity };
