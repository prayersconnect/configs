import methodsData, { CalculationMethod } from './methods';
import { getConfigByISOName } from '../countries';

export const getCalcMethodByName = (name: string): CalculationMethod | undefined => {
  return methodsData.find((method) => method.name === name);
};

export const getCalcMethods = (): CalculationMethod[] => {
  return methodsData;
};

export const getCalcMethodByCountry = (country: string | undefined): string | undefined => {
  if (!country) {
    return undefined;
  }
  const countryConf = getConfigByISOName(country);

  return countryConf?.prayer_settings?.calculation_method;
};