import { type UseCaseInterface } from '@modules/shared'

import { type FarmFacadeInterface, type InputCreateFarmFacadeDto, type InputRemoveFarmFacadeDto, type OutputCreateFarmFacadeDto, type OutputRemoveFarmFacadeDto } from '../application'

interface UseCases {
  createFarmUseCase: UseCaseInterface<any, any>
  removeFarmUseCase: UseCaseInterface<any, any>
}

export class FarmFacade implements FarmFacadeInterface {
  private readonly _createFarmUseCase: UseCaseInterface<InputCreateFarmFacadeDto, OutputCreateFarmFacadeDto>
  private readonly _removeFarmUseCase: UseCaseInterface<InputRemoveFarmFacadeDto, OutputRemoveFarmFacadeDto>

  constructor ({ createFarmUseCase, removeFarmUseCase }: UseCases) {
    this._createFarmUseCase = createFarmUseCase
    this._removeFarmUseCase = removeFarmUseCase
  }

  async create (input: InputCreateFarmFacadeDto): Promise<OutputCreateFarmFacadeDto> {
    const inputFacade = {
      id: input.id,
      name: input.name,
      city: input.city,
      state: input.state,
      totalArea: input.totalArea,
      arableArea: input.arableArea,
      vegetationArea: input.vegetationArea,
      cultures: input.cultures,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    }
    return await this._createFarmUseCase.execute(inputFacade)
  }

  async remove (input: InputRemoveFarmFacadeDto): Promise<OutputRemoveFarmFacadeDto> {
    const inputFacade = {
      id: input.id
    }
    return await this._removeFarmUseCase.execute(inputFacade)
  }
}
