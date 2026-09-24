
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LongevityCompetitionSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = LongevityCompetitionSDK.test()
    equal(testsdk instanceof LongevityCompetitionSDK, true,
      'LongevityCompetitionSDK.test() must return a client synchronously')
  })

})
