import { FarmAreaValueObject, InvalidAreaError } from '@modules/farms/domain/valueObject'
import { Chance } from 'chance'

const chance = new Chance()
const validAreaString = chance.integer({ min: 1, max: 1000 })

describe('FarmAreaValueObject Unit Tests', () => {
  const validateSpy = vi.spyOn(FarmAreaValueObject.prototype as any, 'validate')

  it('should be invalid farm area value object', () => {
    expect(() => {
      new FarmAreaValueObject(0)
      expect(validateSpy).toBeCalledTimes(1)
    }).toThrow(new InvalidAreaError())
  })

  it('should be test value with value', () => {
    const nameValueObject = new FarmAreaValueObject(validAreaString)
    expect(nameValueObject.value).toBe(validAreaString)
  })
})
