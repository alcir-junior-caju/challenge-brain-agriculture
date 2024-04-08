import { FarmAreaValueObject, FarmEntity, FarmNameValueObject, type FarmRepositoryInterface, FarmTilthValueObject, GetFarmsUseCase } from '@modules/farms'
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
const cultureOne = new FarmTilthValueObject('coffee')
const cultureTwo = new FarmTilthValueObject('sugarcane')
const cultures = [cultureOne, cultureTwo]
const idStringOther = chance.guid()
const nameStringOther = chance.name()
const cityStringOther = chance.state({ full: true })
const stateStringOther = chance.province()
const totalAreaNumberOther = 900
const arableAreaNumberOther = 300
const vegetationAreaNumberOther = 200
const cultureOneOther = new FarmTilthValueObject('cotton')
const cultureTwoOther = new FarmTilthValueObject('soya')
const cultureThreeOther = new FarmTilthValueObject('coffee')
const culturesOther = [cultureOneOther, cultureTwoOther, cultureThreeOther]

const farmStub = new FarmEntity({
  id: new IdValueObject(idString),
  name: new FarmNameValueObject(nameString),
  city: new FarmNameValueObject(cityString),
  state: new FarmNameValueObject(stateString),
  totalArea: new FarmAreaValueObject(totalAreaNumber),
  arableArea: new FarmAreaValueObject(arableAreaNumber),
  vegetationArea: new FarmAreaValueObject(vegetationAreaNumber),
  cultures
})

const farmStubOther = new FarmEntity({
  id: new IdValueObject(idStringOther),
  name: new FarmNameValueObject(nameStringOther),
  city: new FarmNameValueObject(cityStringOther),
  state: new FarmNameValueObject(stateStringOther),
  totalArea: new FarmAreaValueObject(totalAreaNumberOther),
  arableArea: new FarmAreaValueObject(arableAreaNumberOther),
  vegetationArea: new FarmAreaValueObject(vegetationAreaNumberOther),
  cultures: culturesOther
})

const MockFarmRepository = (): FarmRepositoryInterface => ({
  save: vitest.fn(),
  update: vitest.fn(),
  find: vitest.fn(),
  findAll: vitest.fn().mockResolvedValue(Promise.resolve([farmStub, farmStubOther])),
  delete: vitest.fn()
})

describe('GetFarmsUseCase Unit Tests', () => {
  it('should be able to get farms by count', async () => {
    const farmRepository = MockFarmRepository()
    const getFarmsUseCase = new GetFarmsUseCase(farmRepository)
    const input = {
      type: 'count'
    }
    const output = await getFarmsUseCase.execute(input as any)
    expect(output).toEqual({ count: 2 })
  })

  it('should be able to get farms by total area', async () => {
    const farmRepository = MockFarmRepository()
    const getFarmsUseCase = new GetFarmsUseCase(farmRepository)
    const input = {
      type: 'totalArea'
    }
    const output = await getFarmsUseCase.execute(input as any)
    expect(output).toEqual({ totalArea: 1900 })
  })

  it('should be able to get farms by total states', async () => {
    const farmRepository = MockFarmRepository()
    const getFarmsUseCase = new GetFarmsUseCase(farmRepository)
    const input = {
      type: 'states'
    }
    const output = await getFarmsUseCase.execute(input as any)
    expect(output).toEqual({
      [stateString]: 1,
      [stateStringOther]: 1
    })
  })

  it('should be able to get farms by total cultures', async () => {
    const farmRepository = MockFarmRepository()
    const getFarmsUseCase = new GetFarmsUseCase(farmRepository)
    const input = {
      type: 'cultures'
    }
    const output = await getFarmsUseCase.execute(input as any)
    expect(output).toEqual({
      [cultureOne.value]: 2,
      [cultureTwo.value]: 1,
      [cultureOneOther.value]: 1,
      [cultureTwoOther.value]: 1
    })
  })

  it('should be able to get farms by total soil', async () => {
    const farmRepository = MockFarmRepository()
    const getFarmsUseCase = new GetFarmsUseCase(farmRepository)
    const input = {
      type: 'soil'
    }
    const output = await getFarmsUseCase.execute(input as any)
    expect(output).toEqual({
      arableArea: 700,
      vegetationArea: 400
    })
  })
})
