import { FarmerEntity, type FarmerRepositoryInterface, GetFarmerUseCase } from '@modules/farmers'
import { EmailValueObject, IdValueObject, NameValueObject, TaxIdValueObject } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const nameString = chance.name()
const emailString = chance.email()
const documentString = chance.cpf({ formatted: false })

const farmerStub = new FarmerEntity({
  id: new IdValueObject(idString),
  name: new NameValueObject(nameString),
  email: new EmailValueObject(emailString),
  document: new TaxIdValueObject(documentString)
})

const MockFarmerRepository = (empty?: boolean): FarmerRepositoryInterface => ({
  save: vitest.fn(),
  update: vitest.fn(),
  find: empty ? vitest.fn().mockResolvedValue(Promise.resolve(null)) : vitest.fn().mockResolvedValue(Promise.resolve(farmerStub)),
  findAll: vitest.fn().mockResolvedValue(Promise.resolve([farmerStub])),
  delete: vitest.fn()
})

describe('GetFarmerUseCase Unit Tests', () => {
  it('should be able to get a farmer', async () => {
    const farmerRepository = MockFarmerRepository()
    const getFarmerUseCase = new GetFarmerUseCase(farmerRepository)
    const input = {
      id: idString
    }
    const output = await getFarmerUseCase.execute(input)
    expect(farmerRepository.find).toBeCalledTimes(1)
    expect(output.id.value).toBe(farmerStub.id.value)
    expect(output.name.value).toBe(farmerStub.name.value)
    expect(output.email.value).toBe(farmerStub.email.value)
    expect(output.document.value).toBe(farmerStub.document.value)
  })

  it('should not be able to get a farmer if not exists', async () => {
    const farmerRepository = MockFarmerRepository(true)
    const getFarmerUseCase = new GetFarmerUseCase(farmerRepository)
    const input = {
      id: idString
    }
    await expect(getFarmerUseCase.execute(input)).rejects.toThrow('farmer_not_found')
  })
})
