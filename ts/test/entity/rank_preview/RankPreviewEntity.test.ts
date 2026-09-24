

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


describe('RankPreviewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LONGEVITY_COMPETITION_TEST_LIVE=TRUE.
  afterEach(liveDelay('LONGEVITY_COMPETITION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LongevityCompetitionSDK.test()
    const ent = testsdk.RankPreview()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LONGEVITY_COMPETITION_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'rank_preview.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ageReduction":{"a":true,"h":"Age Reduction","n":"ageReduction","r":false,"sh":"Calculated Age Reduction","t":"`$NUMBER`","key$":"ageReduction","index$":0},"athletesInLeague":{"a":true,"h":"Athletes In League","n":"athletesInLeague","r":false,"sh":"Total athletes in target league","t":"`$INTEGER`","key$":"athletesInLeague","index$":1},"biologicalAge":{"a":true,"h":"Biological Age","n":"biologicalAge","r":true,"sh":"Calculated biological age","t":"`$NUMBER`","key$":"biologicalAge","index$":2},"chronologicalAge":{"a":true,"h":"Chronological Age","n":"chronologicalAge","r":true,"sh":"Actual age in years","t":"`$NUMBER`","key$":"chronologicalAge","index$":3},"division":{"a":true,"h":"Division","n":"division","r":false,"sh":"Target division for preview","t":"`$STRING`","key$":"division","index$":4},"estimatedRank":{"a":true,"h":"Estimated Rank","n":"estimatedRank","r":false,"sh":"Estimated ranking position","t":"`$INTEGER`","key$":"estimatedRank","index$":5},"estimatedUltimateLeagueRank":{"a":true,"h":"Estimated Ultimate League Rank","n":"estimatedUltimateLeagueRank","r":false,"sh":"Estimated Ultimate League rank","t":"`$INTEGER`","key$":"estimatedUltimateLeagueRank","index$":6},"league":{"a":true,"h":"League","n":"league","r":false,"sh":"Target league for preview","t":"`$STRING`","key$":"league","index$":7},"percentile":{"a":true,"h":"Percentile","n":"percentile","r":false,"sh":"Percentile ranking","t":"`$NUMBER`","key$":"percentile","index$":8}},"name":"rank_preview","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /data/rank-preview","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/data/rank-preview","q":{},"r":{},"s":[{"lit":"data"},{"lit":"rank-preview"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"rank_preview","name__orig":"rank_preview","Name":"RankPreview","name_":"rank_preview","name-":"rank-preview","NAME":"RANK_PREVIEW","index$":5}, {"active":true,"entity":"rank_preview","key$":"BasicRankPreviewFlow","kind":"basic","name":"BasicRankPreviewFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"rank_preview_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'RankPreview', {"POST /data/rank-preview":{"protocol":"http","operationId":"previewRank","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["chronologicalAge","biologicalAge"],"properties":{"chronologicalAge":{"type":"number","description":"Actual age in years","key$":"chronologicalAge"},"biologicalAge":{"type":"number","description":"Calculated biological age","key$":"biologicalAge"},"league":{"type":"string","enum":["Pro","Amateur"],"description":"Target league for preview","key$":"league"},"division":{"type":"string","description":"Target division for preview","key$":"division"}},"x-ref":"#/components/schemas/RankPreviewRequest","index$":1}}}},"responses":{"200":{"description":"Successful rank preview","content":{"application/json":{"schema":{"type":"object","properties":{"estimatedRank":{"type":"integer","description":"Estimated ranking position","key$":"estimatedRank"},"estimatedUltimateLeagueRank":{"type":"integer","description":"Estimated Ultimate League rank","key$":"estimatedUltimateLeagueRank"},"ageReduction":{"type":"number","description":"Calculated Age Reduction","key$":"ageReduction"},"percentile":{"type":"number","description":"Percentile ranking","key$":"percentile"},"athletesInLeague":{"type":"integer","description":"Total athletes in target league","key$":"athletesInLeague"}},"x-ref":"#/components/schemas/RankPreviewResponse","index$":0}}}},"400":{"description":"Invalid preview data","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const rank_preview_ref01_ent = client.RankPreview()
    let rank_preview_ref01_data = setup.data.new.rank_preview['rank_preview_ref01']

    rank_preview_ref01_data = (await rank_preview_ref01_ent.create(rank_preview_ref01_data)).data()
    assert(null != rank_preview_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/rank_preview/RankPreviewTestData.json')

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
    ['rank_preview01','rank_preview02','rank_preview03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LONGEVITY_COMPETITION_TEST_RANK_PREVIEW_ENTID': idmap,
    'LONGEVITY_COMPETITION_TEST_LIVE': 'FALSE',
    'LONGEVITY_COMPETITION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LONGEVITY_COMPETITION_TEST_RANK_PREVIEW_ENTID']

  const live = 'TRUE' === env.LONGEVITY_COMPETITION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LONGEVITY_COMPETITION_TEST_RANK_PREVIEW_ENTID']
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
  
