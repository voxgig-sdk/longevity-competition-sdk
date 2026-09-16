

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LongevityCompetitionSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('LeaderboardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LONGEVITY_COMPETITION_TEST_LIVE=TRUE.
  afterEach(liveDelay('LONGEVITY_COMPETITION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LongevityCompetitionSDK.test()
    const ent = testsdk.Leaderboard()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LONGEVITY_COMPETITION_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'leaderboard.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"ageReduction","req":false,"short":"Age Reduction score","type":"`$NUMBER`","index$":0},{"active":true,"name":"athleteId","req":false,"short":"Athlete identifier","type":"`$STRING`","index$":1},{"active":true,"name":"athleteName","req":false,"short":"Athlete name","type":"`$STRING`","index$":2},{"active":true,"name":"country","req":false,"short":"Country code","type":"`$STRING`","index$":3},{"active":true,"name":"division","req":false,"short":"Age division","type":"`$STRING`","index$":4},{"active":true,"name":"league","req":false,"short":"Competition league","type":"`$STRING`","index$":5},{"active":true,"name":"rank","req":false,"short":"Current ranking position","type":"`$INTEGER`","index$":6}],"name":"leaderboard","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"division","orig":"division","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"league","orig":"league","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /data/leaderboard","json":"{\"operationId\":\"getLeaderboard\",\"parameters\":[{\"description\":\"Filter by league type\",\"in\":\"query\",\"name\":\"league\",\"required\":false,\"schema\":{\"enum\":[\"Ultimate\",\"Pro\",\"Amateur\",\"CrowdAge\"],\"type\":\"string\"}},{\"description\":\"Filter by age division\",\"in\":\"query\",\"name\":\"division\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"lastUpdated\":{\"description\":\"Timestamp of last leaderboard update\",\"format\":\"date-time\",\"type\":\"string\"},\"rankings\":{\"items\":{\"properties\":{\"ageReduction\":{\"description\":\"Age Reduction score\",\"type\":\"number\"},\"athleteId\":{\"description\":\"Athlete identifier\",\"type\":\"string\"},\"athleteName\":{\"description\":\"Athlete name\",\"type\":\"string\"},\"country\":{\"description\":\"Country code\",\"type\":\"string\"},\"division\":{\"description\":\"Age division\",\"type\":\"string\"},\"league\":{\"description\":\"Competition league\",\"type\":\"string\"},\"rank\":{\"description\":\"Current ranking position\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with leaderboard data\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/leaderboard","segments":[{"lit":"data"},{"lit":"leaderboard"}],"select":{"exist":["division","league"]},"transform":{"req":"`reqdata`","res":"`body.rankings`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"leaderboard","name__orig":"leaderboard","Name":"Leaderboard","name_":"leaderboard","name-":"leaderboard","NAME":"LEADERBOARD","index$":3}, {"active":true,"entity":"leaderboard","key$":"BasicLeaderboardFlow","kind":"basic","name":"BasicLeaderboardFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"leaderboard_ref01"}}],"index$":0}]}, 'Leaderboard')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let leaderboard_ref01_data = Object.values(setup.data.existing.leaderboard)[0] as any

    // LIST
    const leaderboard_ref01_ent = client.Leaderboard()
    const leaderboard_ref01_match: any = {}

    const leaderboard_ref01_list = (await leaderboard_ref01_ent.list(leaderboard_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/leaderboard/LeaderboardTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LongevityCompetitionSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['leaderboard01','leaderboard02','leaderboard03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LONGEVITY_COMPETITION_TEST_LEADERBOARD_ENTID': idmap,
    'LONGEVITY_COMPETITION_TEST_LIVE': 'FALSE',
    'LONGEVITY_COMPETITION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LONGEVITY_COMPETITION_TEST_LEADERBOARD_ENTID']

  const live = 'TRUE' === env.LONGEVITY_COMPETITION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LONGEVITY_COMPETITION_TEST_LEADERBOARD_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LongevityCompetitionSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.LONGEVITY_COMPETITION_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
