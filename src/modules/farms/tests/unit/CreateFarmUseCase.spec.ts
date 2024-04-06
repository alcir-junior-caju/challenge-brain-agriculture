import { CreateFarmUseCase, FarmAreaValueObject, FarmEntity, FarmNameValueObject, type FarmRepositoryInterface, FarmTilthValueObject, InvalidAreaError, InvalidCheckAreaError } from '@modules/farms'
import { IdValueObject, InvalidSimpleNameError } from '@modules/shared'
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

const farmStub = new FarmEntity({
  id: new IdValueObject(idString),
  name: new FarmNameValueObject(nameString),
  city: new FarmNameValueObject(cityString),
  state: new FarmNameValueObject(stateString),
  totalArea: new FarmAreaValueObject(totalAreaNumber),
  arableArea: new FarmAreaValueObject(arableAreaNumber),
  vegetationArea: new FarmAreaValueObject(vegetationAreaNumber)
})

const MockFarmRepository = (withCultures?: boolean): FarmRepositoryInterface => ({
  save: vitest.fn(),
  update: vitest.fn(),
  find: vitest.fn().mockResolvedValue(Promise.resolve({
    ...farmStub,
    ...(withCultures && { cultures })
  })),
  delete: vitest.fn()
})

describe('CreateFarmUseCase Unit Tests', () => {
  it('should be able to persist a farm', async () => {
    const farmRepository = MockFarmRepository()
    const persistFarmUseCase = new CreateFarmUseCase(farmRepository)
    const input = {
      id: idString,
      name: nameString,
      city: cityString,
      state: stateString,
      totalArea: totalAreaNumber,
      arableArea: arableAreaNumber,
      vegetationArea: vegetationAreaNumber
    }
    const output = await persistFarmUseCase.execute(input)
    expect(farmRepository.save).toBeCalledTimes(1)
    expect(output.id).toBe(input.id)
    expect(output.name).toBe(input.name)
    expect(output.city).toBe(input.city)
    expect(output.state).toBe(input.state)
    expect(output.totalArea).toBe(input.totalArea)
    expect(output.arableArea).toBe(input.arableArea)
    expect(output.vegetationArea).toBe(input.vegetationArea)
  })

  it('should be able to persist a farm with cultures', async () => {
    const farmRepository = MockFarmRepository(true)
    const persistFarmUseCase = new CreateFarmUseCase(farmRepository)
    const input = {
      id: idString,
      name: nameString,
      city: cityString,
      state: stateString,
      totalArea: totalAreaNumber,
      arableArea: arableAreaNumber,
      vegetationArea: vegetationAreaNumber,
      cultures: ['coffee', 'sugarcane']
    }
    const output = await persistFarmUseCase.execute(input)
    expect(farmRepository.save).toBeCalledTimes(1)
    expect(output.id).toBe(input.id)
    expect(output.name).toBe(input.name)
    expect(output.city).toBe(input.city)
    expect(output.state).toBe(input.state)
    expect(output.totalArea).toBe(input.totalArea)
    expect(output.arableArea).toBe(input.arableArea)
    expect(output.vegetationArea).toBe(input.vegetationArea)
    expect(output.cultures[0]).toBe(cultures[0].value)
    expect(output.cultures[1]).toBe(cultures[1].value)
  })

  it('should be able to persist a farm with invalid name', async () => {
    const farmRepository = MockFarmRepository()
    const persistFarmUseCase = new CreateFarmUseCase(farmRepository)
    const input = {
      id: idString,
      name: '',
      city: cityString,
      state: stateString,
      totalArea: totalAreaNumber,
      arableArea: arableAreaNumber,
      vegetationArea: vegetationAreaNumber
    }
    await expect(persistFarmUseCase.execute(input)).rejects.toThrow(new InvalidSimpleNameError())
  })

  it('should be able to persist a farm with invalid city', async () => {
    const farmRepository = MockFarmRepository()
    const persistFarmUseCase = new CreateFarmUseCase(farmRepository)
    const input = {
      id: idString,
      name: nameString,
      city: '',
      state: stateString,
      totalArea: totalAreaNumber,
      arableArea: arableAreaNumber,
      vegetationArea: vegetationAreaNumber
    }
    await expect(persistFarmUseCase.execute(input)).rejects.toThrow(new InvalidSimpleNameError())
  })

  it('should be able to persist a farm with invalid state', async () => {
    const farmRepository = MockFarmRepository()
    const persistFarmUseCase = new CreateFarmUseCase(farmRepository)
    const input = {
      id: idString,
      name: nameString,
      city: cityString,
      state: '',
      totalArea: totalAreaNumber,
      arableArea: arableAreaNumber,
      vegetationArea: vegetationAreaNumber
    }
    await expect(persistFarmUseCase.execute(input)).rejects.toThrow(new InvalidSimpleNameError())
  })

  it('should be able to persist a farm with invalid total area', async () => {
    const farmRepository = MockFarmRepository()
    const persistFarmUseCase = new CreateFarmUseCase(farmRepository)
    const input = {
      id: idString,
      name: nameString,
      city: cityString,
      state: stateString,
      totalArea: -1,
      arableArea: arableAreaNumber,
      vegetationArea: vegetationAreaNumber
    }
    await expect(persistFarmUseCase.execute(input)).rejects.toThrow(new InvalidAreaError())
  })

  it('should be able to persist a farm with invalid arable area', async () => {
    const farmRepository = MockFarmRepository()
    const persistFarmUseCase = new CreateFarmUseCase(farmRepository)
    const input = {
      id: idString,
      name: nameString,
      city: cityString,
      state: stateString,
      totalArea: totalAreaNumber,
      arableArea: -1,
      vegetationArea: vegetationAreaNumber
    }
    await expect(persistFarmUseCase.execute(input)).rejects.toThrow(new InvalidAreaError())
  })

  it('should be able to persist a farm with invalid vegetation area', async () => {
    const farmRepository = MockFarmRepository()
    const persistFarmUseCase = new CreateFarmUseCase(farmRepository)
    const input = {
      id: idString,
      name: nameString,
      city: cityString,
      state: stateString,
      totalArea: totalAreaNumber,
      arableArea: arableAreaNumber,
      vegetationArea: -1
    }
    await expect(persistFarmUseCase.execute(input)).rejects.toThrow(new InvalidAreaError())
  })

  it('should be able to persist a farm with invalid check area', async () => {
    const farmRepository = MockFarmRepository()
    const persistFarmUseCase = new CreateFarmUseCase(farmRepository)
    const input = {
      id: idString,
      name: nameString,
      city: cityString,
      state: stateString,
      totalArea: 100,
      arableArea: 200,
      vegetationArea: 200
    }
    await expect(persistFarmUseCase.execute(input)).rejects.toThrow(new InvalidCheckAreaError())
  })
})
