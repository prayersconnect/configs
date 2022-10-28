import list from './list';

function getRange(country: string, year: number) {
  const countryList = list[country];
  let yearList;

  if (!countryList) {
    return null;
  }

  yearList = countryList[year];

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
