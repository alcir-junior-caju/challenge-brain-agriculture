import { type UseCaseInterface } from '@modules/shared'

import { type FarmRepositoryInterface } from '../../repository'

import { type InputGetFarmsDto, type OutputGetFarmsDto } from './GetFarmsDto'

export class GetFarmsUseCase implements UseCaseInterface<InputGetFarmsDto, OutputGetFarmsDto> {
  private readonly _farmRepository: FarmRepositoryInterface

  constructor (farmRepository: FarmRepositoryInterface) {
    this._farmRepository = farmRepository
  }

  async execute (input: InputGetFarmsDto): Promise<OutputGetFarmsDto> {
    const farms = await this._farmRepository.findAll()
    const farmsTransformed = farms?.map(farm => ({
      id: farm.id.value,
      name: farm.name.value,
      city: farm.city.value,
      state: farm.state.value,
      totalArea: farm.totalArea.value,
      arableArea: farm.arableArea.value,
      vegetationArea: farm.vegetationArea.value,
      cultures: farm.cultures.map(culture => culture.value)
    }))
    switch (input.type) {
      case 'count': {
        return { count: farmsTransformed.length }
      } case 'totalArea': {
        return { totalArea: farmsTransformed.reduce((acc, farm) => acc + farm.totalArea, 0) }
      } case 'states': {
        const stateCounts: Record<string, number> = {}
        for (const farm of farmsTransformed) {
          if (farm.state in stateCounts) {
            stateCounts[farm.state]++
          } else {
            stateCounts[farm.state] = 1
          }
        }
        return stateCounts
      } case 'cultures': {
        const cultures: Record<string, number> = {}
        for (const farm of farmsTransformed) {
          for (const culture of farm.cultures) {
            if (culture in cultures) {
              cultures[culture]++
            } else {
              cultures[culture] = 1
            }
          }
        }
        return cultures
      } case 'soil': {
        let arableAreaSum = 0
        let vegetationAreaSum = 0
        for (const farm of farmsTransformed) {
          arableAreaSum += farm.arableArea
          vegetationAreaSum += farm.vegetationArea
        }
        return { arableArea: arableAreaSum, vegetationArea: vegetationAreaSum }
      } default:
        throw new Error('invalid_type')
    }
  }
}
