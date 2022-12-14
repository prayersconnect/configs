import methodsData, { CalculationMethod } from './methods';
import { getConfigByISOName } from '../countries';

export interface IMethodResponse {
  method: string;
  asrMethod: 'Standard' | 'Hanafi';
}
export interface IJuristicMethod {
  name: string;
  label: string;
}

export const getCalcMethodByName = (
  name: string
): CalculationMethod | undefined => {
  return methodsData.find((method) => method.name === name);
};

export const getCalcMethods = (): CalculationMethod[] => {
  return methodsData;
};

/**
 * Returns the calculation method and asr method for a given country's ISO name
 * @param country ISO Country Name
 */
export const getCalcMethodsByCountry = (
  country: string | undefined
): IMethodResponse | null => {
  if (!country) {
    return null;
  }
  const countryConf = getConfigByISOName(country);

  return {
    method: countryConf.prayerSettings.calculation_method as string,
    asrMethod: countryConf.prayerSettings.asr_method || 'Standard',
  };
};

export const getJuristicMethods = (): IJuristicMethod[] => {
  return [
    { name: 'Standard', label: 'Shafii, Maliki, Jafari & Hanbali' },
    { name: 'Hanafi', label: 'Hanafi' },
  ];
};
