import { getConfigByISOName, getCountryByISOName } from './index';
import prayersConfigs from './prayers-configs';
import cases from 'jest-in-case';

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

    it('returns country config for Turkey alias', () => {
      expect(getConfigByISOName('Turkey')).toEqual(
        getConfigByISOName('Turkiye')
      );
    });
    cases(
      `country configs`,
      (opts: { name: string; country: string }) => {
        expect(getConfigByISOName(opts.country)).toMatchSnapshot();
      },
      Object.keys(prayersConfigs).map((country) => {
        return {
          name: country,
          country,
        };
      })
    );
  });
});
