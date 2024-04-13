import { ChangeFarmerUseCase, FarmerEntity, type FarmerRepositoryInterface } from '@modules/farmers'
import { FarmFacadeFactory } from '@modules/farms'
import { EmailValueObject, IdValueObject, InvalidEmailError, InvalidNameError, InvalidTaxIdError, InvalidTaxPayerIdError, NameValueObject, TaxIdValueObject, TaxPayerIdValueObject } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const nameString = chance.name()
const emailString = chance.email()
const documentString = chance.cpf({ formatted: false })
const idStringChange = chance.guid()
const nameStringChange = chance.name()
const emailStringChange = chance.email()
const documentStringChange = chance.cpf({ formatted: false })
const farmIdString = chance.guid()
const cityString = chance.state({ full: true })
const stateString = chance.province()
const totalAreaNumber = 1000
const arableAreaNumber = 400
const vegetationAreaNumber = 200
const cultures = ['coffee', 'sugarcane']
const idStringNotFound = chance.guid()
const invalidNameString = chance.letter({ length: 1 })
const invalidEmailString = chance.word()

const farmerStub = new FarmerEntity({
  id: new IdValueObject(idString),
  name: new NameValueObject(nameString),
  email: new EmailValueObject(emailString),
  document: new TaxIdValueObject(documentString)
})

const changeFarmerStub = new FarmerEntity({
  id: new IdValueObject(idStringChange),
  name: new NameValueObject(nameStringChange),
  email: new EmailValueObject(emailStringChange),
  document: new TaxIdValueObject(documentStringChange)
})

const MockFarmerRepository = (notFound?: boolean, taxPayerId?: boolean): FarmerRepositoryInterface => ({
  save: vitest.fn().mockResolvedValue(Promise.resolve(farmerStub)),
  update: vitest.fn().mockResolvedValue(Promise.resolve({
    ...changeFarmerStub,
    ...(taxPayerId ? { document: new TaxPayerIdValueObject('73300397000100') } : { document: new TaxIdValueObject(documentStringChange) })
  })),
  find: notFound ? vitest.fn() : vitest.fn().mockResolvedValue(Promise.resolve(farmerStub)),
  findAll: vitest.fn().mockResolvedValue(Promise.resolve([farmerStub])),
  delete: vitest.fn()
})

