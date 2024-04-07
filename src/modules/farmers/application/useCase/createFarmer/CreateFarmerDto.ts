interface Farm {
  id?: string
  name: string
  city: string
  state: string
  totalArea: number
  arableArea: number
  vegetationArea: number
  cultures?: string[]
}

export interface InputCreateFarmerDto {
  id: string
  name: string
  email: string
  document: string
  farm: Farm
  createdAt?: Date
  updatedAt?: Date
}

export interface OutputCreateFarmerDto {
  id: string
  name: string
  email: string
  document: string
  farm: Farm
  createdAt: Date
  updatedAt: Date
}
