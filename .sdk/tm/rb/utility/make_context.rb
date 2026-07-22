# LongevityCompetition SDK utility: make_context
require_relative '../core/context'
module LongevityCompetitionUtilities
  MakeContext = ->(ctxmap, basectx) {
    LongevityCompetitionContext.new(ctxmap, basectx)
  }
end
