import { PgPromiseAdapter } from '@modules/shared'

import { ChangeFarmUseCase, CreateFarmUseCase, RemoveFarmUseCase } from '../application'
import { FarmRepository } from '../repository'

import { FarmFacade } from './FarmFacade'

export class FarmFacadeFactory {
  static create (): FarmFacade {
    const connection = PgPromiseAdapter.getInstance()
    const farmRepository = new FarmRepository(connection)
    const createFarmUseCase = new CreateFarmUseCase(farmRepository)
    const changeFarmUseCase = new ChangeFarmUseCase(farmRepository)
    const removeFarmUseCase = new RemoveFarmUseCase(farmRepository)
    const farmFacade = new FarmFacade({
      createFarmUseCase,
      changeFarmUseCase,
      removeFarmUseCase
    })
    return farmFacade
  }
}
