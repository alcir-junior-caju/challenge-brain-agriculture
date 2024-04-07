import { type ConnectionInterface } from '@modules/shared'

import { type FarmerRepositoryInterface } from '../application'
import { type FarmerEntity } from '../domain'

export class FarmerRepository implements FarmerRepositoryInterface {
  connection: ConnectionInterface

  constructor (connection: ConnectionInterface) {
    this.connection = connection
  }

  async save (farmer: FarmerEntity): Promise<void> {
    await this.connection.query('INSERT INTO brain_agriculture.farmers (id, name, email, document) VALUES ($1, $2, $3, $4)', [farmer.id.value, farmer.name.value, farmer.email.value, farmer.document.value])
  }

  async update (farmer: FarmerEntity): Promise<void> {
    await this.connection.query('UPDATE brain_agriculture.farmers SET name = $1, email = $2, document = $3, updated_at = $4 WHERE id = $5', [farmer.name.value, farmer.email.value, farmer.document.value, farmer.updatedAt, farmer.id.value])
  }

  async find (id: string): Promise<Record<string, any>> {
    const [farmerData] = await this.connection.query('SELECT farmers.*, farms.id AS farm_id, farms.name AS farm_name, farms.city, farms.state, farms.total_area, farms.arable_area, farms.vegetation_area, farms.cultures, farms.created_at AS farm_created_at, farms.updated_at AS farm_updated_at FROM brain_agriculture.farmers AS farmers LEFT JOIN brain_agriculture.farms AS farms ON farmers.id = farms.farmer_id WHERE farmers.id = $1', [id])
    if (!farmerData) throw new Error('farmer_not_found')
    return farmerData
  }

  async findAll (): Promise<any[]> {
    const farmersData = await this.connection.query('SELECT farmers.*, farms.id AS farm_id, farms.name AS farm_name, farms.city, farms.state, farms.total_area, farms.arable_area, farms.vegetation_area, farms.cultures, farms.created_at AS farm_created_at, farms.updated_at AS farm_updated_at FROM brain_agriculture.farmers AS farmers LEFT JOIN brain_agriculture.farms AS farms ON farmers.id = farms.farmer_id')
    const farmers = []
    for (const farmerData of farmersData) {
      farmers.push(farmerData)
    }
    return farmers
  }

  async delete (id: string): Promise<void> {
    await this.connection.query('DELETE FROM brain_agriculture.farmers WHERE id = $1', [id])
  }
}
