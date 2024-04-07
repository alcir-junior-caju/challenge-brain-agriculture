import { type UseCaseInterface } from '@modules/shared'

import { type FarmerRepositoryInterface } from '../../repository'

import { type InputGetFarmerDto, type OutputGetFarmerDto } from './GetFarmerDto'

export class GetFarmerUseCase implements UseCaseInterface<InputGetFarmerDto, OutputGetFarmerDto> {
  private readonly _farmerRepository: FarmerRepositoryInterface

  constructor (farmerRepository: FarmerRepositoryInterface) {
    this._farmerRepository = farmerRepository
  }

  async execute (input: InputGetFarmerDto): Promise<OutputGetFarmerDto> {
    const farmer = await this._farmerRepository.find(input.id)
    if (!farmer) throw new Error('farmer_not_found')
    return {
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
    }
  }
}
