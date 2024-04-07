import { type UseCaseInterface } from '@modules/shared'

import { type FarmerRepositoryInterface } from '../../repository'

import { type InputRemoveFarmerDto, type OutputRemoveFarmerDto } from './RemoveFarmerDto'

export class RemoveFarmerUseCase implements UseCaseInterface<InputRemoveFarmerDto, OutputRemoveFarmerDto> {
  private readonly _farmerRepository: FarmerRepositoryInterface

  constructor (farmerRepository: FarmerRepositoryInterface) {
    this._farmerRepository = farmerRepository
  }

  async execute (input: InputRemoveFarmerDto): Promise<OutputRemoveFarmerDto> {
    const farmer = await this._farmerRepository.find(input.id)
    if (!farmer) throw new Error('farmer_not_found')
    await this._farmerRepository.delete(input.id)
    return {}
  }
}
