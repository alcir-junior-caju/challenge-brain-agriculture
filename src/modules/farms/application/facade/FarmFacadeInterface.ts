import { type InputChangeFarmFacadeDto, type InputCreateFarmFacadeDto, type InputRemoveFarmFacadeDto, type OutputChangeFarmFacadeDto, type OutputCreateFarmFacadeDto, type OutputRemoveFarmFacadeDto } from './FarmFacadeDto'

export interface FarmFacadeInterface {
  create: (input: InputCreateFarmFacadeDto) => Promise<OutputCreateFarmFacadeDto>
  change: (input: InputChangeFarmFacadeDto) => Promise<OutputChangeFarmFacadeDto>
  remove: (input: InputRemoveFarmFacadeDto) => Promise<OutputRemoveFarmFacadeDto>
}
