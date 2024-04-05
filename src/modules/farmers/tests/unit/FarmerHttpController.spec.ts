import { FarmerHttpController } from '@modules/farmers/infra'
import { Chance } from 'chance'

const chance = new Chance()
const idString = chance.guid()
const nameString = chance.name()

const mockHttpServer = {
  on: vitest.fn(),
  listen: vitest.fn()
}

const mockChangeFarmerUseCase = {
  execute: vitest.fn()
}

const mockGetFarmerUseCase = {
  execute: vitest.fn()
}

const mockParams = { id: idString }
const mockBody = { name: nameString }

describe('FarmerHttpController Unit Tests', () => {
  it('should be creates routes for patch and get requests', () => {
    new FarmerHttpController(
      mockHttpServer,
      mockChangeFarmerUseCase as any,
      mockGetFarmerUseCase as any
    )
    expect(mockHttpServer.on).toHaveBeenCalledTimes(2)
    expect(mockHttpServer.on).toHaveBeenCalledWith(expect.any(Object), expect.any(Function))
  })

  it('should be calls ChangeFarmerUseCase on patch request', async () => {
    new FarmerHttpController(
      mockHttpServer,
      mockChangeFarmerUseCase as any,
      mockGetFarmerUseCase as any
    )
    const mockContext = { params: mockParams, body: mockBody }
    await mockHttpServer.on.mock.calls[0][1](mockContext)
    expect(mockChangeFarmerUseCase.execute).toHaveBeenCalledTimes(1)
    expect(mockChangeFarmerUseCase.execute).toHaveBeenCalledWith({ ...mockBody, id: mockParams.id })
  })

  it('should be calls GetFarmerUseCase on get request', async () => {
    new FarmerHttpController(
      mockHttpServer,
      mockChangeFarmerUseCase as any,
      mockGetFarmerUseCase as any
    )
    const mockContext = { params: mockParams }
    await mockHttpServer.on.mock.calls[1][1](mockContext)
    expect(mockGetFarmerUseCase.execute).toHaveBeenCalledTimes(1)
    expect(mockGetFarmerUseCase.execute).toHaveBeenCalledWith({ id: mockParams.id })
  })
})
