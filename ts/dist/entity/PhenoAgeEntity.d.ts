import { LongevityCompetitionEntityBase } from '../LongevityCompetitionEntityBase';
import type { LongevityCompetitionSDK } from '../LongevityCompetitionSDK';
import type { Control } from '../types';
import type { PhenoAge, PhenoAgeCreateData } from '../LongevityCompetitionTypes';
declare class PhenoAgeEntity extends LongevityCompetitionEntityBase<PhenoAge> {
    constructor(client: LongevityCompetitionSDK, entopts: any);
    make(this: PhenoAgeEntity): PhenoAgeEntity;
    create(this: any, reqdata?: PhenoAgeCreateData, ctrl?: Control): Promise<PhenoAgeEntity>;
}
export { PhenoAgeEntity };
