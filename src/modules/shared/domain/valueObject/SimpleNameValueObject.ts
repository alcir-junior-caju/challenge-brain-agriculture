import { type ValueObjectInterface } from './ValueObjectInterface'

export class SimpleNameValueObject implements ValueObjectInterface {
  private readonly _value: string

  constructor (name: string) {
    this._value = name
    this.validate(name)
  }

  get value (): string {
    return this._value
  }

  private validate (name: string): void {
    const isValid = !!name.match(/[a-zA-Z]+/)
    if (!isValid) throw new InvalidSimpleNameError()
  }
}

export class InvalidSimpleNameError extends Error {
  constructor () {
    super('simple_name_must_be_a_valid_name')
    this.name = 'invalid_simple_name_error'
  }
}
