import { type FarmerRepositoryInterface } from '@modules/farmers'
import { FarmerEntity } from '@modules/farmers/domain'
import { FarmFacadeFactory, type FarmFacadeInterface } from '@modules/farms'
import { EmailValueObject, IdValueObject, NameValueObject, TaxIdValueObject, TaxPayerIdValueObject, type UseCaseInterface } from '@modules/shared'

import { type InputCreateFarmerDto, type OutputCreateFarmerDto } from './CreateFarmerDto'

export class CreateFarmerUseCase implements UseCaseInterface<InputCreateFarmerDto, OutputCreateFarmerDto> {
  private readonly _farmerRepository: FarmerRepositoryInterface

  constructor (farmerRepository: FarmerRepositoryInterface) {
    this._farmerRepository = farmerRepository
  }

  async execute (input: InputCreateFarmerDto): Promise<OutputCreateFarmerDto> {
    const farmFacade: FarmFacadeInterface = FarmFacadeFactory.create()
    const inputFarm = {
      name: input.farm.name,
      city: input.farm.city,
      state: input.farm.state,
      totalArea: input.farm.totalArea,
      arableArea: input.farm.arableArea,
      vegetationArea: input.farm.vegetationArea,
      cultures: input.farm.cultures
    }
    const farm = await farmFacade.create(inputFarm)
    const inputFarmer = {
      id: new IdValueObject(input.id),
      name: new NameValueObject(input.name),
      email: new EmailValueObject(input.email),
      document: input.document.length === 11 ? new TaxIdValueObject(input.document) : new TaxPayerIdValueObject(input.document),
      ...(input?.createdAt && { createdAt: input.createdAt }),
      ...(input?.updatedAt && { updatedAt: input.updatedAt })
    }
    const farmer = new FarmerEntity(inputFarmer)
    if (!farmer) {
      await farmFacade.remove({ id: farm.id })
    }
    await this._farmerRepository.save(farmer)
    await farmFacade.change({ id: farm.id, farmerId: farmer.id.value })
    return {
      id: farmer.id.value,
      name: farmer.name.value,
      email: farmer.email.value,
      document: farmer.document.value,
      farm,
      createdAt: farmer.createdAt,
      updatedAt: farmer.updatedAt
    }
  }
}
