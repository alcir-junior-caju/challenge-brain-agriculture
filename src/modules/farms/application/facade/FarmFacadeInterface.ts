import { type InputCreateFarmFacadeDto, type OutputCreateFarmFacadeDto } from './FarmFacadeDto'

export interface FarmFacadeInterface {
  create: (input: InputCreateFarmFacadeDto) => Promise<OutputCreateFarmFacadeDto>
}
