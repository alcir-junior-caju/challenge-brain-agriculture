import { CreateFarmUseCase, FarmAreaValueObject, FarmEntity, FarmNameValueObject, type FarmRepositoryInterface, RemoveFarmUseCase } from '@modules/farms'
import { IdValueObject } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const nameString = chance.name()
const cityString = chance.state({ full: true })
const stateString = chance.province()
const totalAreaNumber = 1000
const arableAreaNumber = 400
const vegetationAreaNumber = 200

const farmStub = new FarmEntity({
  id: new IdValueObject(idString),
  name: new FarmNameValueObject(nameString),
  city: new FarmNameValueObject(cityString),
  state: new FarmNameValueObject(stateString),
  totalArea: new FarmAreaValueObject(totalAreaNumber),
  arableArea: new FarmAreaValueObject(arableAreaNumber),
  vegetationArea: new FarmAreaValueObject(vegetationAreaNumber)
})

const MockFarmRepository = (empty?: boolean): FarmRepositoryInterface => ({
  save: vitest.fn(),
  update: vitest.fn(),
  find: empty ? vitest.fn().mockResolvedValue(Promise.resolve(null)) : vitest.fn().mockResolvedValue(Promise.resolve(farmStub)),
  delete: vitest.fn().mockResolvedValue(Promise.resolve())
})

describe('RemoveFarmUseCase Unit Tests', () => {
  it('should be able to remove a farm', async () => {
    const farmRepository = MockFarmRepository()
    const createFarmUseCase = new CreateFarmUseCase(farmRepository)
    const inputCreateFarm = {
      id: idString,
      name: nameString,
      city: cityString,
      state: stateString,
      totalArea: totalAreaNumber,
      arableArea: arableAreaNumber,
      vegetationArea: vegetationAreaNumber
    }
    await createFarmUseCase.execute(inputCreateFarm)
    const removeFarmUseCase = new RemoveFarmUseCase(farmRepository)
    const input = {
      id: idString
    }
    const output = await removeFarmUseCase.execute(input)
    expect(farmRepository.delete).toBeCalledTimes(1)
    expect(output).toEqual({})
  })

  it('should not be able to remove a farm if not exists', async () => {
    const farmRepository = MockFarmRepository(true)
    const removeFarmUseCase = new RemoveFarmUseCase(farmRepository)
    const input = {
      id: idString
    }
    await expect(removeFarmUseCase.execute(input)).rejects.toThrow('farm_not_found')
  })
})
