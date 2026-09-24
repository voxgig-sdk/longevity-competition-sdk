

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


describe('CompetitionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LONGEVITY_COMPETITION_TEST_LIVE=TRUE.
  afterEach(liveDelay('LONGEVITY_COMPETITION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LongevityCompetitionSDK.test()
    const ent = testsdk.Competition()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LONGEVITY_COMPETITION_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'competition.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ageRange":{"a":true,"h":"Age Range","n":"ageRange","r":false,"sh":"Age range for this division","t":"`$STRING`","key$":"ageRange","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Division identifier","t":"`$STRING`","key$":"id","index$":1},"maxAge":{"a":true,"h":"Max Age","n":"maxAge","r":false,"sh":"Maximum age for division","t":"`$INTEGER`","key$":"maxAge","index$":2},"minAge":{"a":true,"h":"Min Age","n":"minAge","r":false,"sh":"Minimum age for division","t":"`$INTEGER`","key$":"minAge","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Division name","t":"`$STRING`","key$":"name","index$":4}},"id":{"field":"id","name":"id"},"name":"competition","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /data/divisions","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/data/divisions","q":{},"r":{},"s":[{"lit":"data"},{"lit":"divisions"}],"t":{"req":"`reqdata`","res":"`body.divisions`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"competition","name__orig":"competition","Name":"Competition","name_":"competition","name-":"competition","NAME":"COMPETITION","index$":2}, {"active":true,"entity":"competition","key$":"BasicCompetitionFlow","kind":"basic","name":"BasicCompetitionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"competition_ref01"}}],"index$":0}]}, 'Competition', {"GET /data/divisions":{"protocol":"http","operationId":"getDivisions","responses":{"200":{"description":"Successful response with division data","content":{"application/json":{"schema":{"type":"object","properties":{"divisions":{"items":{"properties":{"ageRange":{"description":"Age range for this division","type":"string","key$":"ageRange"},"id":{"description":"Division identifier","type":"string","key$":"id"},"maxAge":{"description":"Maximum age for division","type":"integer","key$":"maxAge"},"minAge":{"description":"Minimum age for division","type":"integer","key$":"minAge"},"name":{"description":"Division name","type":"string","key$":"name"}},"type":"object","x-ref":"#/components/schemas/Division","index$":0},"key$":"divisions","type":"array"}}}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let competition_ref01_data = Object.values(setup.data.existing.competition)[0] as any

    // LIST
    const competition_ref01_ent = client.Competition()
    const competition_ref01_match: any = {}

    const competition_ref01_list = (await competition_ref01_ent.list(competition_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/competition/CompetitionTestData.json')

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
    ['competition01','competition02','competition03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LONGEVITY_COMPETITION_TEST_COMPETITION_ENTID': idmap,
    'LONGEVITY_COMPETITION_TEST_LIVE': 'FALSE',
    'LONGEVITY_COMPETITION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LONGEVITY_COMPETITION_TEST_COMPETITION_ENTID']

  const live = 'TRUE' === env.LONGEVITY_COMPETITION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LONGEVITY_COMPETITION_TEST_COMPETITION_ENTID']
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
  
