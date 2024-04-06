import { type ValueObjectInterface } from '@modules/shared'

type TilthValueObjectProps = 'soya' | 'maize' | 'cotton' | 'coffee' | 'sugarcane'

export class FarmTilthValueObject implements ValueObjectInterface {
  private readonly _value: TilthValueObjectProps

  constructor (name: TilthValueObjectProps) {
    this._value = name
    this.validate(name)
  }

  get value (): TilthValueObjectProps {
    return this._value
  }

  private validate (name: string): void {
    const isValid = ['soya', 'maize', 'cotton', 'coffee', 'sugarcane'].includes(name)
    if (!isValid) throw new InvalidTilthError()
  }
}

export class InvalidTilthError extends Error {
  constructor () {
    super('tilth_must_be_a_valid_tilth')
    this.name = 'invalid_tilth_error'
  }
}
