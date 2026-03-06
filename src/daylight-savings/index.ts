import { DateTime } from 'luxon';
import list from './list';

function getRange(country: string, year: number) {
  // Check if the country exists in the list
  const countryList = list[country];
  if (!countryList) {
    return null;
  }

  // Check if the year exists for the country
  const yearList = countryList[year];
  if (!yearList) {
    return null;
  }

  return yearList;
}

export function getDSTStart(country: string, year: number) {
  const range = getRange(country, year);
  if (!range) {
    return null;
  }

  return range[0];
}

export function getDSTEnd(country: string, year: number) {
  const range = getRange(country, year);
  if (!range) {
    return null;
  }

  return range[1];
}

export function isWithinDSTRange(
  date: DateTime,
  start: string,
  end: string
): boolean {
  // Compare date strings to avoid timezone-mismatch issues.
  // start/end are plain date strings (e.g. '2026-11-01') and the stored
  // data intentionally ignores time (see list.ts comment), so a
  // lexicographic date-string comparison is both correct and timezone-safe.
  const dateStr = date.toFormat('yyyy-MM-dd');
  return dateStr >= start && dateStr <= end;
}
