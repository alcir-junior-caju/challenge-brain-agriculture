import { type UseCaseInterface } from '@modules/shared'

import { type FarmFacadeInterface, type InputFarmFacadeDto, type OutputFarmFacadeDto } from '../application'

interface UseCases {
  createFarmUseCase: UseCaseInterface<any, any>
}

export class FarmFacade implements FarmFacadeInterface {
  private readonly _createFarmUseCase: UseCaseInterface<InputFarmFacadeDto, OutputFarmFacadeDto>

  constructor ({ createFarmUseCase }: UseCases) {
    this._createFarmUseCase = createFarmUseCase
  }

  async create (input: InputFarmFacadeDto): Promise<OutputFarmFacadeDto> {
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
}
