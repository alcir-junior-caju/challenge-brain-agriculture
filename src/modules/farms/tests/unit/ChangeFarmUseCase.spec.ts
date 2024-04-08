import { ChangeFarmUseCase, CreateFarmUseCase, FarmAreaValueObject, FarmEntity, FarmNameValueObject, type FarmRepositoryInterface, FarmTilthValueObject } from '@modules/farms'
import { IdValueObject } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const changeIdString = chance.guid()
const nameString = chance.name()
const changeNameString = chance.name()
const cityString = chance.state({ full: true })
const changeCityString = chance.state({ full: true })
const stateString = chance.province()
const changeStateString = chance.province()
const totalAreaNumber = 1000
const changeTotalAreaNumber = 2000
const arableAreaNumber = 400
const changeArableAreaNumber = 800
const vegetationAreaNumber = 200
const changeVegetationAreaNumber = 400
const cultureOne = new FarmTilthValueObject('coffee')
const changeCultureOne = new FarmTilthValueObject('maize')
const cultureTwo = new FarmTilthValueObject('sugarcane')
const changeCultureTwo = new FarmTilthValueObject('cotton')
const cultures = [cultureOne, cultureTwo]
const changeCultures = [changeCultureOne, changeCultureTwo]

const farmStub = new FarmEntity({
  id: new IdValueObject(idString),
  name: new FarmNameValueObject(nameString),
  city: new FarmNameValueObject(cityString),
  state: new FarmNameValueObject(stateString),
  totalArea: new FarmAreaValueObject(totalAreaNumber),
  arableArea: new FarmAreaValueObject(arableAreaNumber),
  vegetationArea: new FarmAreaValueObject(vegetationAreaNumber)
})

const changeFarmStub = new FarmEntity({
  id: new IdValueObject(changeIdString),
  name: new FarmNameValueObject(changeNameString),
  city: new FarmNameValueObject(changeCityString),
  state: new FarmNameValueObject(changeStateString),
  totalArea: new FarmAreaValueObject(changeTotalAreaNumber),
  arableArea: new FarmAreaValueObject(changeArableAreaNumber),
  vegetationArea: new FarmAreaValueObject(changeVegetationAreaNumber)
})

const MockFarmRepository = (withCultures?: boolean, notFound?: boolean): FarmRepositoryInterface => ({
  save: vitest.fn().mockResolvedValue(Promise.resolve(farmStub)),
  update: vitest.fn().mockResolvedValue(Promise.resolve({
    ...changeFarmStub,
    ...(withCultures && { changeCultures })
  })),
  find: notFound
    ? vitest.fn()
    : vitest.fn().mockResolvedValue(Promise.resolve({
      ...farmStub,
      ...(withCultures && { cultures })
    })),
  findAll: vitest.fn(),
  delete: vitest.fn()
})

describe('ChangeFarmUseCase Unit Tests', () => {
  it('should be able to change a farm', async () => {
    const farmRepository = MockFarmRepository()
    const createFarmUseCase = new CreateFarmUseCase(farmRepository)
    const inputCreate = {
      id: idString,
      name: nameString,
      city: cityString,
      state: stateString,
      totalArea: totalAreaNumber,
      arableArea: arableAreaNumber,
      vegetationArea: vegetationAreaNumber
    }
    await createFarmUseCase.execute(inputCreate)
    const changeFarmUseCase = new ChangeFarmUseCase(farmRepository)
    const input = {
      id: idString,
      name: changeNameString,
      city: changeCityString,
      state: changeStateString,
      totalArea: changeTotalAreaNumber,
      arableArea: changeArableAreaNumber,
      vegetationArea: changeVegetationAreaNumber
    }
    const output = await changeFarmUseCase.execute(input)
    expect(output.id).toBe(input.id)
    expect(output.name).toBe(input.name)
    expect(output.city).toBe(input.city)
    expect(output.state).toBe(input.state)
    expect(output.totalArea).toBe(input.totalArea)
    expect(output.arableArea).toBe(input.arableArea)
    expect(output.vegetationArea).toBe(input.vegetationArea)
  })

  it('should be able to change a farmer not found', async () => {
    const farmRepository = MockFarmRepository(false, true)
    const changeFarmUseCase = new ChangeFarmUseCase(farmRepository)
    const input = {
      id: chance.guid()
    }
    await expect(changeFarmUseCase.execute(input)).rejects.toThrow(new Error('farm_not_found'))
  })
})
