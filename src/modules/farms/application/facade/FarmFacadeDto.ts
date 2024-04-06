export interface InputFarmFacadeDto {
  id: string
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

export interface OutputFarmFacadeDto {
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
