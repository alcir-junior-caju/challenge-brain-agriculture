export interface InputGetFarmerDto {
  id: string
}

export interface OutputGetFarmerDto {
  id: string
  name: string
  email: string
  document: string
  createdAt: Date
  updatedAt: Date
}
