import { type InputFarmFacadeDto, type OutputFarmFacadeDto } from './FarmFacadeDto'

export interface FarmFacadeInterface {
  create: (input: InputFarmFacadeDto) => Promise<OutputFarmFacadeDto>
}
