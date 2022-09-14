import { ICountry } from './types';
import { ICountryConfig } from './types';
export declare function getCountryByISOName(name: string): ICountry | null;
export declare function getConfigByISOName(name: string): ICountryConfig;
