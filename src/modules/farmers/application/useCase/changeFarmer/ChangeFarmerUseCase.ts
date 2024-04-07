import { type FarmerRepositoryInterface } from '@modules/farmers'
import { FarmerEntity } from '@modules/farmers/domain'
import { FarmFacadeFactory, type FarmFacadeInterface } from '@modules/farms'
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
    if (farmerExists?.farm_id) {
      const farmFacade: FarmFacadeInterface = FarmFacadeFactory.create()
      await farmFacade.change({
        id: farmerExists.farm_id,
        ...(farmer?.farm?.name && { name: farmer.farm.name }),
        ...(farmer?.farm?.city && { city: farmer.farm.city }),
        ...(farmer?.farm?.state && { state: farmer.farm.state }),
        ...(farmer?.farm?.totalArea && { totalArea: farmer.farm.totalArea }),
        ...(farmer?.farm?.arableArea && { arableArea: farmer.farm.arableArea }),
        ...(farmer?.farm?.vegetationArea && { vegetationArea: farmer.farm.vegetationArea }),
        ...(farmer?.farm?.cultures && { cultures: farmer.farm.cultures })
      })
    }
    if (!farmerExists) throw new Error('farmer_not_found')
    const checkDocumentTaxIdOrTaxPayerId = {
      ...(farmer?.document && farmer.document.length === 11 && { document: new TaxIdValueObject(farmer.document) }),
      ...(farmer?.document && farmer.document.length === 14 && { document: new TaxPayerIdValueObject(farmer.document) })
    }
    const entity = new FarmerEntity({
      id: new IdValueObject(id),
      name: farmer?.name ? new NameValueObject(farmer.name) : new NameValueObject(farmerExists.name),
      email: farmer?.email ? new EmailValueObject(farmer.email) : new EmailValueObject(farmerExists.email),
      document: checkDocumentTaxIdOrTaxPayerId?.document ? checkDocumentTaxIdOrTaxPayerId.document : farmerExists.document.length === 11 ? new TaxIdValueObject(farmerExists.document) : new TaxPayerIdValueObject(farmerExists.document),
      updatedAt: new Date()
    })
    await this._farmerRepository.update(entity)
    return {
      id,
      name: entity.name.value,
      email: entity.email.value,
      document: entity.document.value,
      farm: {
        name: farmer?.farm?.name ?? farmerExists.name,
        city: farmer?.farm?.city ?? farmerExists.city,
        state: farmer?.farm?.state ?? farmerExists.state,
        totalArea: farmer?.farm?.totalArea ?? farmerExists.totalArea,
        arableArea: farmer?.farm?.arableArea ?? farmerExists.arableArea,
        vegetationArea: farmer?.farm?.vegetationArea ?? farmerExists.vegetationArea,
        cultures: farmer?.farm?.cultures ?? farmerExists.cultures,
        updatedAt: new Date()
      },
      createdAt: farmerExists.createdAt,
      updatedAt: entity.updatedAt
    }
  }
}
