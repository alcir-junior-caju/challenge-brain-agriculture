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
      id: farmer.id.value,
      name: farmer.name.value,
      email: farmer.email.value,
      document: farmer.document.value,
      createdAt: farmer.createdAt,
      updatedAt: farmer.updatedAt
    }
  }
}
