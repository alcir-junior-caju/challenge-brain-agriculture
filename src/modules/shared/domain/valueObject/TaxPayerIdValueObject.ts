import { type ValueObjectInterface } from './ValueObjectInterface'

export class TaxPayerIdValueObject implements ValueObjectInterface {
  private readonly _value: string

  constructor (value: string) {
    this._value = value
    this.validate(value)
  }

  private validate (rawTaxPayerId: string): void {
    if (!rawTaxPayerId) throw new InvalidTaxPayerIdError()
    const taxPayerId = this.removeNonDigits(rawTaxPayerId)
    if (this.isInvalidLength(taxPayerId)) throw new InvalidTaxPayerIdError()
    if (this.hasAllDigitsEqual(taxPayerId)) throw new InvalidTaxPayerIdError()
    const digit1 = this.calculateDigit(taxPayerId, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
    const digit2 = this.calculateDigit(taxPayerId, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
    if (this.extractDigits(taxPayerId) === `${digit1}${digit2}`) return
    throw new InvalidTaxPayerIdError()
  }

  private removeNonDigits (taxPayerId: string): string {
    return taxPayerId.replace(/\D/g, '')
  }

  private isInvalidLength (taxPayerId: string): boolean {
    const TAX_PAYER_LENGTH = 14
    return taxPayerId.length !== TAX_PAYER_LENGTH
  }

  private hasAllDigitsEqual (taxPayerId: string): boolean {
    const [firstTaxPayerIdDigit] = Array.from(taxPayerId)
    return Array.from(taxPayerId).every(digit => digit === firstTaxPayerIdDigit)
  }

  private calculateDigit (taxPayerId: string, weights: number[]): number {
    let total = 0
    for (let i = 0; i < weights.length; i++) {
      total += parseInt(taxPayerId[i]) * weights[i]
    }
    const rest = total % 11
    return (rest < 2) ? 0 : 11 - rest
  }

  private extractDigits (taxPayerId: string): string {
    return taxPayerId.slice(12)
  }

  get value (): string {
    return this._value
  }
}

export class InvalidTaxPayerIdError extends Error {
  constructor () {
    super('cnpj_must_be_a_valid_cnpj')
    this.name = 'invalid_cnpj_error'
  }
}
