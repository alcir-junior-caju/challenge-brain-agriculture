import { FarmAreaValueObject, FarmEntity, FarmNameValueObject, FarmTilthValueObject } from '@modules/farms/domain'
import { FarmRepository } from '@modules/farms/repository'
import { type ConnectionInterface, IdValueObject, PgPromiseAdapter } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const nameString = chance.name()
const cityString = chance.state({ full: true })
const stateString = chance.province()
const totalAreaNumber = 1000
const arableArea = 300
const vegetationArea = 300
const cultureOne = new FarmTilthValueObject('coffee')
const cultureTwo = new FarmTilthValueObject('sugarcane')
const cultures = [cultureOne, cultureTwo]

describe('FarmRepository Integration Tests', () => {
  let connection: ConnectionInterface
  let farmRepository: FarmRepository

  beforeEach(() => {
    connection = new PgPromiseAdapter()
    farmRepository = new FarmRepository(connection)
  })

  afterEach(async () => {
    await connection.close()
  })

  it('should be get a farm', async () => {
    const farmEntity = new FarmEntity({
      id: new IdValueObject(idString),
      name: new FarmNameValueObject(nameString),
      city: new FarmNameValueObject(cityString),
      state: new FarmNameValueObject(stateString),
      totalArea: new FarmAreaValueObject(totalAreaNumber),
      arableArea: new FarmAreaValueObject(arableArea),
      vegetationArea: new FarmAreaValueObject(vegetationArea),
      cultures
    })
    await farmRepository.save(farmEntity)
    const output = await farmRepository.find(farmEntity.id.value)
    expect(output.id.value).toBe(farmEntity.id.value)
    expect(output.name.value).toBe(farmEntity.name.value)
    expect(output.city.value).toBe(farmEntity.city.value)
    expect(output.state.value).toBe(farmEntity.state.value)
    expect(output.totalArea.value).toBe(farmEntity.totalArea.value)
    expect(output.arableArea.value).toBe(farmEntity.arableArea.value)
    expect(output.vegetationArea.value).toBe(farmEntity.vegetationArea.value)
    expect(farmEntity.cultures[0].value).toBe(cultures[0].value)
    expect(farmEntity.cultures[1].value).toBe(cultures[1].value)
    await farmRepository.delete(farmEntity.id.value)
  })

  it('should be throw error when farm not found', async () => {
    await expect(farmRepository.find(chance.guid())).rejects.toThrow('farm_not_found')
  })

  it('should be create a farm', async () => {
    const farmEntity = new FarmEntity({
      id: new IdValueObject(idString),
      name: new FarmNameValueObject(nameString),
      city: new FarmNameValueObject(cityString),
      state: new FarmNameValueObject(stateString),
      totalArea: new FarmAreaValueObject(totalAreaNumber),
      arableArea: new FarmAreaValueObject(arableArea),
      vegetationArea: new FarmAreaValueObject(vegetationArea),
      cultures
    })
    await farmRepository.save(farmEntity)
    const output = await farmRepository.find(farmEntity.id.value)
    expect(output.id.value).toBe(farmEntity.id.value)
    expect(output.name.value).toBe(farmEntity.name.value)
    expect(output.city.value).toBe(farmEntity.city.value)
    expect(output.state.value).toBe(farmEntity.state.value)
    expect(output.totalArea.value).toBe(farmEntity.totalArea.value)
    expect(output.arableArea.value).toBe(farmEntity.arableArea.value)
    expect(output.vegetationArea.value).toBe(farmEntity.vegetationArea.value)
    expect(farmEntity.cultures[0].value).toBe(cultures[0].value)
    expect(farmEntity.cultures[1].value).toBe(cultures[1].value)
    await farmRepository.delete(farmEntity.id.value)
  })

  it('should be update a farm', async () => {
    const farmEntity = new FarmEntity({
      id: new IdValueObject(idString),
      name: new FarmNameValueObject(nameString),
      city: new FarmNameValueObject(cityString),
      state: new FarmNameValueObject(stateString),
      totalArea: new FarmAreaValueObject(totalAreaNumber),
      arableArea: new FarmAreaValueObject(arableArea),
      vegetationArea: new FarmAreaValueObject(vegetationArea),
      cultures
    })
    await farmRepository.save(farmEntity)
    const farmUpdated = {
      id: new IdValueObject(farmEntity.id.value),
      name: new FarmNameValueObject(chance.name()),
      city: new FarmNameValueObject(chance.state({ full: true })),
      state: new FarmNameValueObject(chance.province()),
      totalArea: new FarmAreaValueObject(1000),
      arableArea: new FarmAreaValueObject(100),
      vegetationArea: new FarmAreaValueObject(100),
      cultures: [new FarmTilthValueObject('maize' as any)]
    }
    const farmUpdatedEntity = new FarmEntity(farmUpdated)
    await farmRepository.update(farmUpdatedEntity)
    const output = await farmRepository.find(farmEntity.id.value)
    expect(output.id.value).toBe(farmUpdatedEntity.id.value)
    expect(output.name.value).toBe(farmUpdatedEntity.name.value)
    expect(output.city.value).toBe(farmUpdatedEntity.city.value)
    expect(output.state.value).toBe(farmUpdatedEntity.state.value)
    expect(output.totalArea.value).toBe(farmUpdatedEntity.totalArea.value)
    expect(output.arableArea.value).toBe(farmUpdatedEntity.arableArea.value)
    expect(output.vegetationArea.value).toBe(farmUpdatedEntity.vegetationArea.value)
    expect(farmUpdatedEntity.cultures[0].value).toBe('maize')
    await farmRepository.delete(farmEntity.id.value)
  })
})
