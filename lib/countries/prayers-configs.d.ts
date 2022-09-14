import { ICountryConfigValues, IPrayerSettings } from './types';
interface allConfigs {
    [key: string]: string | ICountryConfigValues;
}
export declare const defaultConfig: {
    code: string;
    prayer_settings: IPrayerSettings;
    mosque: {
        denomination: string;
        language_services: string;
    };
};
declare const prayersConfigs: allConfigs;
export default prayersConfigs;
