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

export interface InputGetFarmersDto {
  // TODO: Add more params, example: pagination, filters, etc
}

export type OutputGetFarmersDto = Array<{
  id: string
  name: string
  email: string
  document: string
  farm: Farm
  createdAt: Date
  updatedAt: Date
}>