describe('ChangeFarmerUseCase Unit Tests', () => {
  it('should be able to change a farmer with document tax id', async () => {
    vitest.spyOn(FarmFacadeFactory, 'create').mockImplementation(() => ({
      async change () {
        return await Promise.resolve({
          id: farmIdString,
          name: nameString,
          city: cityString,
          state: stateString,
          totalArea: totalAreaNumber,
          arableArea: arableAreaNumber,
          vegetationArea: vegetationAreaNumber,
          cultures
        })
      },
      async create (): Promise<any> {
        await Promise.resolve()
      },
      async remove (): Promise<any> {
        await Promise.resolve()
      }
    }) as any)
    const farmerRepository = MockFarmerRepository()
    const changeFarmerUseCase = new ChangeFarmerUseCase(farmerRepository)
    const input = {
      id: idStringChange,
      name: nameStringChange,
      email: emailStringChange,
      document: documentStringChange,
      farm: {
        name: nameString,
        city: cityString,
        state: stateString,
        totalArea: totalAreaNumber,
        arableArea: arableAreaNumber,
        vegetationArea: vegetationAreaNumber,
        cultures
      },
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }
    const changeFarmer = await changeFarmerUseCase.execute(input)
    expect(changeFarmer).toEqual({
      id: input.id,
      name: input.name,
      email: input.email,
      document: input.document,
      farm: {
        name: nameString,
        city: cityString,
        state: stateString,
        totalArea: totalAreaNumber,
        arableArea: arableAreaNumber,
        vegetationArea: vegetationAreaNumber,
        cultures,
        updatedAt: expect.any(Date)
      },
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  })

  it('should be able to change a farmer with document tax payer id', async () => {
    vitest.spyOn(FarmFacadeFactory, 'create').mockImplementation(() => ({
      async change () {
        return await Promise.resolve({
          id: farmIdString,
          name: nameString,
          city: cityString,
          state: stateString,
          totalArea: totalAreaNumber,
          arableArea: arableAreaNumber,
          vegetationArea: vegetationAreaNumber,
          cultures
        })
      },
      async create (): Promise<any> {
        await Promise.resolve()
      },
      async remove (): Promise<any> {
        await Promise.resolve()
      }
    }) as any)
    const farmerRepository = MockFarmerRepository(false, true)
    const changeFarmerUseCase = new ChangeFarmerUseCase(farmerRepository)
    const input = {
      id: idStringChange,
      name: nameStringChange,
      email: emailStringChange,
      document: '44830197000161',
      farm: {
        name: nameString,
        city: cityString,
        state: stateString,
        totalArea: totalAreaNumber,
        arableArea: arableAreaNumber,
        vegetationArea: vegetationAreaNumber,
        cultures
      },
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }
    const changeFarmer = await changeFarmerUseCase.execute(input)
    expect(changeFarmer).toEqual({
      id: input.id,
      name: input.name,
      email: input.email,
      document: input.document,
      farm: {
        name: nameString,
        city: cityString,
        state: stateString,
        totalArea: totalAreaNumber,
        arableArea: arableAreaNumber,
        vegetationArea: vegetationAreaNumber,
        cultures,
        updatedAt: expect.any(Date)
      },
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  })

  it('should be able to change a farmer not found', async () => {
    vitest.spyOn(FarmFacadeFactory, 'create').mockImplementation(() => ({
      async change () {
        return await Promise.resolve({
          id: farmIdString,
          name: nameString,
          city: cityString,
          state: stateString,
          totalArea: totalAreaNumber,
          arableArea: arableAreaNumber,
          vegetationArea: vegetationAreaNumber,
          cultures
        })
      },
      async create (): Promise<any> {
        await Promise.resolve()
      },
      async remove (): Promise<any> {
        await Promise.resolve()
      }
    }) as any)
    const farmerRepository = MockFarmerRepository(true)
    const changeFarmerUseCase = new ChangeFarmerUseCase(farmerRepository)
    const input = {
      id: idStringNotFound,
      name: nameStringChange,
      email: emailStringChange,
      document: documentStringChange,
      farm: {
        name: nameString,
        city: cityString,
        state: stateString,
        totalArea: totalAreaNumber,
        arableArea: arableAreaNumber,
        vegetationArea: vegetationAreaNumber,
        cultures
      }
    }
    await expect(changeFarmerUseCase.execute(input)).rejects.toThrow(new Error('farmer_not_found'))
  })

  it('should be able to change a farmer with invalid name', async () => {
    vitest.spyOn(FarmFacadeFactory, 'create').mockImplementation(() => ({
      async change () {
        return await Promise.resolve({
          id: farmIdString,
          name: nameString,
          city: cityString,
          state: stateString,
          totalArea: totalAreaNumber,
          arableArea: arableAreaNumber,
          vegetationArea: vegetationAreaNumber,
          cultures
        })
      },
      async create (): Promise<any> {
        await Promise.resolve()
      },
      async remove (): Promise<any> {
        await Promise.resolve()
      }
    }) as any)
    const farmerRepository = MockFarmerRepository()
    const changeFarmerUseCase = new ChangeFarmerUseCase(farmerRepository)
    const input = {
      id: idStringChange,
      name: invalidNameString,
      email: emailStringChange,
      document: documentStringChange,
      farm: {
        name: nameString,
        city: cityString,
        state: stateString,
        totalArea: totalAreaNumber,
        arableArea: arableAreaNumber,
        vegetationArea: vegetationAreaNumber,
        cultures
      },
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }
    await expect(changeFarmerUseCase.execute(input)).rejects.toThrow(new InvalidNameError())
  })

  it('should be able to change a farmer with invalid email', async () => {
    vitest.spyOn(FarmFacadeFactory, 'create').mockImplementation(() => ({
      async change () {
        return await Promise.resolve({
          id: farmIdString,
          name: nameString,
          city: cityString,
          state: stateString,
          totalArea: totalAreaNumber,
          arableArea: arableAreaNumber,
          vegetationArea: vegetationAreaNumber,
          cultures
        })
      },
      async create (): Promise<any> {
        await Promise.resolve()
      },
      async remove (): Promise<any> {
        await Promise.resolve()
      }
    }) as any)
    const farmerRepository = MockFarmerRepository()
    const changeFarmerUseCase = new ChangeFarmerUseCase(farmerRepository)
    const input = {
      id: idStringChange,
      name: nameStringChange,
      email: invalidEmailString,
      document: documentStringChange,
      farm: {
        name: nameString,
        city: cityString,
        state: stateString,
        totalArea: totalAreaNumber,
        arableArea: arableAreaNumber,
        vegetationArea: vegetationAreaNumber,
        cultures
      },
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }
    await expect(changeFarmerUseCase.execute(input)).rejects.toThrow(new InvalidEmailError())
  })

  it('should be able to change a farmer with invalid document', async () => {
    vitest.spyOn(FarmFacadeFactory, 'create').mockImplementation(() => ({
      async change () {
        return await Promise.resolve({
          id: farmIdString,
          name: nameString,
          city: cityString,
          state: stateString,
          totalArea: totalAreaNumber,
          arableArea: arableAreaNumber,
          vegetationArea: vegetationAreaNumber,
          cultures
        })
      },
      async create (): Promise<any> {
        await Promise.resolve()
      },
      async remove (): Promise<any> {
        await Promise.resolve()
      }
    }) as any)
    const farmerRepository = MockFarmerRepository()
    const changeFarmerUseCase = new ChangeFarmerUseCase(farmerRepository)
    const input = {
      id: idStringChange,
      name: nameStringChange,
      email: emailStringChange,
      farm: {
        name: nameString,
        city: cityString,
        state: stateString,
        totalArea: totalAreaNumber,
        arableArea: arableAreaNumber,
        vegetationArea: vegetationAreaNumber,
        cultures
      },
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    }
    await expect(changeFarmerUseCase.execute({
      ...input,
      document: '11111111111'
    })).rejects.toThrow(new InvalidTaxIdError())
    await expect(changeFarmerUseCase.execute({
      ...input,
      document: '11111111111111'
    })).rejects.toThrow(new InvalidTaxPayerIdError())
  })
})
