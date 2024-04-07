import { FarmerEntity, type FarmerRepositoryInterface, GetFarmersUseCase } from '@modules/farmers'
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

describe('GetFarmersUseCase Unit Tests', () => {
  it('should be able to get a farmers', async () => {
    const farmerRepository = MockFarmerRepository()
    const getFarmerUseCase = new GetFarmersUseCase(farmerRepository)
    const input = {}
    const output = await getFarmerUseCase.execute(input)
    expect(farmerRepository.findAll).toBeCalledTimes(1)
    expect(output).toEqual([{
      id: farmerStub.id,
      name: farmerStub.name,
      email: farmerStub.email,
      document: farmerStub.document,
      farm: expect.any(Object),
      createdAt: farmerStub.createdAt,
      updatedAt: farmerStub.updatedAt
    }])
  })
})
