
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { LongevityCompetitionSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await LongevityCompetitionSDK.test()
    equal(null !== testsdk, true)
  })

})
