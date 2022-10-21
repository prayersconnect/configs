import { getDSTEnd, getDSTStart } from './index';
import dstTransitionDates from './list';
import cases from 'jest-in-case';

const countries = Object.keys(dstTransitionDates);

function getRangeTestObject(year: number) {
  return (country: string) => {
    return {
      name: `${country} ${year}`,
      year,
      country,
    };
  };
}

describe('daylight savings', () => {
  describe('getDSTStart', () => {
    it('returns null for invalid country', () => {
      expect(getDSTStart('invalid', 2018)).toBeNull();
    });

    it('returns null for invalid year', () => {
      expect(getDSTStart('US', 2019)).toBeNull();
    });

    cases(
      'returns correct start date',
      (opts: { name: string; year: number; country: string }) => {
        expect(getDSTStart(opts.country, opts.year)).toMatchSnapshot();
      },
      countries
        .map(getRangeTestObject(2021))
        .concat(countries.map(getRangeTestObject(2022)))
        .concat(countries.map(getRangeTestObject(2023)))
        .concat(countries.map(getRangeTestObject(2024)))
    );

    cases(
      'returns correct end date',
      (opts: { name: string; year: number; country: string }) => {
        expect(getDSTEnd(opts.country, opts.year)).toMatchSnapshot();
      },
      countries
        .map(getRangeTestObject(2021))
        .concat(countries.map(getRangeTestObject(2022)))
        .concat(countries.map(getRangeTestObject(2023)))
        .concat(countries.map(getRangeTestObject(2024)))
    );
  });
});
