import { type FarmFacadeInterface } from '@modules/farms/application'
import { FarmFacadeFactory } from '@modules/farms/facade'
import { Chance } from 'chance'

const chance = new Chance()
const nameString = chance.name()
const changeNameString = chance.name()
const cityString = chance.state({ full: true })
const changeCityString = chance.state({ full: true })
const stateString = chance.province()
const changeStateString = chance.province()
const totalAreaNumber = 1000
const changeTotalAreaNumber = 2000
const arableArea = 300
const changeArableArea = 600
const vegetationArea = 400
const changeVegetationArea = 800
const cultures = ['coffee', 'sugarcane']
const changeCultures = ['cotton', 'soya']

describe('FarmFacade Unit Tests', () => {
  let farmFacade: FarmFacadeInterface

  beforeEach(() => {
    farmFacade = FarmFacadeFactory.create()
  })

  it('should be create a new farm', async () => {
    const idString = chance.guid()
    const input = {
      id: idString,
      name: nameString,
      city: cityString,
      state: stateString,
      totalArea: totalAreaNumber,
      arableArea,
      vegetationArea,
      cultures,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const output = await farmFacade.create(input)
    expect(output.id).toBe(input.id)
    expect(output.name).toBe(input.name)
    expect(output.city).toBe(input.city)
    expect(output.state).toBe(input.state)
    expect(output.totalArea).toBe(input.totalArea)
    expect(output.arableArea).toBe(input.arableArea)
    expect(output.vegetationArea).toBe(input.vegetationArea)
    expect(output.cultures).toEqual(input.cultures)
    expect(output.createdAt).toEqual(expect.any(Date))
    expect(output.updatedAt).toEqual(expect.any(Date))
    await farmFacade.remove({ id: idString })
  })

  it('should be change a farm', async () => {
    const idString = chance.guid()
    const inputCreate = {
      id: idString,
      name: nameString,
      city: cityString,
      state: stateString,
      totalArea: totalAreaNumber,
      arableArea,
      vegetationArea,
      cultures
    }
    await farmFacade.create(inputCreate)
    const input = {
      id: idString,
      name: changeNameString,
      city: changeCityString,
      state: changeStateString,
      totalArea: changeTotalAreaNumber,
      arableArea: changeArableArea,
      vegetationArea: changeVegetationArea,
      cultures: changeCultures,
      updatedAt: new Date()
    }
    const output = await farmFacade.change(input)
    expect(output.id).toBe(input.id)
    expect(output.name).toBe(input.name)
    expect(output.city).toBe(input.city)
    expect(output.state).toBe(input.state)
    expect(output.totalArea).toBe(input.totalArea)
    expect(output.arableArea).toBe(input.arableArea)
    expect(output.vegetationArea).toBe(input.vegetationArea)
    expect(output.cultures).toEqual(input.cultures)
    expect(output.updatedAt).toEqual(expect.any(Date))
    await farmFacade.remove({ id: idString })
  })

  it('should be remove a farm', async () => {
    const idString = chance.guid()
    const input = {
      id: idString,
      name: nameString,
      city: cityString,
      state: stateString,
      totalArea: totalAreaNumber,
      arableArea,
      vegetationArea,
      cultures,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    await farmFacade.create(input)
    const output = await farmFacade.remove({ id: idString })
    expect(output).toEqual({})
  })
})
