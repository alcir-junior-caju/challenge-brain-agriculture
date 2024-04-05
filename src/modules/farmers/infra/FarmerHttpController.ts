import { createRoute } from '@hono/zod-openapi'
import { type HttpServerInterface } from '@modules/shared'
import { type Params } from 'hono/router'

import { type ChangeFarmerUseCase, type GetFarmerUseCase } from '../application'
import { type InputChangeFarmerDto } from '../application/useCase/changeFarmer/ChangeFarmerDto'

import { farmerGetRoute, farmerPatchRoute } from './swaggerConfig'

export class FarmerHttpController {
  private readonly httpServer: HttpServerInterface
  private readonly changeFarmerUseCase: ChangeFarmerUseCase
  private readonly getFarmerUseCase: GetFarmerUseCase

  constructor (
    httpServer: HttpServerInterface,
    changeFarmerUseCase: ChangeFarmerUseCase,
    getFarmerUseCase: GetFarmerUseCase
  ) {
    this.httpServer = httpServer
    this.changeFarmerUseCase = changeFarmerUseCase
    this.getFarmerUseCase = getFarmerUseCase

    this.httpServer.on(
      createRoute(farmerPatchRoute),
      async ({ params, body }: { params: Params, body: InputChangeFarmerDto }) => {
        const { id } = params
        const output = await this.changeFarmerUseCase.execute({ ...body, id })
        return output
      }
    )

    this.httpServer.on(
      createRoute(farmerGetRoute),
      async ({ params }: { params: Params }) => {
        const { id } = params
        console.log('id', id)
        const output = await this.getFarmerUseCase.execute({ id })
        return output
      }
    )
  }
}
