import { type ConnectionInterface, IdValueObject } from '@modules/shared'

import { type FarmRepositoryInterface } from '../application'
import { FarmAreaValueObject, FarmEntity, FarmNameValueObject, FarmTilthValueObject } from '../domain'

export class FarmRepository implements FarmRepositoryInterface {
  connection: ConnectionInterface

  constructor (connection: ConnectionInterface) {
    this.connection = connection
  }

  async save (farm: FarmEntity): Promise<void> {
    await this.connection.query('INSERT INTO brain_agriculture.farms (id, farmer_id, name, city, state, total_area, arable_area, vegetation_area, cultures) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [farm.id.value, farm.farmerId?.value, farm.name.value, farm.city.value, farm.state.value, farm.totalArea.value, farm.arableArea.value, farm.vegetationArea.value, farm.cultures.map(culture => culture.value)])
  }

  async update (farm: FarmEntity): Promise<void> {
    await this.connection.query('UPDATE brain_agriculture.farms SET farmer_id = $2, name = $3, city = $4, state = $5, total_area = $6, arable_area = $7, vegetation_area = $8, cultures = $9 WHERE id = $1', [farm.id.value, farm.farmerId?.value, farm.name.value, farm.city.value, farm.state.value, farm.totalArea.value, farm.arableArea.value, farm.vegetationArea.value, farm.cultures.map(culture => culture.value)])
  }

  async find (id: string): Promise<FarmEntity> {
    const [farmData] = await this.connection.query('SELECT * FROM brain_agriculture.farms WHERE id = $1', [id])
    if (!farmData) throw new Error('farm_not_found')
    const farmEntity = new FarmEntity({
      id: new IdValueObject(String(farmData.id)),
      farmerId: farmData.farmer_id ? new IdValueObject(String(farmData.farmer_id)) : undefined,
      name: new FarmNameValueObject(farmData.name),
      city: new FarmNameValueObject(farmData.city),
      state: new FarmNameValueObject(farmData.state),
      totalArea: new FarmAreaValueObject(farmData.total_area),
      arableArea: new FarmAreaValueObject(farmData.arable_area),
      vegetationArea: new FarmAreaValueObject(farmData.vegetation_area),
      cultures: farmData.cultures.map((culture: string) => new FarmTilthValueObject(culture as any)),
      createdAt: farmData.created_at,
      updatedAt: farmData.updated_at
    })
    return farmEntity
  }

  async findAll (): Promise<FarmEntity[]> {
    const farmsData = await this.connection.query('SELECT * FROM brain_agriculture.farms')
    const farmsEntities = farmsData.map((farmData: Record<string, any>) => new FarmEntity({
      id: new IdValueObject(String(farmData.id)),
      farmerId: farmData.farmer_id ? new IdValueObject(String(farmData.farmer_id)) : undefined,
      name: new FarmNameValueObject(farmData.name),
      city: new FarmNameValueObject(farmData.city),
      state: new FarmNameValueObject(farmData.state),
      totalArea: new FarmAreaValueObject(farmData.total_area),
      arableArea: new FarmAreaValueObject(farmData.arable_area),
      vegetationArea: new FarmAreaValueObject(farmData.vegetation_area),
      cultures: farmData.cultures.map((culture: string) => new FarmTilthValueObject(culture as any)),
      createdAt: farmData.created_at,
      updatedAt: farmData.updated_at
    }))
    return farmsEntities
  }

  async delete (id: string): Promise<void> {
    await this.connection.query('DELETE FROM brain_agriculture.farms WHERE id = $1', [id])
  }
}
