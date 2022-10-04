import { getConfigByISOName, getCountryByISOName } from './index';

describe('country helpers', () => {
  describe('getCountryByISOName', () => {
    it('returns null if country not found', () => {
      expect(getCountryByISOName('not-found')).toBeNull();
    });

    it('returns country info if found', () => {
      expect(getCountryByISOName('United States')).toMatchSnapshot();
    });
  });

  describe('getConfigByISOName', () => {
    it('returns default config if country not found', () => {
      expect(getConfigByISOName('not-found')).toMatchSnapshot();
    });

    it('returns country config for USA', () => {
      expect(getConfigByISOName('United States')).toMatchSnapshot();
    });
    it('returns country config for UK', () => {
      expect(getConfigByISOName('United Kingdom')).toMatchSnapshot();
    });
    it('returns country config for Turkey alias', () => {
      expect(getConfigByISOName('Turkey')).toEqual(
        getConfigByISOName('Turkiye')
      );
    });
    it('returns country config for Egypt', () => {
      expect(getConfigByISOName('Egypt')).toMatchSnapshot();
    });
  });
});
