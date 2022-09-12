import { CalculationMethod } from './methods';
export interface IMethodResponse {
    method: string | undefined;
    asrMethod: 'Standard' | 'Hanafi' | undefined;
}
export declare const getCalcMethodByName: (name: string) => CalculationMethod | undefined;
export declare const getCalcMethods: () => CalculationMethod[];
export declare const getCalcMethodsByCountry: (country: string | undefined) => IMethodResponse;
