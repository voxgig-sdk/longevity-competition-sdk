# LongevityCompetition SDK exists test

import pytest
from longevitycompetition_sdk import LongevityCompetitionSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = LongevityCompetitionSDK.test(None, None)
        assert testsdk is not None
