import { getRangesForYear } from './range-helpers';
import { getDSTEnd } from './index';

/**
 * Regression tests for the 2026 Non-DST start dates.
 *
 * list.ts stores the DST end one day early (the last full DST day), so
 * `getRangesForYear` reports the Non-DST period starting on the fall-back
 * date itself. The requirement is:
 *   - United Kingdom: Non-DST starts 2026-10-25
 *   - United States:  Non-DST starts 2026-11-01
 *   - Canada:         Non-DST starts 2026-11-01
 */
describe('Non-DST start dates 2026', () => {
  const YEAR = 2026;

  const cases: Array<{
    country: string;
    timezone: string;
    /** The stored DST end = last full DST day. */
    storedDstEnd: string;
    /** The computed Non-DST start = fall-back day. */
    nonDstStart: string;
    /** The quick-range-selector label shown in the UI. */
    label: string;
  }> = [
    {
      country: 'United Kingdom',
      timezone: 'Europe/London',
      storedDstEnd: '2026-10-24',
      nonDstStart: '2026-10-25',
      label: 'Non-DST Period Oct, 2026 - Mar, 2027',
    },
    {
      country: 'United States',
      timezone: 'America/New_York',
      storedDstEnd: '2026-10-31',
      nonDstStart: '2026-11-01',
      label: 'Non-DST Period Nov, 2026 - Mar, 2027',
    },
    {
      country: 'Canada',
      timezone: 'America/Toronto',
      storedDstEnd: '2026-10-31',
      nonDstStart: '2026-11-01',
      label: 'Non-DST Period Nov, 2026 - Mar, 2027',
    },
  ];

  it.each(cases)(
    '$country stores the last full DST day',
    ({ country, storedDstEnd }) => {
      expect(getDSTEnd(country, YEAR)).toBe(storedDstEnd);
    }
  );

  it.each(cases)(
    '$country reports the Non-DST period starting on the fall-back day',
    ({ country, timezone, nonDstStart, label }) => {
      const ranges = getRangesForYear(YEAR, country, timezone);

      const nonDstRange = ranges.find(
        (range) =>
          range[0].startsWith('Non-DST Period') &&
          range[1].startsWith(`${YEAR}-`)
      );

      expect(nonDstRange).toBeDefined();
      expect(nonDstRange?.[0]).toBe(label);
      expect(nonDstRange?.[1]).toBe(nonDstStart);
    }
  );
});
