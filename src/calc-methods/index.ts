import { getConfigByISOName } from '../countries';
import {
  CalculationMethodEntry,
  CalculationMethodKey,
  CalculationSettings,
} from '../adhan/types';
import { CalculationMethods } from '../adhan/calculation-methods';

export interface IMethodResponse {
  method: string;
  asrMethod: 'Standard' | 'Hanafi';
}
export interface IJuristicMethod {
  name: string;
  label: string;
}

export const getCalcMethodByName = (
  name: CalculationMethodKey
): CalculationMethodEntry | undefined => {
  return CalculationMethods[name];
};

export const getCalculationMethods = (): CalculationMethodEntry[] => {
  return Object.values(CalculationMethods);
};

/**
 *
 * Returns the calculation method and asr method for a given country's ISO name
 * @param country ISO Country Name
 */
export const getCalculationMethodByCountry = (
  country: string | undefined
): CalculationSettings | null => {
  if (!country) {
    return null;
  }
  const countryConf = getConfigByISOName(country);

  return {
    ...countryConf.calculationSettings,
    calculationMethod: countryConf.calculationSettings.calculationMethod,
    asrCalculation:
      countryConf.calculationSettings.asrCalculation || 'Standard',
  };
};

export const getJuristicMethods = (): IJuristicMethod[] => {
  return [
    { name: 'Standard', label: 'Shafii, Maliki, Jafari & Hanbali' },
    { name: 'Hanafi', label: 'Hanafi' },
  ];
};
