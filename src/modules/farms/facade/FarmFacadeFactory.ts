import { PgPromiseAdapter } from '@modules/shared'

import { CreateFarmUseCase, RemoveFarmUseCase } from '../application'
import { FarmRepository } from '../repository'

import { FarmFacade } from './FarmFacade'

export class FarmFacadeFactory {
  static create (): FarmFacade {
    const connection = new PgPromiseAdapter()
    const farmRepository = new FarmRepository(connection)
    const createFarmUseCase = new CreateFarmUseCase(farmRepository)
    const removeFarmUseCase = new RemoveFarmUseCase(farmRepository)
    const farmFacade = new FarmFacade({
      createFarmUseCase,
      removeFarmUseCase
    })
    return farmFacade
  }
}
