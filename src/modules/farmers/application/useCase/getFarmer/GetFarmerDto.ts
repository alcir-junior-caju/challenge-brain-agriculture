interface Farm {
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

export interface InputGetFarmerDto {
  id: string
}

export interface OutputGetFarmerDto {
  id: string
  name: string
  email: string
  document: string
  farm: Farm
  createdAt: Date
  updatedAt: Date
}
