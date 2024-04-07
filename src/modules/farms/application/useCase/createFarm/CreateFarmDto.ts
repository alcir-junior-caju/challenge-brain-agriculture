export interface InputCreateFarmDto {
  id: string
  farmerId?: string
  name: string
  city: string
  state: string
  totalArea: number
  arableArea: number
  vegetationArea: number
  cultures?: string[]
}

export interface OutputCreateFarmDto {
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
