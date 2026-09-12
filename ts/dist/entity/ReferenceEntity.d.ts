import { LongevityCompetitionEntityBase } from '../LongevityCompetitionEntityBase';
import type { LongevityCompetitionSDK } from '../LongevityCompetitionSDK';
import type { Control } from '../types';
import type { Reference, ReferenceListMatch } from '../LongevityCompetitionTypes';
declare class ReferenceEntity extends LongevityCompetitionEntityBase<Reference> {
    constructor(client: LongevityCompetitionSDK, entopts: any);
    make(this: ReferenceEntity): ReferenceEntity;
    list(this: any, reqmatch?: ReferenceListMatch, ctrl?: Control): Promise<ReferenceEntity[]>;
}
export { ReferenceEntity };
