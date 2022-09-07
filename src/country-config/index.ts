import allConfigs, {defaultConfig, countryConfig} from './configs';
import {findCountryByCoordinate} from "country-locator";

export function getConfig(country: string): countryConfig  {
  const countryConf = allConfigs[countrySlug(country)] as any;
  return Object.assign({}, defaultConfig, countryConf);
}

/**
 * Using this wrapper function in case we need any country name normalization!
 * @param lat
 * @param long
 */
export function getCountryByCoords(lat: number, long: number) {
  return findCountryByCoordinate(lat, long);
}

function countrySlug(country: string): string {
  return country.toLowerCase().replace(/\s+/, '_');
}
