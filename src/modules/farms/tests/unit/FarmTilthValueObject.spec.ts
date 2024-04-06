import { FarmTilthValueObject, InvalidTilthError } from '@modules/farms/domain/valueObject'

const validTilths = [
  'soya',
  'maize',
  'cotton',
  'coffee',
  'sugarcane'
]

describe('FarmTilthObject Unit Tests', () => {
  const validateSpy = vi.spyOn(FarmTilthValueObject.prototype as any, 'validate')

  it('should be invalid farm tilth value object', () => {
    expect(() => {
      new FarmTilthValueObject('' as any)
      expect(validateSpy).toBeCalledTimes(1)
    }).toThrow(new InvalidTilthError())
  })

  it.each(validTilths)('should be test value with value: %s', (tilth) => {
    const nameValueObject = new FarmTilthValueObject(tilth as any)
    expect(nameValueObject.value).toBe(tilth)
  })
})
