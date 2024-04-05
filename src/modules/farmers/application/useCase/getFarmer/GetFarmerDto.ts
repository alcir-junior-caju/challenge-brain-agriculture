export interface InputGetFarmerDto {
  id: string
}

export interface OutputGetFarmerDto {
  id: string
  name: string
  email: string
  taxId: string
  createdAt: Date
  updatedAt: Date
}
