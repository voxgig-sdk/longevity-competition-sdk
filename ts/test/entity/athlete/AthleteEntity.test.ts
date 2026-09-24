

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ageReduction":{"a":true,"h":"Age Reduction","n":"ageReduction","r":false,"sh":"Age Reduction score (chronological age minus biological age)","t":"`$NUMBER`","key$":"ageReduction","index$":0},"biologicalAge":{"a":true,"h":"Biological Age","n":"biologicalAge","r":false,"sh":"Calculated biological age","t":"`$NUMBER`","key$":"biologicalAge","index$":1},"chronologicalAge":{"a":true,"h":"Chronological Age","n":"chronologicalAge","r":false,"sh":"Actual age in years","t":"`$NUMBER`","key$":"chronologicalAge","index$":2},"clockType":{"a":true,"h":"Clock Type","n":"clockType","r":false,"sh":"Biological aging clock used","t":"`$STRING`","key$":"clockType","index$":3},"country":{"a":true,"h":"Country","n":"country","r":false,"sh":"Country code","t":"`$STRING`","key$":"country","index$":4},"division":{"a":true,"h":"Division","n":"division","r":false,"sh":"Age division category","t":"`$STRING`","key$":"division","index$":5},"effectiveAgeReduction":{"a":true,"h":"Effective Age Reduction","n":"effectiveAgeReduction","r":false,"sh":"Effective Age Reduction used for ranking","t":"`$NUMBER`","key$":"effectiveAgeReduction","index$":6},"generation":{"a":true,"h":"Generation","n":"generation","r":false,"sh":"Generation category","t":"`$STRING`","key$":"generation","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique athlete identifier","t":"`$STRING`","key$":"id","index$":8},"lastUpdated":{"a":true,"fo":"date-time","h":"Last Updated","n":"lastUpdated","r":false,"sh":"Last result submission date","t":"`$STRING`","key$":"lastUpdated","index$":9},"league":{"a":true,"h":"League","n":"league","r":false,"sh":"Competition league","t":"`$STRING`","key$":"league","index$":10},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Athlete name","t":"`$STRING`","key$":"name","index$":11},"profileUrl":{"a":true,"fo":"uri","h":"Profile Url","n":"profileUrl","r":false,"sh":"URL to athlete's public profile","t":"`$STRING`","key$":"profileUrl","index$":12},"rank":{"a":true,"h":"Rank","n":"rank","r":false,"sh":"Current ranking position","t":"`$INTEGER`","key$":"rank","index$":13},"ultimateLeagueRank":{"a":true,"h":"Ultimate League Rank","n":"ultimateLeagueRank","r":false,"sh":"Rank in Ultimate League (combined Pro and Amateur)","t":"`$INTEGER`","key$":"ultimateLeagueRank","index$":14}},"id":{"field":"id","name":"id"},"name":"athlete","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /data/athletes","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"division","or":"division","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"league","or":"league","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":100,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/data/athletes","q":{"exist":["division","league","limit","offset"]},"r":{},"s":[{"lit":"data"},{"lit":"athletes"}],"t":{"req":"`reqdata`","res":"`body.athletes`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"athlete","name__orig":"athlete","Name":"Athlete","name_":"athlete","name-":"athlete","NAME":"ATHLETE","index$":0}, {"active":true,"entity":"athlete","key$":"BasicAthleteFlow","kind":"basic","name":"BasicAthleteFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"athlete_ref01"}}],"index$":0}]}, 'Athlete', {"GET /data/athletes":{"protocol":"http","operationId":"getAthletes","responses":{"200":{"description":"Successful response with athlete data","content":{"application/json":{"schema":{"type":"object","properties":{"athletes":{"items":{"properties":{"ageReduction":{"description":"Age Reduction score (chronological age minus biological age)","type":"number","key$":"ageReduction"},"biologicalAge":{"description":"Calculated biological age","type":"number","key$":"biologicalAge"},"chronologicalAge":{"description":"Actual age in years","type":"number","key$":"chronologicalAge"},"clockType":{"description":"Biological aging clock used","enum":["PhenoAge","BortzAge"],"type":"string","key$":"clockType"},"country":{"description":"Country code","type":"string","key$":"country"},"division":{"description":"Age division category","type":"string","key$":"division"},"effectiveAgeReduction":{"description":"Effective Age Reduction used for ranking","type":"number","key$":"effectiveAgeReduction"},"generation":{"description":"Generation category","type":"string","key$":"generation"},"id":{"description":"Unique athlete identifier","type":"string","key$":"id"},"lastUpdated":{"description":"Last result submission date","format":"date-time","type":"string","key$":"lastUpdated"},"league":{"description":"Competition league","enum":["Pro","Amateur"],"type":"string","key$":"league"},"name":{"description":"Athlete name","type":"string","key$":"name"},"profileUrl":{"description":"URL to athlete's public profile","format":"uri","type":"string","key$":"profileUrl"},"rank":{"description":"Current ranking position","type":"integer","key$":"rank"},"ultimateLeagueRank":{"description":"Rank in Ultimate League (combined Pro and Amateur)","type":"integer","key$":"ultimateLeagueRank"}},"type":"object","x-ref":"#/components/schemas/Athlete","index$":0},"key$":"athletes","type":"array"},"total":{"description":"Total number of athletes matching the query","key$":"total","type":"integer"},"limit":{"description":"Number of results per page","key$":"limit","type":"integer"},"offset":{"description":"Current offset in the result set","key$":"offset","type":"integer"}}}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"league","in":"query","description":"Filter athletes by league (e.g., Ultimate, Pro, Amateur)","required":false,"schema":{"type":"string","enum":["Ultimate","Pro","Amateur"]},"index$":0},{"name":"division","in":"query","description":"Filter athletes by age division","required":false,"schema":{"type":"string"},"index$":1},{"name":"limit","in":"query","description":"Maximum number of athletes to return","required":false,"schema":{"type":"integer","minimum":1,"maximum":1000,"default":100},"index$":2},{"name":"offset","in":"query","description":"Number of athletes to skip for pagination","required":false,"schema":{"type":"integer","minimum":0,"default":0},"index$":3}],"securitySource":"unspecified"}})
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
  
