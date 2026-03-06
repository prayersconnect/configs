import { DateTime, Settings } from 'luxon';
import { getDSTStart, getDSTEnd, isWithinDSTRange } from './index';

/**
 * Tests for the Canada 2026 DST dates (updated in list.ts line 32):
 *   2026: ['2026-03-08', '2026-11-01']
 *
 * Canada (most provinces) follows the same schedule as the US:
 *   - Spring forward: second Sunday of March  → 2026-03-08
 *   - Fall back:      first Sunday of November → 2026-11-01
 *
 * The timezone used is America/Toronto, a canonical Canadian timezone.
 * DST is active between the start date (inclusive) and end date (inclusive).
 */
describe('Canada DST 2026 – list.ts validation', () => {
  const COUNTRY = 'Canada';
  const YEAR = 2026;
  const TIMEZONE = 'America/Toronto';

  // Pull the dates straight from the module under test
  const dstStart = getDSTStart(COUNTRY, YEAR) as string; // '2026-03-08'
  const dstEnd = getDSTEnd(COUNTRY, YEAR) as string; // '2026-11-01'

  beforeAll(() => {
    Settings.defaultLocale = 'en-US';
  });

  // ── 1. Sanity-check: the stored dates match the updated values ────────────
  it('has the correct DST start date for Canada 2026', () => {
    expect(dstStart).toBe('2026-03-08');
  });

  it('has the correct DST end date for Canada 2026', () => {
    expect(dstEnd).toBe('2026-11-01');
  });

  // ── 2. Helper: build a DateTime in America/Toronto for a given date ───────
  function torontoDate(isoDate: string): DateTime {
    return DateTime.fromISO(isoDate, { zone: TIMEZONE });
  }

  // ── 3. Spring-forward boundary (2026-03-08) ───────────────────────────────

  it('day before DST start (2026-03-07) is NOT within DST range', () => {
    const date = torontoDate('2026-03-07');
    expect(isWithinDSTRange(date, dstStart, dstEnd)).toBe(false);
  });

  it('DST start day (2026-03-08) IS within DST range', () => {
    const date = torontoDate('2026-03-08');
    expect(isWithinDSTRange(date, dstStart, dstEnd)).toBe(true);
  });

  it('day after DST start (2026-03-09) IS within DST range', () => {
    const date = torontoDate('2026-03-09');
    expect(isWithinDSTRange(date, dstStart, dstEnd)).toBe(true);
  });

  // ── 4. Mid-DST check ─────────────────────────────────────────────────────

  it('a date in the middle of summer (2026-07-01) IS within DST range', () => {
    const date = torontoDate('2026-07-01');
    expect(isWithinDSTRange(date, dstStart, dstEnd)).toBe(true);
  });

  // ── 5. Fall-back boundary (2026-11-01) ────────────────────────────────────

  it('day before DST end (2026-10-31) IS within DST range', () => {
    const date = torontoDate('2026-10-31');
    expect(isWithinDSTRange(date, dstStart, dstEnd)).toBe(true);
  });

  it('DST end day (2026-11-01) IS within DST range (inclusive end)', () => {
    const date = torontoDate('2026-11-01');
    expect(isWithinDSTRange(date, dstStart, dstEnd)).toBe(true);
  });

  it('day after DST end (2026-11-02) is NOT within DST range', () => {
    const date = torontoDate('2026-11-02');
    expect(isWithinDSTRange(date, dstStart, dstEnd)).toBe(false);
  });

  // ── 6. Timezone offset confirms DST is actually active via Luxon ──────────
  //
  // America/Toronto is UTC-5 in winter and UTC-4 in summer (DST).
  // We verify the raw UTC offset so that a wrong DST date in list.ts would
  // immediately cause this test to fail.

  it('the clock offset on 2026-03-07 (before spring-forward) is UTC-5 (no DST)', () => {
    const date = torontoDate('2026-03-07T12:00:00');
    // UTC offset in minutes: -300 = UTC-5
    expect(date.offset).toBe(-300);
  });

  it('the clock offset on 2026-03-08 (spring-forward day) is UTC-4 (DST active)', () => {
    // After 2 AM clocks move forward, so by noon DST is active
    const date = torontoDate('2026-03-08T12:00:00');
    // UTC offset in minutes: -240 = UTC-4
    expect(date.offset).toBe(-240);
  });

  it('the clock offset on 2026-11-01 (fall-back day) is UTC-5 (DST ended)', () => {
    // After 2 AM clocks fall back, so by noon standard time is active
    const date = torontoDate('2026-11-01T12:00:00');
    // UTC offset in minutes: -300 = UTC-5
    expect(date.offset).toBe(-300);
  });

  it('the clock offset on 2026-10-31 (day before fall-back) is UTC-4 (DST still active)', () => {
    const date = torontoDate('2026-10-31T12:00:00');
    // UTC offset in minutes: -240 = UTC-4
    expect(date.offset).toBe(-240);
  });
});
