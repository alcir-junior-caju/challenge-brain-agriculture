export interface InputChangeFarmDto {
  id: string
  farmerId?: string
  name?: string
  city?: string
  state?: string
  totalArea?: number
  arableArea?: number
  vegetationArea?: number
  cultures?: string[]
  updatedAt?: Date
}

export interface OutputChangeFarmDto {
  id: string
  name: string
  city: string
  state: string
  totalArea: number
  arableArea: number
  vegetationArea: number
  cultures: string[]
  createdAt: Date
  updatedAt: Date
}
