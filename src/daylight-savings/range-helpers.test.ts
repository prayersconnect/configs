import { getRangesForYear } from './range-helpers';

describe('quick range helpers', () => {
  describe('getRangesForYear', () => {
    it('returns correct ranges for Australia', () => {
      expect(
        getRangesForYear(2022, 'Australia', 'Australia/Sydney')
      ).toMatchSnapshot();
    });
    fit('returns correct ranges for USA', () => {
      expect(
        getRangesForYear(2022, 'United States', 'America/New_York')
      ).toMatchSnapshot();
    });
  });
});
