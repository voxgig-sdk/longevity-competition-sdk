import { LongevityCompetitionEntityBase } from '../LongevityCompetitionEntityBase';
import type { LongevityCompetitionSDK } from '../LongevityCompetitionSDK';
import type { Control } from '../types';
import type { Competition, CompetitionListMatch } from '../LongevityCompetitionTypes';
declare class CompetitionEntity extends LongevityCompetitionEntityBase<Competition> {
    constructor(client: LongevityCompetitionSDK, entopts: any);
    make(this: CompetitionEntity): CompetitionEntity;
    list(this: any, reqmatch?: CompetitionListMatch, ctrl?: Control): Promise<CompetitionEntity[]>;
}
export { CompetitionEntity };
