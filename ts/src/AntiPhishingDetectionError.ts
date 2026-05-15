
import { Context } from './Context'


class AntiPhishingDetectionError extends Error {

  isAntiPhishingDetectionError = true

  sdk = 'AntiPhishingDetection'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  AntiPhishingDetectionError
}

