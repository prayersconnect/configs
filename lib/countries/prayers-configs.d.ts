interface prayerSettings {
    calculation_method?: string;
    asr_method?: 'Hanafi' | 'Standard';
}
interface mosqueSettings {
    denomination: string;
    language_services: string;
}
export interface countryConfig {
    code: number | null;
    prayer_settings: prayerSettings;
    mosque?: mosqueSettings;
}
interface allConfigs {
    [key: string]: countryConfig;
}
export declare const defaultConfig: {
    code: string;
    prayer_settings: prayerSettings;
    mosque: {
        denomination: string;
        language_services: string;
    };
};
declare const prayersConfigs: allConfigs;
export default prayersConfigs;
