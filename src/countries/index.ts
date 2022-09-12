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

export function getConfigByISOName(name: string): countryConfig {
  const countryConf = allConfigs[countrySlug(name)] || {};
  return {
    code: countryConf?.code || null,
    prayer_settings: {
      ...defaultConfig.prayer_settings,
      ...countryConf?.prayer_settings
    },
    mosque: {
      ...defaultConfig.mosque,
      ...countryConf.mosque
    }
  }
}

function countrySlug(country: string): string {
  return country.toLowerCase().replace(/\s+/, '_');
}
