

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"ageReduction","req":false,"short":"Calculated Age Reduction","type":"`$NUMBER`","index$":0},{"active":true,"name":"athletesInLeague","req":false,"short":"Total athletes in target league","type":"`$INTEGER`","index$":1},{"active":true,"name":"biologicalAge","req":true,"short":"Calculated biological age","type":"`$NUMBER`","index$":2},{"active":true,"name":"chronologicalAge","req":true,"short":"Actual age in years","type":"`$NUMBER`","index$":3},{"active":true,"name":"division","req":false,"short":"Target division for preview","type":"`$STRING`","index$":4},{"active":true,"name":"estimatedRank","req":false,"short":"Estimated ranking position","type":"`$INTEGER`","index$":5},{"active":true,"name":"estimatedUltimateLeagueRank","req":false,"short":"Estimated Ultimate League rank","type":"`$INTEGER`","index$":6},{"active":true,"name":"league","req":false,"short":"Target league for preview","type":"`$STRING`","index$":7},{"active":true,"name":"percentile","req":false,"short":"Percentile ranking","type":"`$NUMBER`","index$":8}],"name":"rank_preview","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /data/rank-preview","json":"{\"operationId\":\"previewRank\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"biologicalAge\":{\"description\":\"Calculated biological age\",\"type\":\"number\"},\"chronologicalAge\":{\"description\":\"Actual age in years\",\"type\":\"number\"},\"division\":{\"description\":\"Target division for preview\",\"type\":\"string\"},\"league\":{\"description\":\"Target league for preview\",\"enum\":[\"Pro\",\"Amateur\"],\"type\":\"string\"}},\"required\":[\"chronologicalAge\",\"biologicalAge\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"ageReduction\":{\"description\":\"Calculated Age Reduction\",\"type\":\"number\"},\"athletesInLeague\":{\"description\":\"Total athletes in target league\",\"type\":\"integer\"},\"estimatedRank\":{\"description\":\"Estimated ranking position\",\"type\":\"integer\"},\"estimatedUltimateLeagueRank\":{\"description\":\"Estimated Ultimate League rank\",\"type\":\"integer\"},\"percentile\":{\"description\":\"Percentile ranking\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Successful rank preview\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid preview data\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/data/rank-preview","segments":[{"lit":"data"},{"lit":"rank-preview"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"rank_preview","name__orig":"rank_preview","Name":"RankPreview","name_":"rank_preview","name-":"rank-preview","NAME":"RANK_PREVIEW","index$":5}, {"active":true,"entity":"rank_preview","key$":"BasicRankPreviewFlow","kind":"basic","name":"BasicRankPreviewFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"rank_preview_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'RankPreview')
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
  
