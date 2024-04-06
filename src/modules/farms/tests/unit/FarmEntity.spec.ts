import { FarmEntity, InvalidCheckAreaError } from '@modules/farms/domain/entity'
import { FarmAreaValueObject, FarmNameValueObject } from '@modules/farms/domain/valueObject'
import { IdValueObject, InvalidSimpleNameError } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const nameString = chance.name()
const cityString = chance.state({ full: true })
const stateString = chance.province()
const totalAreaNumber = 1000
const arableArea = 300
const vegetationArea = 400

const farmerStub = {
  name: new FarmNameValueObject(nameString),
  city: new FarmNameValueObject(cityString),
  state: new FarmNameValueObject(stateString),
  totalArea: new FarmAreaValueObject(totalAreaNumber),
  arableArea: new FarmAreaValueObject(arableArea),
  vegetationArea: new FarmAreaValueObject(vegetationArea)
}

describe('FarmEntity Unit Tests', () => {
  it('should be create a new farm entity', () => {
    const farmerEntity = new FarmEntity(farmerStub)
    expect(farmerEntity).toBeInstanceOf(FarmEntity)
    expect(farmerEntity.name).toBeInstanceOf(FarmNameValueObject)
    expect(farmerEntity.name.value).toBe(nameString)
    expect(farmerEntity.city).toBeInstanceOf(FarmNameValueObject)
    expect(farmerEntity.city.value).toBe(cityString)
    expect(farmerEntity.state).toBeInstanceOf(FarmNameValueObject)
    expect(farmerEntity.state.value).toBe(stateString)
    expect(farmerEntity.totalArea).toBeInstanceOf(FarmAreaValueObject)
    expect(farmerEntity.totalArea.value).toBe(totalAreaNumber)
    expect(farmerEntity.arableArea).toBeInstanceOf(FarmAreaValueObject)
    expect(farmerEntity.arableArea.value).toBe(arableArea)
    expect(farmerEntity.vegetationArea).toBeInstanceOf(FarmAreaValueObject)
    expect(farmerEntity.vegetationArea.value).toBe(vegetationArea)
  })

  it('should be create a new farm entity id', () => {
    const farmerEntity = new FarmEntity({
      ...farmerStub,
      id: new IdValueObject(idString)
    })
    expect(farmerEntity).toBeInstanceOf(FarmEntity)
    expect(farmerEntity.id).toBeInstanceOf(IdValueObject)
    expect(farmerEntity.id.value).toBe(idString)
    expect(farmerEntity.name).toBeInstanceOf(FarmNameValueObject)
    expect(farmerEntity.name.value).toBe(nameString)
    expect(farmerEntity.city).toBeInstanceOf(FarmNameValueObject)
    expect(farmerEntity.city.value).toBe(cityString)
    expect(farmerEntity.state).toBeInstanceOf(FarmNameValueObject)
    expect(farmerEntity.state.value).toBe(stateString)
    expect(farmerEntity.totalArea).toBeInstanceOf(FarmAreaValueObject)
    expect(farmerEntity.totalArea.value).toBe(totalAreaNumber)
    expect(farmerEntity.arableArea).toBeInstanceOf(FarmAreaValueObject)
    expect(farmerEntity.arableArea.value).toBe(arableArea)
    expect(farmerEntity.vegetationArea).toBeInstanceOf(FarmAreaValueObject)
    expect(farmerEntity.vegetationArea.value).toBe(vegetationArea)
  })

  it('should be create a new farm entity with createdAt and updatedAt', () => {
    const farmerEntity = new FarmEntity({
      ...farmerStub,
      id: new IdValueObject(idString),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    expect(farmerEntity).toBeInstanceOf(FarmEntity)
    expect(farmerEntity.id).toBeInstanceOf(IdValueObject)
    expect(farmerEntity.id.value).toBe(idString)
    expect(farmerEntity.name).toBeInstanceOf(FarmNameValueObject)
    expect(farmerEntity.name.value).toBe(nameString)
    expect(farmerEntity.city).toBeInstanceOf(FarmNameValueObject)
    expect(farmerEntity.city.value).toBe(cityString)
    expect(farmerEntity.state).toBeInstanceOf(FarmNameValueObject)
    expect(farmerEntity.state.value).toBe(stateString)
    expect(farmerEntity.totalArea).toBeInstanceOf(FarmAreaValueObject)
    expect(farmerEntity.totalArea.value).toBe(totalAreaNumber)
    expect(farmerEntity.arableArea).toBeInstanceOf(FarmAreaValueObject)
    expect(farmerEntity.arableArea.value).toBe(arableArea)
    expect(farmerEntity.vegetationArea).toBeInstanceOf(FarmAreaValueObject)
    expect(farmerEntity.vegetationArea.value).toBe(vegetationArea)
    expect(farmerEntity.createdAt).toBeInstanceOf(Date)
    expect(farmerEntity.updatedAt).toBeInstanceOf(Date)
  })

  it('should be create a new farm entity with invalid name', () => {
    expect(() => {
      new FarmEntity({
        ...farmerStub,
        name: new FarmNameValueObject('')
      })
    }).toThrow(new InvalidSimpleNameError())
  })

  it('should be create a new farm entity with invalid city', () => {
    expect(() => {
      new FarmEntity({
        ...farmerStub,
        city: new FarmNameValueObject('')
      })
    }).toThrow(new InvalidSimpleNameError())
  })

  it('should be create a new farm entity with invalid state', () => {
    expect(() => {
      new FarmEntity({
        ...farmerStub,
        state: new FarmNameValueObject('')
      })
    }).toThrow(new InvalidSimpleNameError())
  })

  it('should be create a new farm entity with invalid total area', () => {
    expect(() => {
      new FarmEntity({
        ...farmerStub,
        totalArea: new FarmAreaValueObject(0)
      })
    }).toThrow()
  })

  it('should be create a new farm entity with invalid arable area', () => {
    expect(() => {
      new FarmEntity({
        ...farmerStub,
        arableArea: new FarmAreaValueObject(0)
      })
    }).toThrow()
  })

  it('should be create a new farm entity with invalid vegetation area', () => {
    expect(() => {
      new FarmEntity({
        ...farmerStub,
        vegetationArea: new FarmAreaValueObject(0)
      })
    }).toThrow()
  })

  it('should be create a new farm entity with invalid total area', () => {
    expect(() => {
      new FarmEntity({
        ...farmerStub,
        totalArea: new FarmAreaValueObject(0),
        arableArea: new FarmAreaValueObject(300),
        vegetationArea: new FarmAreaValueObject(400)
      })
    }).toThrow()
  })

  it('should be create a new farm entity with invalid check area', () => {
    expect(() => {
      new FarmEntity({
        ...farmerStub,
        totalArea: new FarmAreaValueObject(1000),
        arableArea: new FarmAreaValueObject(400),
        vegetationArea: new FarmAreaValueObject(700)
      })
    }).toThrow(new InvalidCheckAreaError())
  })
})
