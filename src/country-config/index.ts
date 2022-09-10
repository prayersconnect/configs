import allConfigs, { countryConfig, defaultConfig } from './configs';

export function getConfig(country: string): countryConfig {
  const countryConf = allConfigs[countrySlug(country)] as any;
  return Object.assign({}, defaultConfig, countryConf);
}

function countrySlug(country: string): string {
  return country.toLowerCase().replace(/\s+/, '_');
}
