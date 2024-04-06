import { FarmerEntity, FarmerRepository } from '@modules/farmers'
import { type ConnectionInterface, EmailValueObject, IdValueObject, NameValueObject, PgPromiseAdapter, TaxIdValueObject, TaxPayerIdValueObject } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()

describe('FarmerRepository Integration Tests', () => {
  let connection: ConnectionInterface
  let farmerRepository: FarmerRepository

  beforeEach(() => {
    connection = new PgPromiseAdapter()
    farmerRepository = new FarmerRepository(connection)
  })

  afterEach(async () => {
    await connection.close()
  })

  it('should be get a farmer', async () => {
    const farmerEntity = new FarmerEntity({
      id: new IdValueObject(chance.guid()),
      name: new NameValueObject(chance.name()),
      email: new EmailValueObject(chance.email()),
      document: new TaxIdValueObject(chance.cpf({ formatted: false }))
    })
    await farmerRepository.save(farmerEntity)
    const output = await farmerRepository.find(farmerEntity.id.value)
    expect(output.id.value).toBe(farmerEntity.id.value)
    expect(output.name.value).toBe(farmerEntity.name.value)
    expect(output.email.value).toBe(farmerEntity.email.value)
    expect(output.document.value).toBe(farmerEntity.document.value)
    await farmerRepository.delete(farmerEntity.id.value)
  })

  it('should be get farmers', async () => {
    const farmerOneEntity = new FarmerEntity({
      id: new IdValueObject(chance.guid()),
      name: new NameValueObject(chance.name()),
      email: new EmailValueObject(chance.email()),
      document: new TaxIdValueObject(chance.cpf({ formatted: false }))
    })
    const farmerTwoEntity = new FarmerEntity({
      id: new IdValueObject(chance.guid()),
      name: new NameValueObject(chance.name()),
      email: new EmailValueObject(chance.email()),
      document: new TaxIdValueObject(chance.cpf({ formatted: false }))
    })
    const farmerThreeEntity = new FarmerEntity({
      id: new IdValueObject(chance.guid()),
      name: new NameValueObject(chance.name()),
      email: new EmailValueObject(chance.email()),
      document: new TaxPayerIdValueObject('46885232000175')
    })
    await farmerRepository.save(farmerOneEntity)
    await farmerRepository.save(farmerTwoEntity)
    await farmerRepository.save(farmerThreeEntity)
    const output = await farmerRepository.findAll()
    expect(output.length).toBeGreaterThan(0)
    await farmerRepository.delete(farmerOneEntity.id.value)
    await farmerRepository.delete(farmerTwoEntity.id.value)
    await farmerRepository.delete(farmerThreeEntity.id.value)
  })

  it('should be throw error when farmer not found', async () => {
    await expect(farmerRepository.find(chance.guid())).rejects.toThrow('farmer_not_found')
  })

  it('should be create a farmer', async () => {
    const farmerEntity = new FarmerEntity({
      id: new IdValueObject(chance.guid()),
      name: new NameValueObject(chance.name()),
      email: new EmailValueObject(chance.email()),
      document: new TaxIdValueObject(chance.cpf({ formatted: false }))
    })
    await farmerRepository.save(farmerEntity)
    const output = await farmerRepository.find(farmerEntity.id.value)
    expect(output.id.value).toBe(farmerEntity.id.value)
    expect(output.name.value).toBe(farmerEntity.name.value)
    expect(output.email.value).toBe(farmerEntity.email.value)
    expect(output.document.value).toBe(farmerEntity.document.value)
    await farmerRepository.delete(farmerEntity.id.value)
  })

  it('should be update a farmer', async () => {
    const farmerEntity = new FarmerEntity({
      id: new IdValueObject(chance.guid()),
      name: new NameValueObject(chance.name()),
      email: new EmailValueObject(chance.email()),
      document: new TaxIdValueObject(chance.cpf({ formatted: false }))
    })
    await farmerRepository.save(farmerEntity)
    const farmerUpdated = {
      id: new IdValueObject(farmerEntity.id.value),
      name: new NameValueObject(chance.name()),
      email: new EmailValueObject(chance.email()),
      document: new TaxIdValueObject(chance.cpf({ formatted: false }))
    }
    const farmerUpdatedEntity = new FarmerEntity(farmerUpdated)
    await farmerRepository.update(farmerUpdatedEntity)
    const output = await farmerRepository.find(farmerEntity.id.value)
    expect(output.id.value).toBe(farmerUpdatedEntity.id.value)
    expect(output.name.value).toBe(farmerUpdatedEntity.name.value)
    expect(output.email.value).toBe(farmerUpdatedEntity.email.value)
    expect(output.document.value).toBe(farmerUpdatedEntity.document.value)
    await farmerRepository.delete(farmerEntity.id.value)
  })
})
