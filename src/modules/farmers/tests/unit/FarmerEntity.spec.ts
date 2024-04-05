import { FarmerEntity } from '@modules/farmers'
import { EmailValueObject, IdValueObject, InvalidEmailError, InvalidNameError, InvalidTaxIdError, InvalidUUIDError, NameValueObject, TaxIdValueObject } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const nameString = chance.name()
const emailString = chance.email()
const taxIdString = chance.cpf({ formatted: false })
const invalidIdString = chance.word()
const invalidNameString = chance.letter({ length: 1 })
const invalidEmailString = chance.word()

const farmerStub = {
  id: new IdValueObject(idString),
  name: new NameValueObject(nameString),
  email: new EmailValueObject(emailString)
}

describe('FarmerEntity Unit Tests', () => {
  it('should be create a new farmer entity', () => {
    const farmerEntity = new FarmerEntity(farmerStub)
    expect(farmerEntity).toBeInstanceOf(FarmerEntity)
    expect(farmerEntity.id).toBeInstanceOf(IdValueObject)
    expect(farmerEntity.id.value).toBe(farmerStub.id.value)
    expect(farmerEntity.name).toBeInstanceOf(NameValueObject)
    expect(farmerEntity.name.value).toBe(farmerStub.name.value)
    expect(farmerEntity.email).toBeInstanceOf(EmailValueObject)
    expect(farmerEntity.email.value).toBe(farmerStub.email.value)
    expect(farmerEntity.createdAt).toBeInstanceOf(Date)
    expect(farmerEntity.updatedAt).toBeInstanceOf(Date)
  })

  it('should be create a new farmer entity with dates', () => {
    const date = new Date()
    const farmerEntity = new FarmerEntity({
      ...farmerStub,
      createdAt: date,
      updatedAt: date
    })
    expect(farmerEntity).toBeInstanceOf(FarmerEntity)
    expect(farmerEntity.id).toBeInstanceOf(IdValueObject)
    expect(farmerEntity.id.value).toBe(farmerStub.id.value)
    expect(farmerEntity.name).toBeInstanceOf(NameValueObject)
    expect(farmerEntity.name.value).toBe(farmerStub.name.value)
    expect(farmerEntity.email).toBeInstanceOf(EmailValueObject)
    expect(farmerEntity.email.value).toBe(farmerStub.email.value)
    expect(farmerEntity.createdAt).toBeInstanceOf(Date)
    expect(farmerEntity.updatedAt).toBeInstanceOf(Date)
  })

  it('should be create a new farmer entity with tax id', () => {
    const taxId = new TaxIdValueObject(taxIdString)
    const farmerEntity = new FarmerEntity({
      ...farmerStub,
      taxId
    })
    expect(farmerEntity).toBeInstanceOf(FarmerEntity)
    expect(farmerEntity.id).toBeInstanceOf(IdValueObject)
    expect(farmerEntity.id.value).toBe(farmerStub.id.value)
    expect(farmerEntity.name).toBeInstanceOf(NameValueObject)
    expect(farmerEntity.name.value).toBe(farmerStub.name.value)
    expect(farmerEntity.email).toBeInstanceOf(EmailValueObject)
    expect(farmerEntity.email.value).toBe(farmerStub.email.value)
    expect(farmerEntity.taxId).toBeInstanceOf(TaxIdValueObject)
    expect(farmerEntity.taxId.value).toBe(taxId.value)
  })

  it('should be throw an error if id is invalid', () => {
    expect(() => {
      new FarmerEntity({ ...farmerStub, id: new IdValueObject(invalidIdString) })
    }).toThrow(new InvalidUUIDError())
  })

  it('should be throw an error if name is invalid', () => {
    expect(() => {
      new FarmerEntity({ ...farmerStub, name: new NameValueObject(invalidNameString) })
    }).toThrow(new InvalidNameError())
  })

  it('should be throw an error if email is invalid', () => {
    expect(() => {
      new FarmerEntity({ ...farmerStub, email: new EmailValueObject(invalidEmailString) })
    }).toThrow(new InvalidEmailError())
  })

  it('should be throw an error if taxId is invalid', () => {
    expect(() => {
      new FarmerEntity({ ...farmerStub, taxId: new TaxIdValueObject('11111111111') })
    }).toThrow(new InvalidTaxIdError())
  })
})
