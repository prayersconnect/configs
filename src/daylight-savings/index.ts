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
  const startDate = DateTime.fromISO(start);
  const endDate = DateTime.fromISO(end);
  return date >= startDate && date <= endDate;
}
