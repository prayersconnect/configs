import methodsData from './methods';
import {getConfig} from "../country-config";

export const getCalcMethodByName = (name: string) => {
  return methodsData.find((method) => method.name === name);
}

export const getCalcMethods = () => {
  return methodsData.map(({name, label}) => {
    return {name, label}
  });
}

export const getCalcMethodByCountry = (country: string | undefined): string | undefined => {
  if (!country) {
    return undefined;
  }
  const countryConf = getConfig(country);

  return countryConf?.prayer_settings?.calculation_method;
}