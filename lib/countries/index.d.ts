import { ICountry } from './types';
import { countryConfig } from './prayers-configs';
export declare function getCountryByISOName(name: string): ICountry | null;
export declare function getConfigByISOName(name: string): countryConfig;
