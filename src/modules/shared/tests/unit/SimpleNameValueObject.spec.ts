import { InvalidSimpleNameError, SimpleNameValueObject } from '@modules/shared/domain'
import { Chance } from 'chance'

const chance = new Chance()
const validNameString = chance.name()

describe('SimpleNameValueObject Unit Tests', () => {
  const validateSpy = vi.spyOn(SimpleNameValueObject.prototype as any, 'validate')

  it('should be invalid simple name value object', () => {
    expect(() => {
      new SimpleNameValueObject('')
      expect(validateSpy).toBeCalledTimes(1)
    }).toThrow(new InvalidSimpleNameError())
  })

  it('should be test value with value', () => {
    const nameValueObject = new SimpleNameValueObject(validNameString)
    expect(nameValueObject.value).toBe(validNameString)
  })
})
