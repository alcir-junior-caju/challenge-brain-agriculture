export interface InputGetFarmersDto {
  // Add more params, example: pagination, filters, etc
}

export type OutputGetFarmersDto = Array<{
  id: string
  name: string
  email: string
  document: string
  createdAt: Date
  updatedAt: Date
}>
