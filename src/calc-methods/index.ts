import methodsData, { CalculationMethod } from './methods';
import { getConfigByISOName } from '../countries';

export interface IMethodResponse {
  method: string | undefined;
  asrMethod: 'Standard' | 'Hanafi' | undefined;
}
export const getCalcMethodByName = (name: string): CalculationMethod | undefined => {
  return methodsData.find((method) => method.name === name);
};

export const getCalcMethods = (): CalculationMethod[] => {
  return methodsData;
};

export const getCalcMethodsByCountry = (country: string | undefined): IMethodResponse => {
  if (country) {
    const countryConf = getConfigByISOName(country);
    return {
      method: countryConf?.prayer_settings?.calculation_method,
      asrMethod: countryConf?.prayer_settings?.asr_method,
    };
  }

  return {
    method: undefined,
    asrMethod: undefined,
  };
};