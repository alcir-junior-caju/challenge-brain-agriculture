import { ChangeFarmerUseCase, FarmerHttpController, FarmerRepository, GetFarmerUseCase, HonoAdapter, PgPromiseAdapter } from './modules'

async function main (): Promise<void> {
  const connection = new PgPromiseAdapter()
  const farmerRepository = new FarmerRepository(connection)
  const changeFarmer = new ChangeFarmerUseCase(farmerRepository)
  const getFarmer = new GetFarmerUseCase(farmerRepository)
  const httpServer = new HonoAdapter()
  new FarmerHttpController(
    httpServer,
    changeFarmer,
    getFarmer
  )
  httpServer.listen(3000)
}

main()
