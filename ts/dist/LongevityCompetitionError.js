"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongevityCompetitionError = void 0;
class LongevityCompetitionError extends Error {
    isLongevityCompetitionError = true;
    sdk = 'LongevityCompetition';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.LongevityCompetitionError = LongevityCompetitionError;
//# sourceMappingURL=LongevityCompetitionError.js.map