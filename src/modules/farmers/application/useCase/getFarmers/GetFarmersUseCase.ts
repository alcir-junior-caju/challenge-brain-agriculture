import { type UseCaseInterface } from '@modules/shared'

import { type FarmerRepositoryInterface } from '../../repository'

import { type InputGetFarmersDto, type OutputGetFarmersDto } from './GetFarmersDto'

export class GetFarmersUseCase implements UseCaseInterface<InputGetFarmersDto, OutputGetFarmersDto> {
  private readonly _farmerRepository: FarmerRepositoryInterface

  constructor (farmerRepository: FarmerRepositoryInterface) {
    this._farmerRepository = farmerRepository
  }

  async execute (input: InputGetFarmersDto): Promise<OutputGetFarmersDto> {
    const output: OutputGetFarmersDto = []
    const farmers = await this._farmerRepository.findAll()
    for (const farmer of farmers) {
      output.push({
        id: farmer.id,
        name: farmer.name,
        email: farmer.email,
        document: farmer.document,
        farm: {
          name: farmer.farm_name,
          city: farmer.city,
          state: farmer.state,
          totalArea: farmer.total_area,
          arableArea: farmer.arable_area,
          vegetationArea: farmer.vegetation_area,
          cultures: farmer.cultures,
          createdAt: farmer.farm_created_at,
          updatedAt: farmer.farm_updated_at
        },
        createdAt: farmer.createdAt,
        updatedAt: farmer.updatedAt
      })
    }
    return output
  }
}
