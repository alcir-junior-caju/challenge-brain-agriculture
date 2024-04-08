export interface InputGetFarmsDto {
  type: 'count' | 'totalArea' | 'states' | 'cultures' | 'soil'
}

export type OutputGetFarmsDto = Record<string, any>
