import { Context } from './Context';
declare class LongevityCompetitionError extends Error {
    isLongevityCompetitionError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { LongevityCompetitionError };
