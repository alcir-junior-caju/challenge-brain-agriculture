import { type FarmEntity } from '@modules/farms/domain/entity'

export interface FarmRepositoryInterface {
  save: (farm: FarmEntity) => Promise<void>
  update: (farm: FarmEntity) => Promise<void>
  find: (id: string) => Promise<FarmEntity>
  findAll: () => Promise<FarmEntity[]>
  delete: (id: string) => Promise<void>
}
