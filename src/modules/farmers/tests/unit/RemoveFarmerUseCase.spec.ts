import { CreateFarmerUseCase, FarmerEntity, type FarmerRepositoryInterface, RemoveFarmerUseCase } from '@modules/farmers'
import { EmailValueObject, IdValueObject, NameValueObject, TaxIdValueObject } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const nameString = chance.name()
const emailString = chance.email()
const documentString = chance.cpf({ formatted: false })
const cityString = chance.state({ full: true })
const stateString = chance.province()
const totalAreaNumber = 1000
const arableAreaNumber = 400
const vegetationAreaNumber = 200
const cultures = ['coffee', 'sugarcane']

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
  findAll: vitest.fn(),
  delete: vitest.fn().mockResolvedValue(Promise.resolve())
})

describe('RemoveFarmerUseCase Unit Tests', () => {
  // TODO: come back to refactor this test
  it.skip('should be able to remove a farmer', async () => {
    const farmerRepository = MockFarmerRepository()
    const createFarmerUseCase = new CreateFarmerUseCase(farmerRepository)
    const inputCreateFarmer = {
      id: idString,
      name: nameString,
      email: emailString,
      document: documentString,
      farm: {
        name: nameString,
        city: cityString,
        state: stateString,
        totalArea: totalAreaNumber,
        arableArea: arableAreaNumber,
        vegetationArea: vegetationAreaNumber,
        cultures
      }
    }
    await createFarmerUseCase.execute(inputCreateFarmer)
    const removeFarmerUseCase = new RemoveFarmerUseCase(farmerRepository)
    const input = {
      id: idString
    }
    const output = await removeFarmerUseCase.execute(input)
    expect(farmerRepository.delete).toBeCalledTimes(1)
    expect(output).toEqual({})
  })

  it('should not be able to remove a farmer if not exists', async () => {
    const farmerRepository = MockFarmerRepository(true)
    const removeFarmerUseCase = new RemoveFarmerUseCase(farmerRepository)
    const input = {
      id: idString
    }
    await expect(removeFarmerUseCase.execute(input)).rejects.toThrow('farmer_not_found')
  })
})
