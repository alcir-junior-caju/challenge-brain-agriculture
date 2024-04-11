import pgp from 'pg-promise'

import { DotEnvAdapter } from '../adapters'

import { type ConnectionInterface } from './ConnectionInterface'

const config = {
  client: DotEnvAdapter.get('DATABASE_CLIENT'),
  host: DotEnvAdapter.get('DATABASE_HOST'),
  port: DotEnvAdapter.get('DATABASE_PORT'),
  database: DotEnvAdapter.get('DATABASE_NAME'),
  user: DotEnvAdapter.get('DATABASE_USERNAME'),
  password: DotEnvAdapter.get('DATABASE_PASSWORD')
}

const databaseUrl = `${config.client}://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`

export class PgPromiseAdapter implements ConnectionInterface {
  private static instance: PgPromiseAdapter
  private readonly connection: any

  constructor () {
    const pgpInstance = pgp()
    this.connection = pgpInstance(databaseUrl)
  }

  static getInstance (): PgPromiseAdapter {
    if (!PgPromiseAdapter.instance) {
      PgPromiseAdapter.instance = new PgPromiseAdapter()
    }
    return PgPromiseAdapter.instance
  }

  async query (statement: string, params?: any): Promise<any> {
    const data = await this.connection.query(statement, params)
    return data
  }

  async close (): Promise<void> {
    await this.connection.$pool.end()
  }
}
