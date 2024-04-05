export interface InputCreateFarmerDto {
  id: string
  name: string
  email: string
  createdAt?: Date
  updatedAt?: Date
}

export interface OutputCreateFarmerDto {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}
