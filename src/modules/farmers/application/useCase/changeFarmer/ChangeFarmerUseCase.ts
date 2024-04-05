import { type FarmerRepositoryInterface } from '@modules/farmers'
import { FarmerEntity } from '@modules/farmers/domain'
import { EmailValueObject, NameValueObject, TaxIdValueObject, type UseCaseInterface } from '@modules/shared'

import { type InputChangeFarmerDto, type OutputChangeFarmerDto } from './ChangeFarmerDto'

export class ChangeFarmerUseCase implements UseCaseInterface<InputChangeFarmerDto, OutputChangeFarmerDto> {
  private readonly _farmerRepository: FarmerRepositoryInterface

  constructor (farmerRepository: FarmerRepositoryInterface) {
    this._farmerRepository = farmerRepository
  }

  async execute (input: InputChangeFarmerDto): Promise<OutputChangeFarmerDto> {
    const { id, ...farmer } = input
    const farmerExists = await this._farmerRepository.find(id)
    if (!farmerExists) throw new Error('farmer_not_found')
    const entity = new FarmerEntity({
      name: farmer.name ? new NameValueObject(farmer.name) : farmerExists.name,
      email: farmer.email ? new EmailValueObject(farmer.email) : farmerExists.email,
      taxId: farmer.taxId ? new TaxIdValueObject(farmer.taxId) : farmerExists.taxId,
      updatedAt: new Date()
    })
    await this._farmerRepository.update(entity)
    return {
      id,
      name: entity.name.value,
      email: entity.email.value,
      taxId: entity.taxId.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    }
  }
}
