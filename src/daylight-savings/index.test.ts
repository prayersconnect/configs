import { getDSTEnd, getDSTStart } from './index';

describe('daylight savings', () => {
  describe('getDSTStart', () => {
    it('returns null for invalid country', () => {
      expect(getDSTStart('invalid', 2018)).toBeNull();
    });

    it('returns null for invalid year', () => {
      expect(getDSTStart('US', 2019)).toBeNull();
    });

    it('returns start date for valid country and year', () => {
      expect(getDSTStart('United States', 2022)).toEqual('2022-03-13');
      expect(getDSTStart('Canada', 2022)).toEqual('2022-03-13');
      expect(getDSTStart('United Kingdom', 2022)).toEqual('2022-03-27');
      expect(getDSTStart('Australia', 2022)).toEqual('2022-10-02');
    });

    it('returns end date for valid country and year', () => {
      expect(getDSTEnd('United States', 2022)).toEqual('2022-11-05');
      expect(getDSTEnd('Canada', 2022)).toEqual('2022-11-05');
      expect(getDSTEnd('United Kingdom', 2022)).toEqual('2022-10-29');
      expect(getDSTEnd('Australia', 2022)).toEqual('2023-04-01');
    });
  });
});
