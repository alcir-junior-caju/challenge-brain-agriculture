import { ChangeFarmerUseCase, CreateFarmerUseCase, FarmerHttpController, FarmerRepository, GetFarmersUseCase, GetFarmerUseCase, HonoAdapter, PgPromiseAdapter, RemoveFarmerUseCase } from './modules'

async function main (): Promise<void> {
  const connection = new PgPromiseAdapter()
  const farmerRepository = new FarmerRepository(connection)
  const createFarmer = new CreateFarmerUseCase(farmerRepository)
  const changeFarmer = new ChangeFarmerUseCase(farmerRepository)
  const getFarmer = new GetFarmerUseCase(farmerRepository)
  const getFarmers = new GetFarmersUseCase(farmerRepository)
  const removeFarmer = new RemoveFarmerUseCase(farmerRepository)
  const httpServer = new HonoAdapter()
  new FarmerHttpController(
    httpServer,
    createFarmer,
    changeFarmer,
    getFarmer,
    getFarmers,
    removeFarmer
  )
  httpServer.listen(3000)
}

main()
