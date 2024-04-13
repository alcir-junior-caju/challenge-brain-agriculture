import { AxiosAdapter } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()

describe('FarmerApi Integration Tests', () => {
  it('should post farmer api', async () => {
    const httpClient = new AxiosAdapter()
    const input = {
      name: chance.name(),
      email: chance.email(),
      document: chance.cpf({ formatted: false }),
      farm: {
        name: chance.name(),
        city: chance.state({ full: true }),
        state: chance.province(),
        totalArea: 1000,
        arableArea: 400,
        vegetationArea: 200,
        cultures: ['coffee', 'sugarcane']
      }
    }
    const response = await httpClient.post('http://localhost:3000/farmers', input)
    const { data } = response
    expect(response.status).toBe(200)
    expect(data).toEqual({
      id: expect.any(String),
      name: input.name,
      email: input.email,
      document: input.document,
      farm: {
        id: expect.any(String),
        name: input.farm.name,
        city: input.farm.city,
        state: input.farm.state,
        totalArea: input.farm.totalArea,
        arableArea: input.farm.arableArea,
        vegetationArea: input.farm.vegetationArea,
        cultures: input.farm.cultures,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      },
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    })
    await httpClient.delete(`http://localhost:3000/farmers/${data.id}`)
  })

  it('should post farmer with empty name api', async () => {
    const httpClient = new AxiosAdapter()
    const input = {
      name: '',
      email: chance.email(),
      document: chance.cpf({ formatted: false })
    }
    const response = await httpClient.post('http://localhost:3000/farmers', input)
    const { data } = response
    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error.issues[0].path).toEqual(['name'])
    expect(data.error.issues[0].code).toEqual('too_small')
    expect(data.error.name).toEqual('ZodError')
  })

  it('should post farmer with invalid email api', async () => {
    const httpClient = new AxiosAdapter()
    const input = {
      name: chance.name(),
      email: 'john@t',
      document: chance.cpf({ formatted: false })
    }
    const response = await httpClient.post('http://localhost:3000/farmers', input)
    const { data } = response
    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error.issues[0].path).toEqual(['email'])
    expect(data.error.issues[0].code).toEqual('invalid_string')
    expect(data.error.issues[0].validation).toEqual('email')
    expect(data.error.name).toEqual('ZodError')
  })

  it('should update farmer api', async () => {
    const httpClient = new AxiosAdapter()
    const inputCreate = {
      name: chance.name(),
      email: chance.email(),
      document: chance.cpf({ formatted: false }),
      farm: {
        name: chance.name(),
        city: chance.state({ full: true }),
        state: chance.province(),
        totalArea: 1000,
        arableArea: 400,
        vegetationArea: 200,
        cultures: ['coffee', 'sugarcane']
      }
    }
    const responseCreated = await httpClient.post('http://localhost:3000/farmers', inputCreate)
    const input = {
      name: chance.name(),
      email: chance.email(),
      document: chance.cpf({ formatted: false }),
      farm: {
        name: chance.name(),
        city: chance.state({ full: true }),
        state: chance.province(),
        totalArea: 1000,
        arableArea: 400,
        vegetationArea: 200,
        cultures: ['coffee', 'sugarcane']
      }
    }
    const response = await httpClient.patch(
      `http://localhost:3000/farmers/${responseCreated.data.id}`,
      input
    )
    const { data } = response
    expect(response.status).toBe(200)
    expect(data).toEqual({
      id: responseCreated.data.id,
      name: input.name,
      email: input.email,
      document: input.document,
      farm: {
        name: input.farm.name,
        city: input.farm.city,
        state: input.farm.state,
        totalArea: input.farm.totalArea,
        arableArea: input.farm.arableArea,
        vegetationArea: input.farm.vegetationArea,
        cultures: input.farm.cultures,
        updatedAt: expect.any(String)
      },
      updatedAt: expect.any(String)
    })
    await httpClient.delete(`http://localhost:3000/farmers/${data.id}`)
  })

  it('should get farmer api', async () => {
    const httpClient = new AxiosAdapter()
    const inputCreate = {
      name: chance.name(),
      email: chance.email(),
      document: chance.cpf({ formatted: false }),
      farm: {
        name: chance.name(),
        city: chance.state({ full: true }),
        state: chance.province(),
        totalArea: 1000,
        arableArea: 400,
        vegetationArea: 200,
        cultures: ['coffee', 'sugarcane']
      }
    }
    const responseCreated = await httpClient.post('http://localhost:3000/farmers', inputCreate)
    const response = await httpClient.get(`http://localhost:3000/farmers/${responseCreated.data.id}`)
    expect(response.status).toBe(200)
    expect(response.data).toEqual({
      id: responseCreated.data.id,
      name: responseCreated.data.name,
      email: responseCreated.data.email,
      document: responseCreated.data.document,
      farm: {
        name: responseCreated.data.farm.name,
        city: responseCreated.data.farm.city,
        state: responseCreated.data.farm.state,
        totalArea: `${responseCreated.data.farm.totalArea}`,
        arableArea: `${responseCreated.data.farm.arableArea}`,
        vegetationArea: `${responseCreated.data.farm.vegetationArea}`,
        cultures: responseCreated.data.farm.cultures,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      }
    })
    await httpClient.delete(`http://localhost:3000/farmers/${responseCreated.data.id}`)
  })

  it('should get farmers api', async () => {
    const httpClient = new AxiosAdapter()
    const inputCreate = {
      name: chance.name(),
      email: chance.email(),
      document: chance.cpf({ formatted: false })
    }
    const responseCreated = await httpClient.post('http://localhost:3000/farmers', inputCreate)
    const response = await httpClient.get('http://localhost:3000/farmers')
    expect(response.status).toBe(200)
    expect(response.data.length).toBeGreaterThan(0)
    await httpClient.delete(`http://localhost:3000/farmers/${responseCreated.data.id}`)
  })

  it('should remove farmer api', async () => {
    const httpClient = new AxiosAdapter()
    const inputCreate = {
      name: chance.name(),
      email: chance.email(),
      farm: {
        name: chance.name(),
        city: chance.state({ full: true }),
        state: chance.province(),
        totalArea: 1000,
        arableArea: 400,
        vegetationArea: 200,
        cultures: ['coffee', 'sugarcane']
      },
      document: chance.cpf({ formatted: false })
    }
    const responseCreated = await httpClient.post('http://localhost:3000/farmers', inputCreate)
    const response = await httpClient.delete(`http://localhost:3000/farmers/${responseCreated.data.id}`)
    expect(response.status).toBe(200)
    expect(response.data).toEqual({})
  })
})
