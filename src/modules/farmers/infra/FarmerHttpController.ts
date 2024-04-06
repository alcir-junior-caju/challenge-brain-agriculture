import { createRoute } from '@hono/zod-openapi'
import { type HttpServerInterface } from '@modules/shared'
import { type Params } from 'hono/router'

import { type ChangeFarmerUseCase, type CreateFarmerUseCase, type GetFarmersUseCase, type GetFarmerUseCase, type InputCreateFarmerDto, type RemoveFarmerUseCase } from '../application'
import { type InputChangeFarmerDto } from '../application/useCase/changeFarmer/ChangeFarmerDto'

import { farmerDeleteRoute, farmerGetRoute, farmerPatchRoute, farmerPostRoute, farmersGetRoute } from './swaggerConfig'

export class FarmerHttpController {
  private readonly httpServer: HttpServerInterface
  private readonly createFarmerUseCase: CreateFarmerUseCase
  private readonly changeFarmerUseCase: ChangeFarmerUseCase
  private readonly getFarmerUseCase: GetFarmerUseCase
  private readonly getFarmersUseCase: GetFarmersUseCase
  private readonly removeFarmerUseCase: RemoveFarmerUseCase

  constructor (
    httpServer: HttpServerInterface,
    createFarmerUseCase: CreateFarmerUseCase,
    changeFarmerUseCase: ChangeFarmerUseCase,
    getFarmerUseCase: GetFarmerUseCase,
    getFarmersUseCase: GetFarmersUseCase,
    removeFarmerUseCase: RemoveFarmerUseCase
  ) {
    this.httpServer = httpServer
    this.createFarmerUseCase = createFarmerUseCase
    this.changeFarmerUseCase = changeFarmerUseCase
    this.getFarmerUseCase = getFarmerUseCase
    this.getFarmersUseCase = getFarmersUseCase
    this.removeFarmerUseCase = removeFarmerUseCase

    this.httpServer.on(
      createRoute(farmerPostRoute),
      async ({ body }: { body: InputCreateFarmerDto }) => {
        const output = await this.createFarmerUseCase.execute(body)
        return output
      }
    )

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
        const output = await this.getFarmerUseCase.execute({ id })
        return output
      }
    )

    this.httpServer.on(
      createRoute(farmersGetRoute),
      async () => {
        const output = await this.getFarmersUseCase.execute({})
        return output
      }
    )

    this.httpServer.on(
      createRoute(farmerDeleteRoute),
      async ({ params }: { params: Params }) => {
        const { id } = params
        const output = await this.removeFarmerUseCase.execute({ id })
        return output
      }
    )
  }
}
