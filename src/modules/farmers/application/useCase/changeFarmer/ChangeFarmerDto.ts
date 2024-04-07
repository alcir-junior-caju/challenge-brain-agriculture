interface Farm {
  name?: string
  city?: string
  state?: string
  totalArea?: number
  arableArea?: number
  vegetationArea?: number
  cultures?: string[]
  updatedAt?: Date
}

export interface InputChangeFarmerDto {
  id: string
  name?: string
  email?: string
  farm: Farm
  document?: string
  updatedAt?: Date
}

export interface OutputChangeFarmerDto {
  id: string
  name: string
  email: string
  document: string
  farm: Farm
  createdAt: Date
  updatedAt: Date
}
