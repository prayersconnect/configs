import { ICountry } from './types';
interface ICountries {
    [key: string]: ICountry;
}
declare const countries: ICountries;
export default countries;
