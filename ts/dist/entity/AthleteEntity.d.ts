import { LongevityCompetitionEntityBase } from '../LongevityCompetitionEntityBase';
import type { LongevityCompetitionSDK } from '../LongevityCompetitionSDK';
import type { Control } from '../types';
import type { Athlete, AthleteListMatch } from '../LongevityCompetitionTypes';
declare class AthleteEntity extends LongevityCompetitionEntityBase<Athlete> {
    constructor(client: LongevityCompetitionSDK, entopts: any);
    make(this: AthleteEntity): AthleteEntity;
    list(this: any, reqmatch?: AthleteListMatch, ctrl?: Control): Promise<AthleteEntity[]>;
}
export { AthleteEntity };
