

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ageReduction":{"a":true,"h":"Age Reduction","n":"ageReduction","r":false,"sh":"Age Reduction score","t":"`$NUMBER`","key$":"ageReduction","index$":0},"athleteId":{"a":true,"h":"Athlete Id","n":"athleteId","r":false,"sh":"Athlete identifier","t":"`$STRING`","key$":"athleteId","index$":1},"athleteName":{"a":true,"h":"Athlete Name","n":"athleteName","r":false,"sh":"Athlete name","t":"`$STRING`","key$":"athleteName","index$":2},"country":{"a":true,"h":"Country","n":"country","r":false,"sh":"Country code","t":"`$STRING`","key$":"country","index$":3},"division":{"a":true,"h":"Division","n":"division","r":false,"sh":"Age division","t":"`$STRING`","key$":"division","index$":4},"league":{"a":true,"h":"League","n":"league","r":false,"sh":"Competition league","t":"`$STRING`","key$":"league","index$":5},"rank":{"a":true,"h":"Rank","n":"rank","r":false,"sh":"Current ranking position","t":"`$INTEGER`","key$":"rank","index$":6}},"name":"leaderboard","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /data/leaderboard","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"division","or":"division","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"league","or":"league","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/data/leaderboard","q":{"exist":["division","league"]},"r":{},"s":[{"lit":"data"},{"lit":"leaderboard"}],"t":{"req":"`reqdata`","res":"`body.rankings`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"leaderboard","name__orig":"leaderboard","Name":"Leaderboard","name_":"leaderboard","name-":"leaderboard","NAME":"LEADERBOARD","index$":3}, {"active":true,"entity":"leaderboard","key$":"BasicLeaderboardFlow","kind":"basic","name":"BasicLeaderboardFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"leaderboard_ref01"}}],"index$":0}]}, 'Leaderboard', {"GET /data/leaderboard":{"protocol":"http","operationId":"getLeaderboard","responses":{"200":{"description":"Successful response with leaderboard data","content":{"application/json":{"schema":{"type":"object","properties":{"rankings":{"items":{"properties":{"ageReduction":{"description":"Age Reduction score","type":"number","key$":"ageReduction"},"athleteId":{"description":"Athlete identifier","type":"string","key$":"athleteId"},"athleteName":{"description":"Athlete name","type":"string","key$":"athleteName"},"country":{"description":"Country code","type":"string","key$":"country"},"division":{"description":"Age division","type":"string","key$":"division"},"league":{"description":"Competition league","type":"string","key$":"league"},"rank":{"description":"Current ranking position","type":"integer","key$":"rank"}},"type":"object","x-ref":"#/components/schemas/LeaderboardEntry","index$":0},"key$":"rankings","type":"array"},"lastUpdated":{"description":"Timestamp of last leaderboard update","format":"date-time","key$":"lastUpdated","type":"string"}}}}}}},"parameters":[{"name":"league","in":"query","description":"Filter by league type","required":false,"schema":{"type":"string","enum":["Ultimate","Pro","Amateur","CrowdAge"]},"index$":0},{"name":"division","in":"query","description":"Filter by age division","required":false,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
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
  
