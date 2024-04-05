import { type FarmerRepositoryInterface } from '@modules/farmers'
import { FarmerEntity } from '@modules/farmers/domain'
import { EmailValueObject, IdValueObject, NameValueObject, TaxIdValueObject, TaxPayerIdValueObject, type UseCaseInterface } from '@modules/shared'

import { type InputCreateFarmerDto, type OutputCreateFarmerDto } from './CreateFarmerDto'

export class CreateFarmerUseCase implements UseCaseInterface<InputCreateFarmerDto, OutputCreateFarmerDto> {
  private readonly _farmerRepository: FarmerRepositoryInterface

  constructor (farmerRepository: FarmerRepositoryInterface) {
    this._farmerRepository = farmerRepository
  }

  async execute (input: InputCreateFarmerDto): Promise<OutputCreateFarmerDto> {
    const inputFarmer = {
      id: new IdValueObject(input.id),
      name: new NameValueObject(input.name),
      email: new EmailValueObject(input.email),
      document: input.document.length === 11 ? new TaxIdValueObject(input.document) : new TaxPayerIdValueObject(input.document),
      ...(input?.createdAt && { createdAt: input.createdAt }),
      ...(input?.updatedAt && { updatedAt: input.updatedAt })
    }
    const farmer = new FarmerEntity(inputFarmer)
    await this._farmerRepository.save(farmer)
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
