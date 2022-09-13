import { CalculationMethod } from './methods';
export interface IMethodResponse {
    method: string;
    asrMethod: 'Standard' | 'Hanafi';
}
export interface IJuristicMethod {
    name: string;
    label: string;
}
export declare const getCalcMethodByName: (name: string) => CalculationMethod | undefined;
export declare const getCalcMethods: () => CalculationMethod[];
/**
 * Returns the calculation method and asr method for a given country's ISO name
 * @param country ISO Country Name
 */
export declare const getCalcMethodsByCountry: (country: string | undefined) => IMethodResponse | null;
export declare const getJuristicMethods: () => IJuristicMethod[];
