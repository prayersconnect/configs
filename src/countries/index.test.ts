import cases from 'jest-in-case';
import {
  getConfigByISOName,
  getCountryAlpha2CodesByFeature,
  getCountryByISOName,
  getCountryByName,
  hasFeature,
} from './';
import prayersConfigs from './prayers-configs';

describe('country helpers', () => {
  describe('getCountryByISOName', () => {
    it('returns null if country not found', () => {
      expect(getCountryByISOName('not-found')).toBeNull();
    });

    it('returns country info if found', () => {
      expect(getCountryByISOName('United States')).toMatchSnapshot();
      expect(getCountryByISOName('Saudi Arabia')).toMatchSnapshot();
    });
  });

  describe('getCountryByName', () => {
    it('returns null if country not found', () => {
      expect(getCountryByName('not-found')).toBeNull();
    });

    it('returns country info by shortname', () => {
      expect(getCountryByName('Russia')).toMatchSnapshot();
      expect(getCountryByName('Palestine')).toMatchSnapshot();
    });

    it('returns country info by ioc', () => {
      expect(getCountryByName('USA')).toMatchSnapshot();
      expect(getCountryByName('GBR')).toMatchSnapshot();
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

  describe('hasFeature', () => {
    it('returns true if country has feature', () => {
      expect(hasFeature('United States', 'mosques')).toBe(true);
    });

    it('returns false if country does not have feature', () => {
      expect(hasFeature('Australia', 'education')).toBe(false);
    });

    it('returns false if country does not exist', () => {
      expect(hasFeature('Wonderland', 'iqamahTimes')).toBe(false);
    });
  });

  describe('getCountryAlpha2CodesByFeature', () => {
    it('returns correct countries for mosque feature', () => {
      expect(getCountryAlpha2CodesByFeature('mosques')).toMatchSnapshot();
    });
    it('returns correct countries for iqamah feature', () => {
      expect(getCountryAlpha2CodesByFeature('iqamahTimes')).toMatchSnapshot();
    });
    it('returns correct countries for events feature', () => {
      expect(getCountryAlpha2CodesByFeature('events')).toMatchSnapshot();
    });
    it('returns correct countries for education feature', () => {
      expect(getCountryAlpha2CodesByFeature('education')).toMatchSnapshot();
    });
  });
});
