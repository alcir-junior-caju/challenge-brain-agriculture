import { type UseCaseInterface } from '@modules/shared'

import { type FarmRepositoryInterface } from '../../repository'

import { type InputRemoveFarmDto, type OutputRemoveFarmDto } from './RemoveFarmDto'

export class RemoveFarmUseCase implements UseCaseInterface<InputRemoveFarmDto, OutputRemoveFarmDto> {
  private readonly _farmRepository: FarmRepositoryInterface

  constructor (farmRepository: FarmRepositoryInterface) {
    this._farmRepository = farmRepository
  }

  async execute (input: InputRemoveFarmDto): Promise<OutputRemoveFarmDto> {
    const farm = await this._farmRepository.find(input.id)
    if (!farm) throw new Error('farm_not_found')
    await this._farmRepository.delete(input.id)
    return {}
  }
}
