# LongevityCompetition SDK feature factory

from feature.base_feature import LongevityCompetitionBaseFeature
from feature.test_feature import LongevityCompetitionTestFeature


def _make_feature(name):
    features = {
        "base": lambda: LongevityCompetitionBaseFeature(),
        "test": lambda: LongevityCompetitionTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
