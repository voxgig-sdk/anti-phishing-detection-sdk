
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { AntiPhishingDetectionSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('DetectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ANTIPHISHINGDETECTION_TEST_LIVE=TRUE.
  afterEach(liveDelay('ANTIPHISHINGDETECTION_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AntiPhishingDetectionSDK.test()
    const ent = testsdk.Detection()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ANTI_PHISHING_DETECTION_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (maybeSkipControl(t, 'entityOp', 'detection.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set ANTI_PHISHING_DETECTION_TEST_DETECTION_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const detection_ref01_ent = client.Detection()
    let detection_ref01_data = setup.data.new.detection['detection_ref01']

    detection_ref01_data = await detection_ref01_ent.create(detection_ref01_data)
    assert(null != detection_ref01_data)


    // LIST
    const detection_ref01_match: any = {}

    const detection_ref01_list = await detection_ref01_ent.list(detection_ref01_match)

    assert(!isempty(select(detection_ref01_list, { id: detection_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/detection/DetectionTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AntiPhishingDetectionSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['detection01','detection02','detection03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['ANTI_PHISHING_DETECTION_TEST_DETECTION_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'ANTI_PHISHING_DETECTION_TEST_DETECTION_ENTID': idmap,
    'ANTI_PHISHING_DETECTION_TEST_LIVE': 'FALSE',
    'ANTI_PHISHING_DETECTION_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ANTI_PHISHING_DETECTION_TEST_DETECTION_ENTID']

  const live = 'TRUE' === env.ANTI_PHISHING_DETECTION_TEST_LIVE

  if (live) {
    client = new AntiPhishingDetectionSDK(merge([
      {
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.ANTI_PHISHING_DETECTION_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
