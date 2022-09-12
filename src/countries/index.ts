import { ICountry } from './types';
import countries from './list';
import allConfigs, { countryConfig, defaultConfig } from './prayers-configs';

export function getCountryByISOName(name: string): ICountry | null {
  const key = Object.keys(countries).find((key) => {
    return countries[key].iso_name === name;
  });

  if (!key) {
    return null;
  }

  return countries[key];
}

export function getConfigByISOName(country: string): countryConfig {
  const countryConf = allConfigs[countrySlug(country)] as any;
  return Object.assign({}, defaultConfig, countryConf);
}

function countrySlug(country: string): string {
  return country.toLowerCase().replace(/\s+/, '_');
}
