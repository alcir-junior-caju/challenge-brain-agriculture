import { FarmAreaValueObject, FarmEntity, FarmNameValueObject, FarmTilthValueObject } from '@modules/farms/domain'
import { IdValueObject, type UseCaseInterface } from '@modules/shared'

import { type FarmRepositoryInterface } from '../../repository'

import { type InputChangeFarmDto, type OutputChangeFarmDto } from './ChangeFarmDto'

export class ChangeFarmUseCase implements UseCaseInterface<InputChangeFarmDto, OutputChangeFarmDto> {
  private readonly _farmRepository: FarmRepositoryInterface

  constructor (farmRepository: FarmRepositoryInterface) {
    this._farmRepository = farmRepository
  }

  async execute (input: InputChangeFarmDto): Promise<OutputChangeFarmDto> {
    const { id, ...farm } = input
    const farmExists = await this._farmRepository.find(id)
    if (!farmExists) throw new Error('farm_not_found')
    const cultures = farm?.cultures ? farm.cultures.map((culture: string) => new FarmTilthValueObject(culture as any)) : []
    const inputFarm = new FarmEntity({
      id: new IdValueObject(id),
      farmerId: farm?.farmerId ? new IdValueObject(farm.farmerId) : farmExists.farmerId,
      name: farm?.name ? new FarmNameValueObject(farm?.name) : farmExists.name,
      city: farm?.city ? new FarmNameValueObject(farm?.city) : farmExists.city,
      state: farm?.state ? new FarmNameValueObject(farm?.state) : farmExists.state,
      totalArea: farm?.totalArea ? new FarmAreaValueObject(farm?.totalArea) : farmExists.totalArea,
      arableArea: farm?.arableArea ? new FarmAreaValueObject(farm?.arableArea) : farmExists.arableArea,
      vegetationArea: farm?.vegetationArea ? new FarmAreaValueObject(farm?.vegetationArea) : farmExists.vegetationArea,
      ...(cultures.length ? { cultures } : { cultures: farmExists.cultures }),
      updatedAt: farm?.updatedAt ?? new Date()
    })
    await this._farmRepository.update(inputFarm)
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
