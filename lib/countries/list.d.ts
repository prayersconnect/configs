import { ICountry } from './types';
interface ICountries {
    [key: string]: ICountry;
}
/**
 * @source https://github.com/sshaw/normalize_country/blob/master/lib/normalize_country/countries/en.yml
 */
declare const countries: ICountries;
export default countries;
