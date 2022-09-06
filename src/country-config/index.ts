import {merge} from 'lodash-es';
import allConfigs, {defaultConfig} from './configs';

export function getConfig(country: string): any {
  const countryConf = allConfigs[countrySlug(country)] as any;
  return merge({}, defaultConfig, countryConf);
}

function countrySlug(country: string): string {
  return country.toLowerCase().replace(/\s+/, '_');
}