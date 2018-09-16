import { isValidNumber } from '../../src/utils';

describe('utils', () => {

  describe('isValidNumber', () => {

    it('0 is valid', () => {
      expect(isValidNumber(0)).toBe(true)
    })

    it('1 is valid', () => {
      expect(isValidNumber(1)).toBe(true)
    })

    it('-1 is valid', () => {
      expect(isValidNumber(-1)).toBe(true)
    })

    it('NaN is invalid', () => {
      expect(isValidNumber(NaN)).toBe(false)
    })

    it('Infinity is invalid', () => {
      expect(isValidNumber(Infinity)).toBe(false)
    })

    it('-Infinity is invalid', () => {
      expect(isValidNumber(-Infinity)).toBe(false)
    })

    it('null is invalid', () => {
      expect(isValidNumber(null)).toBe(false)
    })

    it('undefined is invalid', () => {
      expect(isValidNumber(undefined)).toBe(false)
    })

  })
})
