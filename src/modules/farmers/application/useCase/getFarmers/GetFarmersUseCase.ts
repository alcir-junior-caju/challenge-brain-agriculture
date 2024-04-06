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
        id: farmer.id.value,
        name: farmer.name.value,
        email: farmer.email.value,
        document: farmer.document.value,
        createdAt: farmer.createdAt,
        updatedAt: farmer.updatedAt
      })
    }
    return output
  }
}
