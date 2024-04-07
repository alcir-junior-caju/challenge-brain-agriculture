export interface InputCreateFarmFacadeDto {
  id?: string
  farmerId?: string
  name: string
  city: string
  state: string
  totalArea: number
  arableArea: number
  vegetationArea: number
  cultures?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface OutputCreateFarmFacadeDto {
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

export interface InputChangeFarmFacadeDto {
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

export interface OutputChangeFarmFacadeDto {
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

export interface InputRemoveFarmFacadeDto {
  id: string
}

export interface OutputRemoveFarmFacadeDto {}
