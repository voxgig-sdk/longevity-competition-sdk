import { AthleteEntity } from './entity/AthleteEntity';
import { BortzAgeEntity } from './entity/BortzAgeEntity';
import { CompetitionEntity } from './entity/CompetitionEntity';
import { LeaderboardEntity } from './entity/LeaderboardEntity';
import { PhenoAgeEntity } from './entity/PhenoAgeEntity';
import { RankPreviewEntity } from './entity/RankPreviewEntity';
import { ReferenceEntity } from './entity/ReferenceEntity';
export type * from './LongevityCompetitionTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { LongevityCompetitionEntityBase } from './LongevityCompetitionEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class LongevityCompetitionSDK {
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
    Athlete(entopts?: Record<string, any>): AthleteEntity;
    BortzAge(entopts?: Record<string, any>): BortzAgeEntity;
    Competition(entopts?: Record<string, any>): CompetitionEntity;
    Leaderboard(entopts?: Record<string, any>): LeaderboardEntity;
    PhenoAge(entopts?: Record<string, any>): PhenoAgeEntity;
    RankPreview(entopts?: Record<string, any>): RankPreviewEntity;
    Reference(entopts?: Record<string, any>): ReferenceEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): LongevityCompetitionSDK;
    tester(testopts?: any, sdkopts?: any): LongevityCompetitionSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof LongevityCompetitionSDK;
export { stdutil, config, BaseFeature, LongevityCompetitionEntityBase, LongevityCompetitionSDK, SDK, };
