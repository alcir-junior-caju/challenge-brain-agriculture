import { type ValueObjectInterface } from '@modules/shared'

export class FarmAreaValueObject implements ValueObjectInterface {
  private readonly _value: number

  constructor (name: number) {
    this._value = Number(name)
    this.validate(name)
  }

  get value (): number {
    return Number(this._value)
  }

  private validate (name: number): void {
    const isValid = !isNaN(name) && name > 0
    if (!isValid) throw new InvalidAreaError()
  }
}

export class InvalidAreaError extends Error {
  constructor () {
    super('area_must_be_a_valid_area')
    this.name = 'invalid_area_error'
  }
}
