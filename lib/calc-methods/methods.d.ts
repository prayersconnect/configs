/**
 * the collection copied this from api project and just converted from yaml to json using https://jsonformatter.org/yaml-to-json
 */
export interface CalculationMethod {
    name: string;
    label: string;
    values: {
        fajr?: number;
        isha?: number;
        maghrib?: number;
        midnight?: string;
    };
}
declare const _default: CalculationMethod[];
export default _default;
