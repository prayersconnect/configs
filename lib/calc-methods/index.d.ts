export declare const getCalcMethodByName: (name: string) => {
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
} | undefined;
export declare const getCalcMethods: () => {
    name: string;
    label: string;
}[];
