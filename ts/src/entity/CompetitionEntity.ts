
import { inspect } from 'node:util'

import { LongevityCompetitionEntityBase } from '../LongevityCompetitionEntityBase'

import type {
  LongevityCompetitionSDK,
} from '../LongevityCompetitionSDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'

import type {
  Competition,
  CompetitionListMatch,
} from '../LongevityCompetitionTypes'

// TODO: needs Entity superclass
class CompetitionEntity extends LongevityCompetitionEntityBase<Competition> {

  constructor(client: LongevityCompetitionSDK, entopts: any) {
    super(client, entopts)
    this.name = 'competition'
    this.name_ = 'competition'
    this.Name = 'Competition'
  }


  make(this: CompetitionEntity) {
    return new CompetitionEntity(this._client, this.entopts())
  }




  async list(this: any, reqmatch?: CompetitionListMatch, ctrl?: Control): Promise<Competition[]> {

    const utility = this._utility

    const {
      makeContext,
      done,
      error,
      featureHook,
      makePoint,
      makeRequest,
      makeResponse,
      makeResult,
      makeSpec,
    } = utility

    let fres: Promise<any> | undefined = undefined

    let ctx: Context = makeContext({
      opname: 'list',
      ctrl,
      match: this._match,
      data: this._data,
      reqmatch
    }, this._entctx)

    try {

      fres = featureHook(ctx, 'PrePoint')
      if (fres instanceof Promise) { await fres }

      ctx.out.point = makePoint(ctx)
      if (ctx.out.point instanceof Error) {
        return error(ctx, ctx.out.point)
      }



      fres = featureHook(ctx, 'PreSpec')
      if (fres instanceof Promise) { await fres }

      ctx.out.spec = makeSpec(ctx)
      if (ctx.out.spec instanceof Error) {
        return error(ctx, ctx.out.spec)
      }



      fres = featureHook(ctx, 'PreRequest')
      if (fres instanceof Promise) { await fres }

      ctx.out.request = await makeRequest(ctx)
      if (ctx.out.request instanceof Error) {
        return error(ctx, ctx.out.request)
      }



      fres = featureHook(ctx, 'PreResponse')
      if (fres instanceof Promise) { await fres }

      ctx.out.response = await makeResponse(ctx)
      if (ctx.out.response instanceof Error) {
        return error(ctx, ctx.out.response)
      }



      fres = featureHook(ctx, 'PreResult')
      if (fres instanceof Promise) { await fres }

      ctx.out.result = await makeResult(ctx)
      if (ctx.out.result instanceof Error) {
        return error(ctx, ctx.out.result)
      }



      fres = featureHook(ctx, 'PreDone')
      if (fres instanceof Promise) { await fres }

      if (null != ctx.result) {
        if (null != ctx.result.resmatch) {
          this._match = ctx.result.resmatch
        }
      }

      return done(ctx)
    }
    catch (err: any) {

      fres = featureHook(ctx, 'PreUnexpected')
      if (fres instanceof Promise) { await fres }

      err = this._unexpected(ctx, err)

      if (err) {
        throw err
      }
      else {
        // Off-happy-path (throw disabled): typed as any so the method's
        // Promise<Competition[]> return stays clean under strict null checks.
        return undefined as any
      }
    }
  }





}


export {
  CompetitionEntity
}
