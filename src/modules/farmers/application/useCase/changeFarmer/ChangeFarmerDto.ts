export interface InputChangeFarmerDto {
  id: string
  name?: string
  email?: string
  document?: string
  updatedAt?: Date
}

export interface OutputChangeFarmerDto {
  id: string
  name: string
  email: string
  document: string
  createdAt: Date
  updatedAt: Date
}
