

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ageReduction":{"a":true,"h":"Age Reduction","n":"ageReduction","r":false,"sh":"Calculated Age Reduction","t":"`$NUMBER`","key$":"ageReduction","index$":0},"biomarkers":{"a":true,"h":"Biomarkers","n":"biomarkers","r":true,"sh":"Blood biomarker values required for Pheno Age calculation","t":"`$OBJECT`","key$":"biomarkers","index$":1},"calculationMethod":{"a":true,"h":"Calculation Method","n":"calculationMethod","r":false,"sh":"Algorithm version used","t":"`$STRING`","key$":"calculationMethod","index$":2},"chronologicalAge":{"a":true,"h":"Chronological Age","n":"chronologicalAge","op":{"create":{"req":true,"type":"`$NUMBER`"}},"r":false,"sh":"Input chronological age","t":"`$NUMBER`","key$":"chronologicalAge","index$":3},"phenoAge":{"a":true,"h":"Pheno Age","n":"phenoAge","r":false,"sh":"Calculated phenotypic biological age","t":"`$NUMBER`","key$":"phenoAge","index$":4}},"name":"pheno_age","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /data/pheno-age","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/data/pheno-age","q":{},"r":{},"s":[{"lit":"data"},{"lit":"pheno-age"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"pheno_age","name__orig":"pheno_age","Name":"PhenoAge","name_":"pheno_age","name-":"pheno-age","NAME":"PHENO_AGE","index$":4}, {"active":true,"entity":"pheno_age","key$":"BasicPhenoAgeFlow","kind":"basic","name":"BasicPhenoAgeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"pheno_age_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'PhenoAge', {"POST /data/pheno-age":{"protocol":"http","operationId":"calculatePhenoAge","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["chronologicalAge","biomarkers"],"properties":{"chronologicalAge":{"type":"number","description":"Actual age in years","key$":"chronologicalAge"},"biomarkers":{"type":"object","description":"Blood biomarker values required for Pheno Age calculation","properties":{"albumin":{"type":"number","description":"Albumin level (g/dL)"},"creatinine":{"type":"number","description":"Creatinine level (mg/dL)"},"glucose":{"type":"number","description":"Glucose level (mg/dL)"},"crp":{"type":"number","description":"C-reactive protein (mg/L)"},"lymphocytePercent":{"type":"number","description":"Lymphocyte percentage"},"mcv":{"type":"number","description":"Mean corpuscular volume (fL)"},"rdw":{"type":"number","description":"Red cell distribution width (%)"},"alkalinePhosphatase":{"type":"number","description":"Alkaline phosphatase (U/L)"},"whiteBloodCellCount":{"type":"number","description":"White blood cell count (1000 cells/µL)"}},"key$":"biomarkers"}},"x-ref":"#/components/schemas/PhenoAgeRequest","index$":1}}}},"responses":{"200":{"description":"Successful Pheno Age calculation","content":{"application/json":{"schema":{"type":"object","properties":{"phenoAge":{"type":"number","description":"Calculated phenotypic biological age","key$":"phenoAge"},"chronologicalAge":{"type":"number","description":"Input chronological age","key$":"chronologicalAge"},"ageReduction":{"type":"number","description":"Calculated Age Reduction","key$":"ageReduction"},"calculationMethod":{"type":"string","description":"Algorithm version used","key$":"calculationMethod"}},"x-ref":"#/components/schemas/PhenoAgeResponse","index$":0}}}},"400":{"description":"Invalid biomarker data","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
