# LongevityCompetition SDK utility: make_context

from core.context import LongevityCompetitionContext


def make_context_util(ctxmap, basectx):
    return LongevityCompetitionContext(ctxmap, basectx)
