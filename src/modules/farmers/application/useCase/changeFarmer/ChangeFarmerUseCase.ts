import { type FarmerRepositoryInterface } from '@modules/farmers'
import { FarmerEntity } from '@modules/farmers/domain'
import { EmailValueObject, IdValueObject, NameValueObject, TaxIdValueObject, TaxPayerIdValueObject, type UseCaseInterface } from '@modules/shared'

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
    const checkDocumentTaxIdOrTaxPayerId = {
      ...(farmer?.document && farmer.document.length === 11 && { document: new TaxIdValueObject(farmer.document) }),
      ...(farmer?.document && farmer.document.length === 14 && { document: new TaxPayerIdValueObject(farmer.document) })
    }
    const entity = new FarmerEntity({
      id: new IdValueObject(id),
      name: farmer?.name ? new NameValueObject(farmer.name) : farmerExists.name,
      email: farmer?.email ? new EmailValueObject(farmer.email) : farmerExists.email,
      document: checkDocumentTaxIdOrTaxPayerId?.document ? checkDocumentTaxIdOrTaxPayerId.document : farmerExists.document,
      updatedAt: new Date()
    })
    await this._farmerRepository.update(entity)
    return {
      id,
      name: entity.name.value,
      email: entity.email.value,
      document: entity.document.value,
      createdAt: farmerExists.createdAt,
      updatedAt: entity.updatedAt
    }
  }
}
