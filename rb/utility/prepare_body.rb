# LongevityCompetition SDK utility: prepare_body
require_relative 'media'
module LongevityCompetitionUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return LongevityCompetitionUtilities.raw_body(ctx.reqdata) if LongevityCompetitionUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
