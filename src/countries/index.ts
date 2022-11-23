import { ICountry, ICountryFeatures } from './types';
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
    alpha2Code: countryConf?.alpha2Code,
    prayerSettings: {
      ...defaultConfig.prayerSettings,
      ...countryConf?.prayerSettings,
    },
    mosque: {
      ...defaultConfig.mosque,
      ...countryConf.mosque,
    },
    features: {
      ...defaultConfig.features,
      ...countryConf.features,
    },
    intl: {
      ...defaultConfig.intl,
      ...countryConf.intl,
    },
  };
}

export function hasFeature(
  country: string,
  feature: keyof ICountryFeatures
): boolean {
  const config = getConfigByISOName(country);
  if (config) {
    return config.features[feature];
  } else {
    return defaultConfig.features[feature];
  }
}
//
// export function getCountriesByFeature(feature: keyof ICountryFeatures): string[] {
//
//   return Object.keys(countries).filter((countrySlug) => {
//     const country =
//     return hasFeature(country, feature);
//   });
// }

function countrySlug(country: string): string {
  return country;
}
