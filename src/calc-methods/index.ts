import methodsData, { CalculationMethod } from './methods';
import { getConfigByISOName } from '../countries';

export interface IMethodResponse {
  method: string | null;
  asrMethod: 'Standard' | 'Hanafi' ;
}
export const getCalcMethodByName = (name: string): CalculationMethod | undefined => {
  return methodsData.find((method) => method.name === name);
};

export const getCalcMethods = (): CalculationMethod[] => {
  return methodsData;
};

/**
 * Returns the calculation method and asr method for a given country's ISO name
 * @param country ISO Country Name
 */
export const getCalcMethodsByCountry = (country: string | undefined): IMethodResponse => {
  if (country) {
    const countryConf = getConfigByISOName(country);
    return {
      method: countryConf?.prayer_settings?.calculation_method || null,
      asrMethod: countryConf?.prayer_settings?.asr_method || 'Standard',
    };
  }

  return {
    method: null,
    asrMethod: 'Standard',
  };
};