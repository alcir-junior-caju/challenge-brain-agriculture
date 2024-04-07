import { FarmAreaValueObject, FarmEntity, FarmNameValueObject, FarmTilthValueObject } from '@modules/farms/domain'
import { IdValueObject, type UseCaseInterface } from '@modules/shared'

import { type FarmRepositoryInterface } from '../../repository'

import { type InputCreateFarmDto, type OutputCreateFarmDto } from './CreateFarmDto'

export class CreateFarmUseCase implements UseCaseInterface<InputCreateFarmDto, OutputCreateFarmDto> {
  private readonly _farmRepository: FarmRepositoryInterface

  constructor (farmRepository: FarmRepositoryInterface) {
    this._farmRepository = farmRepository
  }

  async execute (input: InputCreateFarmDto): Promise<OutputCreateFarmDto> {
    const cultures = input?.cultures ? input.cultures.map((culture: string) => new FarmTilthValueObject(culture as any)) : []
    const inputFarm = new FarmEntity({
      ...(input?.id && { id: new IdValueObject(input.id) }),
      farmerId: input?.farmerId ? new IdValueObject(input.farmerId) : undefined,
      name: new FarmNameValueObject(input.name),
      city: new FarmNameValueObject(input.city),
      state: new FarmNameValueObject(input.state),
      totalArea: new FarmAreaValueObject(input.totalArea),
      arableArea: new FarmAreaValueObject(input.arableArea),
      vegetationArea: new FarmAreaValueObject(input.vegetationArea),
      ...(cultures.length && { cultures })
    })
    await this._farmRepository.save(inputFarm)
    return {
      id: inputFarm.id.value,
      name: inputFarm.name.value,
      city: inputFarm.city.value,
      state: inputFarm.state.value,
      totalArea: inputFarm.totalArea.value,
      arableArea: inputFarm.arableArea.value,
      vegetationArea: inputFarm.vegetationArea.value,
      cultures: inputFarm?.cultures?.map(culture => culture.value) ?? [],
      createdAt: inputFarm.createdAt,
      updatedAt: inputFarm.updatedAt
    }
  }
}
