import { ICountry } from './types';
import countries from './list';
import allConfigs, { defaultConfig } from './prayers-configs';
import { ICountryConfig } from './types';

export function getCountryByISOName(name: string): ICountry | null {
  const key = Object.keys(countries).find((key) => {
    return countries[key].iso_name === name;
  });

  if (!key) {
    return null;
  }

  return countries[key];
}

export function getConfigByISOName(name: string): ICountryConfig {
  let countryConf;
  const countryConfOrAlias = allConfigs[countrySlug(name)] || {};

  if (typeof countryConfOrAlias === 'string') {
    countryConf = allConfigs[countrySlug(countryConfOrAlias)] as ICountryConfig;
  } else {
    countryConf = countryConfOrAlias as ICountryConfig;
  }

  return {
    code: countryConf?.code || null,
    prayer_settings: {
      ...defaultConfig.prayer_settings,
      ...countryConf?.prayer_settings,
    },
    mosque: {
      ...defaultConfig.mosque,
      ...countryConf.mosque,
    },
    features: {
      ...defaultConfig.features,
      ...countryConf.features,
    },
  };
}

function countrySlug(country: string): string {
  return country.toLowerCase().replace(/\s+/, '_');
}
