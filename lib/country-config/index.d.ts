export declare function getConfig(country: string): any;
/**
 * Using this wrapper function in case we need any country name normalization!
 * @param lat
 * @param long
 */
export declare function getCountryByCoords(lat: number, long: number): import("country-locator").CountryInfo | undefined;
