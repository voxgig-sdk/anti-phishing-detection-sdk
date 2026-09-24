
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AntiPhishingDetectionSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AntiPhishingDetectionSDK.test()
    equal(testsdk instanceof AntiPhishingDetectionSDK, true,
      'AntiPhishingDetectionSDK.test() must return a client synchronously')
  })

})
