import { type ConnectionInterface, EmailValueObject, IdValueObject, NameValueObject, TaxIdValueObject, TaxPayerIdValueObject } from '@modules/shared'

import { type FarmerRepositoryInterface } from '../application'
import { FarmerEntity } from '../domain'

export class FarmerRepository implements FarmerRepositoryInterface {
  connection: ConnectionInterface

  constructor (connection: ConnectionInterface) {
    this.connection = connection
  }

  async save (farmer: FarmerEntity): Promise<void> {
    await this.connection.query('INSERT INTO brain_agriculture.farmers (id, name, email, document) VALUES ($1, $2, $3, $4)', [farmer.id.value, farmer.name.value, farmer.email.value, farmer.document.value])
  }

  async update (farmer: FarmerEntity): Promise<void> {
    await this.connection.query('UPDATE brain_agriculture.farmers SET name = $1, email = $2, document = $3 WHERE id = $4', [farmer.name.value, farmer.email.value, farmer.document.value, farmer.id.value])
  }

  async find (id: string): Promise<FarmerEntity> {
    const [farmerData] = await this.connection.query('SELECT * FROM brain_agriculture.farmers WHERE id = $1', [id])
    if (!farmerData) throw new Error('farmer_not_found')
    const farmerEntity = new FarmerEntity({
      id: new IdValueObject(String(farmerData.id)),
      name: new NameValueObject(farmerData.name),
      email: new EmailValueObject(farmerData.email),
      document: farmerData.document.length === 11 ? new TaxIdValueObject(farmerData.document) : new TaxPayerIdValueObject(farmerData.document),
      createdAt: farmerData.created_at,
      updatedAt: farmerData.updated_at
    })
    return farmerEntity
  }

  async findAll (): Promise<FarmerEntity[]> {
    const farmersData = await this.connection.query('SELECT * FROM brain_agriculture.farmers')
    const farmers = []
    for (const farmerData of farmersData) {
      const farmerEntity = new FarmerEntity({
        id: new IdValueObject(String(farmerData.id)),
        name: new NameValueObject(farmerData.name),
        email: new EmailValueObject(farmerData.email),
        document: farmerData.document.length === 11 ? new TaxIdValueObject(farmerData.document) : new TaxPayerIdValueObject(farmerData.document),
        createdAt: farmerData.created_at,
        updatedAt: farmerData.updated_at
      })
      farmers.push(farmerEntity)
    }
    return farmers
  }

  async delete (id: string): Promise<void> {
    await this.connection.query('DELETE FROM brain_agriculture.farmers WHERE id = $1', [id])
  }
}
