import { CalculationMethod } from './methods';
export declare const getCalcMethodByName: (name: string) => CalculationMethod | undefined;
export declare const getCalcMethods: () => CalculationMethod[];
export declare const getCalcMethodByCountry: (country: string | undefined) => string | undefined;
