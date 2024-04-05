import { FarmerEntity } from '@modules/farmers/domain'
import { FarmerRepository } from '@modules/farmers/repository'
import { AxiosAdapter, EmailValueObject, IdValueObject, NameValueObject, PgPromiseAdapter, TaxIdValueObject } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const nameString = chance.name()
const emailString = chance.email()
const documentString = chance.cpf({ formatted: false })
const nameChangedString = chance.name()
const emailChangedString = chance.email()
const documentChangedString = chance.cpf({ formatted: false })

describe('FarmerApi Integration Tests', () => {
  let connection: PgPromiseAdapter
  let farmerRepository: FarmerRepository

  beforeEach(async () => {
    connection = new PgPromiseAdapter()
    farmerRepository = new FarmerRepository(connection)
  })

  afterEach(async () => {
    await connection.close()
  })

  it('should update farmer api', async () => {
    const httpClient = new AxiosAdapter()
    const entity = new FarmerEntity({
      id: new IdValueObject(idString),
      name: new NameValueObject(nameString),
      email: new EmailValueObject(emailString),
      document: new TaxIdValueObject(documentString)
    })
    await farmerRepository.save(entity)
    const input = {
      name: nameChangedString,
      email: emailChangedString,
      document: documentChangedString
    }
    const response = await httpClient.patch(
      `http://localhost:3000/farmers/${entity.id.value}`,
      input
    )
    const { data } = response
    expect(response.status).toBe(200)
    expect(data).toEqual({
      id: entity.id.value,
      name: input.name,
      email: input.email,
      document: input.document,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    })
    await farmerRepository.delete(entity.id.value)
  })

  it('should get farmer api', async () => {
    const httpClient = new AxiosAdapter()
    const entity = new FarmerEntity({
      id: new IdValueObject(idString),
      name: new NameValueObject(nameString),
      email: new EmailValueObject(emailString),
      document: new TaxIdValueObject(documentString)
    })
    await farmerRepository.save(entity)
    const response = await httpClient.get(`http://localhost:3000/farmers/${entity.id.value}`)
    expect(response.status).toBe(200)
    expect(response.data).toEqual({
      id: entity.id.value,
      name: entity.name.value,
      email: entity.email.value,
      document: entity.document.value,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    })
    await farmerRepository.delete(entity.id.value)
  })
})
