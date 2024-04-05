import { ChangeFarmerUseCase, FarmerEntity, type FarmerRepositoryInterface } from '@modules/farmers'
import { EmailValueObject, IdValueObject, InvalidEmailError, InvalidNameError, InvalidTaxIdError, NameValueObject, TaxIdValueObject } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const nameString = chance.name()
const emailString = chance.email()
const taxIdString = chance.cpf({ formatted: false })
const idStringChange = chance.guid()
const nameStringChange = chance.name()
const emailStringChange = chance.email()
const taxIdStringChange = chance.cpf({ formatted: false })
const idStringNotFound = chance.guid()
const invalidNameString = chance.letter({ length: 1 })
const invalidEmailString = chance.word()

const farmerStub = new FarmerEntity({
  id: new IdValueObject(idString),
  name: new NameValueObject(nameString),
  email: new EmailValueObject(emailString),
  taxId: new TaxIdValueObject(taxIdString)
})

const changeFarmerStub = new FarmerEntity({
  id: new IdValueObject(idStringChange),
  name: new NameValueObject(nameStringChange),
  email: new EmailValueObject(emailStringChange),
  taxId: new TaxIdValueObject(taxIdStringChange)
})

const MockFarmerRepository = (notFound?: boolean): FarmerRepositoryInterface => ({
  save: vitest.fn().mockResolvedValue(Promise.resolve(farmerStub)),
  update: vitest.fn().mockResolvedValue(Promise.resolve(changeFarmerStub)),
  find: notFound ? vitest.fn() : vitest.fn().mockResolvedValue(Promise.resolve(farmerStub)),
  delete: vitest.fn()
})

describe('ChangeFarmerUseCase Unit Tests', () => {
  it('should be able to change a farmer', async () => {
    const farmerRepository = MockFarmerRepository()
    const changeFarmerUseCase = new ChangeFarmerUseCase(farmerRepository)
    const input = {
      id: idStringChange,
      name: nameStringChange,
      email: emailStringChange,
      taxId: taxIdStringChange,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }
    const changeFarmer = await changeFarmerUseCase.execute(input)
    expect(changeFarmer).toEqual({
      id: input.id,
      name: input.name,
      email: input.email,
      taxId: input.taxId,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  })

  it('should be able to change a farmer not found', async () => {
    const farmerRepository = MockFarmerRepository(true)
    const changeFarmerUseCase = new ChangeFarmerUseCase(farmerRepository)
    const input = {
      id: idStringNotFound,
      name: nameStringChange,
      email: emailStringChange,
      taxId: taxIdStringChange
    }
    await expect(changeFarmerUseCase.execute(input)).rejects.toThrow(new Error('farmer_not_found'))
  })

  it('should be able to change a farmer with invalid name', async () => {
    const farmerRepository = MockFarmerRepository()
    const changeFarmerUseCase = new ChangeFarmerUseCase(farmerRepository)
    const input = {
      id: idStringChange,
      name: invalidNameString,
      email: emailStringChange,
      taxId: taxIdStringChange,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }
    await expect(changeFarmerUseCase.execute(input)).rejects.toThrow(new InvalidNameError())
  })

  it('should be able to change a farmer with invalid email', async () => {
    const farmerRepository = MockFarmerRepository()
    const changeFarmerUseCase = new ChangeFarmerUseCase(farmerRepository)
    const input = {
      id: idStringChange,
      name: nameStringChange,
      email: invalidEmailString,
      taxId: taxIdStringChange,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }
    await expect(changeFarmerUseCase.execute(input)).rejects.toThrow(new InvalidEmailError())
  })

  it('should be able to change a farmer with invalid tax id', async () => {
    const farmerRepository = MockFarmerRepository()
    const changeFarmerUseCase = new ChangeFarmerUseCase(farmerRepository)
    const input = {
      id: idStringChange,
      name: nameStringChange,
      email: emailStringChange,
      taxId: '11111111111',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }
    await expect(changeFarmerUseCase.execute(input)).rejects.toThrow(new InvalidTaxIdError())
  })
})
