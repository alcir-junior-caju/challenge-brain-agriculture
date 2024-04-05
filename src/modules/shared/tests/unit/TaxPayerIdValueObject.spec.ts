import { InvalidTaxPayerIdError, TaxPayerIdValueObject } from '@modules/shared/domain'

const validTaxPayerIds = [
  '44830197000161',
  '73300397000100',
  '93347828000100'
]
const invalidTaxPayerIds = [
  '8774824880123',
  null,
  undefined,
  '11111111111111'
]

describe('TaxPayerIdValueObject Unit Tests', () => {
  const validateSpy = vi.spyOn(TaxPayerIdValueObject.prototype as any, 'validate')

  it.each(validTaxPayerIds)('should be test valid Tax Payer ID value object: %s', (taxId: string) => {
    expect(new TaxPayerIdValueObject(taxId)).toBeDefined()
  })

  it.each(invalidTaxPayerIds)('should be test invalid Tax Payer ID value object: %s', (taxId: any) => {
    expect(() => {
      new TaxPayerIdValueObject(taxId)
      expect(validateSpy).toBeCalledTimes(1)
    }).toThrow(new InvalidTaxPayerIdError())
  })
})
