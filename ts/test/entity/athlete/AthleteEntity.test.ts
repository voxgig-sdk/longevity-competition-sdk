

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


describe('AthleteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LONGEVITY_COMPETITION_TEST_LIVE=TRUE.
  afterEach(liveDelay('LONGEVITY_COMPETITION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LongevityCompetitionSDK.test()
    const ent = testsdk.Athlete()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LONGEVITY_COMPETITION_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'athlete.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"ageReduction","req":false,"short":"Age Reduction score (chronological age minus biological age)","type":"`$NUMBER`","index$":0},{"active":true,"name":"biologicalAge","req":false,"short":"Calculated biological age","type":"`$NUMBER`","index$":1},{"active":true,"name":"chronologicalAge","req":false,"short":"Actual age in years","type":"`$NUMBER`","index$":2},{"active":true,"name":"clockType","req":false,"short":"Biological aging clock used","type":"`$STRING`","index$":3},{"active":true,"name":"country","req":false,"short":"Country code","type":"`$STRING`","index$":4},{"active":true,"name":"division","req":false,"short":"Age division category","type":"`$STRING`","index$":5},{"active":true,"name":"effectiveAgeReduction","req":false,"short":"Effective Age Reduction used for ranking","type":"`$NUMBER`","index$":6},{"active":true,"name":"generation","req":false,"short":"Generation category","type":"`$STRING`","index$":7},{"active":true,"name":"id","req":false,"short":"Unique athlete identifier","type":"`$STRING`","index$":8},{"active":true,"format":"date-time","name":"lastUpdated","req":false,"short":"Last result submission date","type":"`$STRING`","index$":9},{"active":true,"name":"league","req":false,"short":"Competition league","type":"`$STRING`","index$":10},{"active":true,"name":"name","req":false,"short":"Athlete name","type":"`$STRING`","index$":11},{"active":true,"format":"uri","name":"profileUrl","req":false,"short":"URL to athlete's public profile","type":"`$STRING`","index$":12},{"active":true,"name":"rank","req":false,"short":"Current ranking position","type":"`$INTEGER`","index$":13},{"active":true,"name":"ultimateLeagueRank","req":false,"short":"Rank in Ultimate League (combined Pro and Amateur)","type":"`$INTEGER`","index$":14}],"id":{"field":"id","name":"id"},"name":"athlete","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"division","orig":"division","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"league","orig":"league","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":100,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":3}]},"contract":{"id":"GET /data/athletes","json":"{\"operationId\":\"getAthletes\",\"parameters\":[{\"description\":\"Filter athletes by league (e.g., Ultimate, Pro, Amateur)\",\"in\":\"query\",\"name\":\"league\",\"required\":false,\"schema\":{\"enum\":[\"Ultimate\",\"Pro\",\"Amateur\"],\"type\":\"string\"}},{\"description\":\"Filter athletes by age division\",\"in\":\"query\",\"name\":\"division\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Maximum number of athletes to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":100,\"maximum\":1000,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of athletes to skip for pagination\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"athletes\":{\"items\":{\"properties\":{\"ageReduction\":{\"description\":\"Age Reduction score (chronological age minus biological age)\",\"type\":\"number\"},\"biologicalAge\":{\"description\":\"Calculated biological age\",\"type\":\"number\"},\"chronologicalAge\":{\"description\":\"Actual age in years\",\"type\":\"number\"},\"clockType\":{\"description\":\"Biological aging clock used\",\"enum\":[\"PhenoAge\",\"BortzAge\"],\"type\":\"string\"},\"country\":{\"description\":\"Country code\",\"type\":\"string\"},\"division\":{\"description\":\"Age division category\",\"type\":\"string\"},\"effectiveAgeReduction\":{\"description\":\"Effective Age Reduction used for ranking\",\"type\":\"number\"},\"generation\":{\"description\":\"Generation category\",\"type\":\"string\"},\"id\":{\"description\":\"Unique athlete identifier\",\"type\":\"string\"},\"lastUpdated\":{\"description\":\"Last result submission date\",\"format\":\"date-time\",\"type\":\"string\"},\"league\":{\"description\":\"Competition league\",\"enum\":[\"Pro\",\"Amateur\"],\"type\":\"string\"},\"name\":{\"description\":\"Athlete name\",\"type\":\"string\"},\"profileUrl\":{\"description\":\"URL to athlete's public profile\",\"format\":\"uri\",\"type\":\"string\"},\"rank\":{\"description\":\"Current ranking position\",\"type\":\"integer\"},\"ultimateLeagueRank\":{\"description\":\"Rank in Ultimate League (combined Pro and Amateur)\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"limit\":{\"description\":\"Number of results per page\",\"type\":\"integer\"},\"offset\":{\"description\":\"Current offset in the result set\",\"type\":\"integer\"},\"total\":{\"description\":\"Total number of athletes matching the query\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with athlete data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/data/athletes","segments":[{"lit":"data"},{"lit":"athletes"}],"select":{"exist":["division","league","limit","offset"]},"transform":{"req":"`reqdata`","res":"`body.athletes`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"athlete","name__orig":"athlete","Name":"Athlete","name_":"athlete","name-":"athlete","NAME":"ATHLETE","index$":0}, {"active":true,"entity":"athlete","key$":"BasicAthleteFlow","kind":"basic","name":"BasicAthleteFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"athlete_ref01"}}],"index$":0}]}, 'Athlete')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let athlete_ref01_data = Object.values(setup.data.existing.athlete)[0] as any

    // LIST
    const athlete_ref01_ent = client.Athlete()
    const athlete_ref01_match: any = {}

    const athlete_ref01_list = (await athlete_ref01_ent.list(athlete_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/athlete/AthleteTestData.json')

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
    ['athlete01','athlete02','athlete03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LONGEVITY_COMPETITION_TEST_ATHLETE_ENTID': idmap,
    'LONGEVITY_COMPETITION_TEST_LIVE': 'FALSE',
    'LONGEVITY_COMPETITION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LONGEVITY_COMPETITION_TEST_ATHLETE_ENTID']

  const live = 'TRUE' === env.LONGEVITY_COMPETITION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LONGEVITY_COMPETITION_TEST_ATHLETE_ENTID']
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
  
