import { type FarmerEntity } from '@modules/farmers/domain'

export interface FarmerRepositoryInterface {
  save: (farmer: FarmerEntity) => Promise<void>
  update: (farmer: FarmerEntity) => Promise<void>
  find: (id: string) => Promise<Record<string, any>>
  findAll: () => Promise<any[]>
  delete: (id: string) => Promise<void>
}
