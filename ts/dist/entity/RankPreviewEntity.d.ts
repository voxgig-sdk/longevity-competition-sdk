import { LongevityCompetitionEntityBase } from '../LongevityCompetitionEntityBase';
import type { LongevityCompetitionSDK } from '../LongevityCompetitionSDK';
import type { Control } from '../types';
import type { RankPreview, RankPreviewCreateData } from '../LongevityCompetitionTypes';
declare class RankPreviewEntity extends LongevityCompetitionEntityBase<RankPreview> {
    constructor(client: LongevityCompetitionSDK, entopts: any);
    make(this: RankPreviewEntity): RankPreviewEntity;
    create(this: any, reqdata?: RankPreviewCreateData, ctrl?: Control): Promise<RankPreviewEntity>;
}
export { RankPreviewEntity };
