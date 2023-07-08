import {
  ICountry,
  ICountryConfig,
  ICountryFeatures,
  ICountryOutput,
} from './types';
import countries from './list';
import prayersConfigs, { defaultConfig } from './prayers-configs';
import { nonAsciiCountries } from './non-ascii-aliases';

export function getCountryByISOName(name: string): ICountryOutput | null {
  const key = Object.keys(countries).find((key) => {
    return countries[key].iso_name === name;
  });

  if (!key) {
    return null;
  }

  const config = countries[key];

  return formatCountyInfo(config);
}

function getCountryByShortName(name: string): ICountryOutput | null {
  const key = Object.keys(countries).find((key) => {
    return countries[key].short === name;
  });

  if (!key) {
    return null;
  }

  const config = countries[key];

  return formatCountyInfo(config);
}

function getCountryByPCName(name: string): ICountryOutput | null {
  const key = Object.keys(countries).find((key) => {
    return countries[key].pc_name === name;
  });

  if (!key) {
    return null;
  }

  const config = countries[key];

  return formatCountyInfo(config);
}

const hasNonAscii = (str: string): boolean => {
  return /[^\x00-\x7F]/.test(str);
};

function getISONameFromNonAscii(name: string) {
  const match = nonAsciiCountries.find((country) => {
    if (country[0] === name) {
      return country;
    }
  });

  return match?.[1];
}

export function getCountryByName(name: string): ICountryOutput | null {
  if (hasNonAscii(name)) {
    name = getISONameFromNonAscii(name) || name;
  }

  return (
    getCountryByISOName(name) ||
    getCountryByShortName(name) ||
    getCountryByPCName(name)
  );
}

function formatCountyInfo(countryInfo: ICountry): ICountryOutput {
  return {
    iso_name: countryInfo.iso_name,
    emoji: countryInfo.emoji,
    gmap_name: countryInfo.gmap_name || countryInfo.iso_name,
    pc_name: countryInfo.pc_name || countryInfo.iso_name,
  };
}

export function getConfigByISOName(name: string): ICountryConfig {
  let countryConf;
  const countryConfOrAlias = prayersConfigs[name] || {};

  if (typeof countryConfOrAlias === 'string') {
    countryConf = prayersConfigs[countryConfOrAlias] as ICountryConfig;
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

export function getCountryAlpha2CodesByFeature(
  feature: keyof ICountryFeatures
): string[] {
  const alpha2Countries: string[] = [];
  Object.keys(prayersConfigs).map((country) => {
    if (hasFeature(country, feature)) {
      const config = getConfigByISOName(country);
      alpha2Countries.push(config.alpha2Code);
    }
  });

  return alpha2Countries;
}
