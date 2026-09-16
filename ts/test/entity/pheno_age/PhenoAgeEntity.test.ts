

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


describe('PhenoAgeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LONGEVITY_COMPETITION_TEST_LIVE=TRUE.
  afterEach(liveDelay('LONGEVITY_COMPETITION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LongevityCompetitionSDK.test()
    const ent = testsdk.PhenoAge()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LONGEVITY_COMPETITION_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pheno_age.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"ageReduction","req":false,"short":"Calculated Age Reduction","type":"`$NUMBER`","index$":0},{"active":true,"name":"biomarkers","req":true,"short":"Blood biomarker values required for Pheno Age calculation","type":"`$OBJECT`","index$":1},{"active":true,"name":"calculationMethod","req":false,"short":"Algorithm version used","type":"`$STRING`","index$":2},{"active":true,"name":"chronologicalAge","op":{"create":{"req":true,"type":"`$NUMBER`"}},"req":false,"short":"Input chronological age","type":"`$NUMBER`","index$":3},{"active":true,"name":"phenoAge","req":false,"short":"Calculated phenotypic biological age","type":"`$NUMBER`","index$":4}],"name":"pheno_age","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /data/pheno-age","json":"{\"operationId\":\"calculatePhenoAge\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"biomarkers\":{\"description\":\"Blood biomarker values required for Pheno Age calculation\",\"properties\":{\"albumin\":{\"description\":\"Albumin level (g/dL)\",\"type\":\"number\"},\"alkalinePhosphatase\":{\"description\":\"Alkaline phosphatase (U/L)\",\"type\":\"number\"},\"creatinine\":{\"description\":\"Creatinine level (mg/dL)\",\"type\":\"number\"},\"crp\":{\"description\":\"C-reactive protein (mg/L)\",\"type\":\"number\"},\"glucose\":{\"description\":\"Glucose level (mg/dL)\",\"type\":\"number\"},\"lymphocytePercent\":{\"description\":\"Lymphocyte percentage\",\"type\":\"number\"},\"mcv\":{\"description\":\"Mean corpuscular volume (fL)\",\"type\":\"number\"},\"rdw\":{\"description\":\"Red cell distribution width (%)\",\"type\":\"number\"},\"whiteBloodCellCount\":{\"description\":\"White blood cell count (1000 cells/µL)\",\"type\":\"number\"}},\"type\":\"object\"},\"chronologicalAge\":{\"description\":\"Actual age in years\",\"type\":\"number\"}},\"required\":[\"chronologicalAge\",\"biomarkers\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"ageReduction\":{\"description\":\"Calculated Age Reduction\",\"type\":\"number\"},\"calculationMethod\":{\"description\":\"Algorithm version used\",\"type\":\"string\"},\"chronologicalAge\":{\"description\":\"Input chronological age\",\"type\":\"number\"},\"phenoAge\":{\"description\":\"Calculated phenotypic biological age\",\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Successful Pheno Age calculation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid biomarker data\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/data/pheno-age","segments":[{"lit":"data"},{"lit":"pheno-age"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"pheno_age","name__orig":"pheno_age","Name":"PhenoAge","name_":"pheno_age","name-":"pheno-age","NAME":"PHENO_AGE","index$":4}, {"active":true,"entity":"pheno_age","key$":"BasicPhenoAgeFlow","kind":"basic","name":"BasicPhenoAgeFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"pheno_age_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'PhenoAge')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const pheno_age_ref01_ent = client.PhenoAge()
    let pheno_age_ref01_data = setup.data.new.pheno_age['pheno_age_ref01']

    pheno_age_ref01_data = (await pheno_age_ref01_ent.create(pheno_age_ref01_data)).data()
    assert(null != pheno_age_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/pheno_age/PhenoAgeTestData.json')

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
    ['pheno_age01','pheno_age02','pheno_age03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LONGEVITY_COMPETITION_TEST_PHENO_AGE_ENTID': idmap,
    'LONGEVITY_COMPETITION_TEST_LIVE': 'FALSE',
    'LONGEVITY_COMPETITION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LONGEVITY_COMPETITION_TEST_PHENO_AGE_ENTID']

  const live = 'TRUE' === env.LONGEVITY_COMPETITION_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LONGEVITY_COMPETITION_TEST_PHENO_AGE_ENTID']
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
  
