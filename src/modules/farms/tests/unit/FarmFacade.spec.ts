import { FarmFacadeFactory } from '@modules/farms/facade'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const nameString = chance.name()
const cityString = chance.state({ full: true })
const stateString = chance.province()
const totalAreaNumber = 1000
const arableArea = 300
const vegetationArea = 400
const cultures = ['coffee', 'sugarcane']

describe('FarmFacade Unit Tests', () => {
  it('should be create a new farm entity', async () => {
    const farmFacade = FarmFacadeFactory.create()
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
    expect(output.arableArea).toBe(arableArea)
    expect(output.vegetationArea).toBe(vegetationArea)
    expect(output.cultures).toEqual(cultures)
    expect(output.createdAt).toEqual(expect.any(Date))
    expect(output.updatedAt).toEqual(expect.any(Date))
  })
})
