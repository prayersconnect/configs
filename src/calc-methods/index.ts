import methodsData, { CalculationMethod } from './methods';
import { getConfig } from '../country-config';

export const getCalcMethodByName = (name: string) => {
  return methodsData.find((method) => method.name === name);
};

export const getCalcMethods = () : CalculationMethod[] => {
  return methodsData;
};

export const getCalcMethodByCountry = (country: string | undefined): string | undefined => {
  if (!country) {
    return undefined;
  }
  const countryConf = getConfig(country);

  return countryConf?.prayer_settings?.calculation_method;
};