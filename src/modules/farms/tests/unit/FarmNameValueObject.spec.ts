import { FarmNameValueObject } from '@modules/farms/domain/valueObject'
import { InvalidSimpleNameError } from '@modules/shared'
import { Chance } from 'chance'

const chance = new Chance()
const validNameString = chance.name()

describe('FarmNameValueObject Unit Tests', () => {
  const validateSpy = vi.spyOn(FarmNameValueObject.prototype as any, 'validate')

  it('should be invalid farm name value object', () => {
    expect(() => {
      new FarmNameValueObject('')
      expect(validateSpy).toBeCalledTimes(1)
    }).toThrow(new InvalidSimpleNameError())
  })

  it('should be test value with value', () => {
    const nameValueObject = new FarmNameValueObject(validNameString)
    expect(nameValueObject.value).toBe(validNameString)
  })
})
