import { ChangeFarmerUseCase, CreateFarmerUseCase, FarmerHttpController, FarmerRepository, FarmHttpController, FarmRepository, GetFarmersUseCase, GetFarmerUseCase, GetFarmsUseCase, HonoAdapter, PgPromiseAdapter, RemoveFarmerUseCase } from './modules'

async function main (): Promise<void> {
  const connection = PgPromiseAdapter.getInstance()
  const farmerRepository = new FarmerRepository(connection)
  const farmRepository = new FarmRepository(connection)
  const createFarmer = new CreateFarmerUseCase(farmerRepository)
  const changeFarmer = new ChangeFarmerUseCase(farmerRepository)
  const getFarmer = new GetFarmerUseCase(farmerRepository)
  const getFarmers = new GetFarmersUseCase(farmerRepository)
  const removeFarmer = new RemoveFarmerUseCase(farmerRepository)
  const getFarms = new GetFarmsUseCase(farmRepository)
  const httpServer = new HonoAdapter()
  new FarmerHttpController(
    httpServer,
    createFarmer,
    changeFarmer,
    getFarmer,
    getFarmers,
    removeFarmer
  )
  new FarmHttpController(httpServer, getFarms)
  httpServer.listen(3000)
}

main()
