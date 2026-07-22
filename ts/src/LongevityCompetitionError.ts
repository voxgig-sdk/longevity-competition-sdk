
import { Context } from './Context'


class LongevityCompetitionError extends Error {

  isLongevityCompetitionError = true

  sdk = 'LongevityCompetition'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  LongevityCompetitionError
}

