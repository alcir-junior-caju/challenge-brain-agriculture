import { PgPromiseAdapter } from '@modules/shared'

import { CreateFarmUseCase } from '../application'
import { FarmRepository } from '../repository'

import { FarmFacade } from './FarmFacade'

export class FarmFacadeFactory {
  static create (): FarmFacade {
    const connection = new PgPromiseAdapter()
    const farmRepository = new FarmRepository(connection)
    const createFarmUseCase = new CreateFarmUseCase(farmRepository)
    const farmFacade = new FarmFacade({
      createFarmUseCase
    })
    return farmFacade
  }
}
