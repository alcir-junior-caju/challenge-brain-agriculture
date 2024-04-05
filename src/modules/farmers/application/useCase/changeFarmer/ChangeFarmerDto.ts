export interface InputChangeFarmerDto {
  id: string
  name?: string
  email?: string
  taxId?: string
  updatedAt?: Date
}

export interface OutputChangeFarmerDto {
  id: string
  name: string
  email: string
  taxId: string
  createdAt: Date
  updatedAt: Date
}
