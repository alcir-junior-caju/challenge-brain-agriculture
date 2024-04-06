import { FarmerHttpController } from '@modules/farmers/infra'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const nameString = chance.name()

const mockHttpServer = {
  on: vitest.fn(),
  listen: vitest.fn()
}

const mockFarmerUseCase = {
  execute: vitest.fn()
}

const mockParams = { id: idString }
const mockBody = { name: nameString }

describe('FarmerHttpController Unit Tests', () => {
  it('should be creates routes for patch and get requests', () => {
    new FarmerHttpController(
      mockHttpServer,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any
    )
    expect(mockHttpServer.on).toHaveBeenCalledTimes(4)
    expect(mockHttpServer.on).toHaveBeenCalledWith(expect.any(Object), expect.any(Function))
  })

  it('should be calls CreateFarmerUseCase on post request', async () => {
    new FarmerHttpController(
      mockHttpServer,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any
    )
    const mockContext = { body: mockBody }
    await mockHttpServer.on.mock.calls[0][1](mockContext)
    expect(mockFarmerUseCase.execute).toHaveBeenCalledTimes(1)
    expect(mockFarmerUseCase.execute).toHaveBeenCalledWith(mockBody)
  })

  it('should be calls ChangeFarmerUseCase on patch request', async () => {
    new FarmerHttpController(
      mockHttpServer,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any
    )
    const mockContext = { params: mockParams, body: mockBody }
    await mockHttpServer.on.mock.calls[1][1](mockContext)
    expect(mockFarmerUseCase.execute).toHaveBeenCalledTimes(2)
    expect(mockFarmerUseCase.execute).toHaveBeenCalledWith({ ...mockBody, id: mockParams.id })
  })

  it('should be calls GetFarmerUseCase on get request', async () => {
    new FarmerHttpController(
      mockHttpServer,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any
    )
    const mockContext = { params: mockParams }
    await mockHttpServer.on.mock.calls[2][1](mockContext)
    expect(mockFarmerUseCase.execute).toHaveBeenCalledTimes(3)
    expect(mockFarmerUseCase.execute).toHaveBeenCalledWith({ id: mockParams.id })
  })

  it('should be calls GetFarmersUseCase on get request', async () => {
    new FarmerHttpController(
      mockHttpServer,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any,
      mockFarmerUseCase as any
    )
    await mockHttpServer.on.mock.calls[3][1]()
    expect(mockFarmerUseCase.execute).toHaveBeenCalledTimes(4)
    expect(mockFarmerUseCase.execute).toHaveBeenCalledWith({})
  })
})
