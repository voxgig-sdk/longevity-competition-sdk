# LongevityCompetition SDK feature factory

from longevitycompetition_sdk.feature.base_feature import LongevityCompetitionBaseFeature
from longevitycompetition_sdk.feature.ratelimit_feature import LongevityCompetitionRatelimitFeature
from longevitycompetition_sdk.feature.retry_feature import LongevityCompetitionRetryFeature
from longevitycompetition_sdk.feature.test_feature import LongevityCompetitionTestFeature
from longevitycompetition_sdk.feature.timeout_feature import LongevityCompetitionTimeoutFeature


_FEATURES = {
    "base": lambda: LongevityCompetitionBaseFeature(),
    "ratelimit": lambda: LongevityCompetitionRatelimitFeature(),
    "retry": lambda: LongevityCompetitionRetryFeature(),
    "test": lambda: LongevityCompetitionTestFeature(),
    "timeout": lambda: LongevityCompetitionTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
