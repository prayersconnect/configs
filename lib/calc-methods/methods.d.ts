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
declare const _default: ({
    name: string;
    label: string;
    values: {
        fajr: number;
        isha: number;
        maghrib?: undefined;
        midnight?: undefined;
    };
} | {
    name: string;
    label: string;
    values: {
        fajr: number;
        isha: string;
        maghrib?: undefined;
        midnight?: undefined;
    };
} | {
    name: string;
    label: string;
    values: {
        fajr: number;
        isha: number;
        maghrib: number;
        midnight: string;
    };
})[];
export default _default;
