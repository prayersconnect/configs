export declare const defaultConfig: {
    code: string;
    prayer_settings: {
        asr_method: string;
        calculation_method: string;
    };
    mosque: {
        denomination: string;
        language_services: string;
    };
};
interface prayerSettings {
    calculation_method?: string;
    asr_method?: string;
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
declare const configs: allConfigs;
export default configs;
