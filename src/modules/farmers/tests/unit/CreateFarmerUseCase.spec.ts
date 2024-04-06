import { CreateFarmerUseCase, FarmerEntity, type FarmerRepositoryInterface } from '@modules/farmers'
import { EmailValueObject, IdValueObject, InvalidEmailError, InvalidNameError, InvalidTaxIdError, InvalidTaxPayerIdError, InvalidUUIDError, NameValueObject, TaxIdValueObject } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const nameString = chance.name()
const emailString = chance.email()
const documentString = chance.cpf({ formatted: false })
const invalidIdString = chance.word()
const invalidNameString = chance.letter({ length: 1 })
const invalidEmailString = chance.word()

const farmerStub = new FarmerEntity({
  id: new IdValueObject(idString),
  name: new NameValueObject(nameString),
  email: new EmailValueObject(emailString),
  document: new TaxIdValueObject(documentString)
})

const MockFarmerRepository = (): FarmerRepositoryInterface => ({
  save: vitest.fn(),
  update: vitest.fn(),
  find: vitest.fn().mockResolvedValue(Promise.resolve(farmerStub)),
  findAll: vitest.fn().mockResolvedValue(Promise.resolve([farmerStub])),
  delete: vitest.fn()
})

describe('CreateFarmerUseCase Unit Tests', () => {
  it('should be able to persist a farmer with document tax id', async () => {
    const farmerRepository = MockFarmerRepository()
    const persistFarmerUseCase = new CreateFarmerUseCase(farmerRepository)
    const input = {
      id: idString,
      name: nameString,
      email: emailString,
      document: documentString
    }
    const output = await persistFarmerUseCase.execute(input)
    expect(farmerRepository.save).toBeCalledTimes(1)
    expect(output.id).toBe(input.id)
    expect(output.name).toBe(input.name)
    expect(output.email).toBe(input.email)
    expect(output.document).toBe(input.document)
  })

  it('should be able to persist a farmer with document tax payer id', async () => {
    const farmerRepository = MockFarmerRepository()
    const persistFarmerUseCase = new CreateFarmerUseCase(farmerRepository)
    const input = {
      id: idString,
      name: nameString,
      email: emailString,
      document: '73300397000100'
    }
    const output = await persistFarmerUseCase.execute(input)
    expect(farmerRepository.save).toBeCalledTimes(1)
    expect(output.id).toBe(input.id)
    expect(output.name).toBe(input.name)
    expect(output.email).toBe(input.email)
    expect(output.document).toBe(input.document)
  })

  it('should be able to persist a farmer with invalid id', async () => {
    const farmerRepository = MockFarmerRepository()
    const persistFarmerUseCase = new CreateFarmerUseCase(farmerRepository)
    const input = {
      id: invalidIdString,
      name: nameString,
      email: emailString,
      document: documentString
    }
    await expect(persistFarmerUseCase.execute(input)).rejects.toThrow(new InvalidUUIDError())
  })

  it('should be able to persist a farmer with invalid name', async () => {
    const farmerRepository = MockFarmerRepository()
    const persistFarmerUseCase = new CreateFarmerUseCase(farmerRepository)
    const input = {
      id: idString,
      name: invalidNameString,
      email: emailString,
      document: documentString
    }
    await expect(persistFarmerUseCase.execute(input)).rejects.toThrow(new InvalidNameError())
  })

  it('should be able to persist a farmer with invalid email', async () => {
    const farmerRepository = MockFarmerRepository()
    const persistFarmerUseCase = new CreateFarmerUseCase(farmerRepository)
    const input = {
      id: idString,
      name: nameString,
      email: invalidEmailString,
      document: documentString
    }
    await expect(persistFarmerUseCase.execute(input)).rejects.toThrow(new InvalidEmailError())
  })

  it('should be able to persist a farmer with invalid document', async () => {
    const farmerRepository = MockFarmerRepository()
    const persistFarmerUseCase = new CreateFarmerUseCase(farmerRepository)
    const input = {
      id: idString,
      name: nameString,
      email: emailString
    }
    await expect(persistFarmerUseCase.execute({
      ...input,
      document: '11111111111'
    })).rejects.toThrow(new InvalidTaxIdError())
    await expect(persistFarmerUseCase.execute({
      ...input,
      document: '11111111111111'
    })).rejects.toThrow(new InvalidTaxPayerIdError())
  })
})
