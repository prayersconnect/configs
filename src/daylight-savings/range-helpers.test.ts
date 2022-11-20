import { getRangesForYear } from './range-helpers';
import cases from 'jest-in-case';

function getRangeTestObject(year: number, country: string, timezone: string) {
  return {
    name: `${country} ${year} (${timezone})`,
    year,
    country,
    timezone,
  };
}

describe('quick range helpers', () => {
  cases(
    'getRangesForYear',
    (opts: {
      name: string;
      year: number;
      country: string;
      timezone: string;
    }) => {
      expect(
        getRangesForYear(opts.year, opts.country, opts.timezone)
      ).toMatchSnapshot();
    },
    [
      getRangeTestObject(2022, 'Australia', 'Australia/Sydney'),
      getRangeTestObject(2022, 'Australia', 'Australia/Brisbane'),
      getRangeTestObject(2022, 'United States', 'America/New_York'),
      getRangeTestObject(2022, 'United Kingdom', 'Europe/London'),
      getRangeTestObject(2022, 'Canada', 'America/Toronto'),
      getRangeTestObject(2022, 'New Zealand', 'Pacific/Auckland'),

      getRangeTestObject(2023, 'Australia', 'Australia/Sydney'),
      getRangeTestObject(2023, 'United States', 'America/New_York'),
      getRangeTestObject(2023, 'United Kingdom', 'Europe/London'),
      getRangeTestObject(2023, 'Canada', 'America/Toronto'),
      getRangeTestObject(2023, 'New Zealand', 'Pacific/Auckland'),

      getRangeTestObject(2024, 'Australia', 'Australia/Sydney'),
      getRangeTestObject(2024, 'United States', 'America/New_York'),
      getRangeTestObject(2024, 'United Kingdom', 'Europe/London'),
      getRangeTestObject(2024, 'Canada', 'America/Toronto'),
      getRangeTestObject(2024, 'New Zealand', 'Pacific/Auckland'),
    ]
  );
});
