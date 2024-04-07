import { PgPromiseAdapter } from '@modules/shared'

import { ChangeFarmUseCase, CreateFarmUseCase, RemoveFarmUseCase } from '../application'
import { FarmRepository } from '../repository'

import { FarmFacade } from './FarmFacade'

export class FarmFacadeFactory {
  private static farmFacadeInstance: FarmFacade | null = null

  static create (): FarmFacade {
    if (!FarmFacadeFactory.farmFacadeInstance) {
      const connection = new PgPromiseAdapter()
      const farmRepository = new FarmRepository(connection)
      const createFarmUseCase = new CreateFarmUseCase(farmRepository)
      const changeFarmUseCase = new ChangeFarmUseCase(farmRepository)
      const removeFarmUseCase = new RemoveFarmUseCase(farmRepository)
      FarmFacadeFactory.farmFacadeInstance = new FarmFacade({
        createFarmUseCase,
        changeFarmUseCase,
        removeFarmUseCase
      })
    }
    return FarmFacadeFactory.farmFacadeInstance
  }
}
