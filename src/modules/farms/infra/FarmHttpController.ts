import { createRoute } from '@hono/zod-openapi'
import { type HttpServerInterface } from '@modules/shared'
import { type Params } from 'hono/router'

import { type GetFarmsUseCase } from '../application'

import { reportGetRoute } from './swaggerConfig'

export class FarmHttpController {
  private readonly httpServer: HttpServerInterface
  private readonly getFarmsUseCase: GetFarmsUseCase

  constructor (
    httpServer: HttpServerInterface,
    getFarmsUseCase: GetFarmsUseCase
  ) {
    this.httpServer = httpServer
    this.getFarmsUseCase = getFarmsUseCase

    this.httpServer.on(
      createRoute(reportGetRoute),
      async ({ params }: { params: Params }) => {
        console.log('params', params)
        const { type } = params
        const output = await this.getFarmsUseCase.execute({ type })
        return output
      }
    )
  }
}
