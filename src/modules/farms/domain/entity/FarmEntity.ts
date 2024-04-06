import { type AggregateRootInterface, BaseEntity, type IdValueObject } from '@modules/shared'

import { type FarmAreaValueObject, type FarmNameValueObject, type FarmTilthValueObject } from '../valueObject'

interface Input {
  id?: IdValueObject
  name: FarmNameValueObject
  city: FarmNameValueObject
  state: FarmNameValueObject
  totalArea: FarmAreaValueObject
  arableArea: FarmAreaValueObject
  vegetationArea: FarmAreaValueObject
  cultures?: FarmTilthValueObject[]
  createdAt?: Date
  updatedAt?: Date
}

export class FarmEntity extends BaseEntity implements AggregateRootInterface {
  private readonly _name: FarmNameValueObject
  private readonly _city: FarmNameValueObject
  private readonly _state: FarmNameValueObject
  private readonly _totalArea: FarmAreaValueObject
  private readonly _arableArea: FarmAreaValueObject
  private readonly _vegetationArea: FarmAreaValueObject
  private readonly _cultures: FarmTilthValueObject[]

  constructor ({ id, name, city, state, totalArea, arableArea, vegetationArea, cultures, createdAt, updatedAt }: Input) {
    super(id, createdAt, updatedAt)
    this._name = name
    this._city = city
    this._state = state
    this._totalArea = totalArea
    this._arableArea = arableArea
    this._vegetationArea = vegetationArea
    this._cultures = cultures ?? []
    this.validate()
  }

  get name (): FarmNameValueObject {
    return this._name
  }

  get city (): FarmNameValueObject {
    return this._city
  }

  get state (): FarmNameValueObject {
    return this._state
  }

  get totalArea (): FarmAreaValueObject {
    return this._totalArea
  }

  get arableArea (): FarmAreaValueObject {
    return this._arableArea
  }

  get vegetationArea (): FarmAreaValueObject {
    return this._vegetationArea
  }

  get cultures (): FarmTilthValueObject[] {
    return this._cultures
  }

  private validate (): void {
    if (this._totalArea.value < this._arableArea.value + this._vegetationArea.value) {
      throw new InvalidCheckAreaError()
    }
  }
}

export class InvalidCheckAreaError extends Error {
  constructor () {
    super('sum_of_arable_and_vegetation_area_cannot_be_greater_than_total_area')
    this.name = 'invalid_check_area_error'
  }
}
