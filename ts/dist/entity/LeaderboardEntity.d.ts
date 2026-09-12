import { LongevityCompetitionEntityBase } from '../LongevityCompetitionEntityBase';
import type { LongevityCompetitionSDK } from '../LongevityCompetitionSDK';
import type { Control } from '../types';
import type { Leaderboard, LeaderboardListMatch } from '../LongevityCompetitionTypes';
declare class LeaderboardEntity extends LongevityCompetitionEntityBase<Leaderboard> {
    constructor(client: LongevityCompetitionSDK, entopts: any);
    make(this: LeaderboardEntity): LeaderboardEntity;
    list(this: any, reqmatch?: LeaderboardListMatch, ctrl?: Control): Promise<LeaderboardEntity[]>;
}
export { LeaderboardEntity };
