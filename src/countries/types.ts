export interface ICountry {
  aliases?: string[];
  alpha2: string;
  alpha3: string;
  fifa: string | null;
  ioc: string | null;
  iso_name: string;
  numeric: string;
  official: string;
  short: string | null;
  simple?: string;
  emoji: string;
  shortcode: string | null;
}

export interface IPrayerSettings {
  calculation_method?: string;
  asr_method?: 'Hanafi' | 'Standard';
}

interface IMosqueSettings {
  denomination: string;
  language_services: string;
}

export interface ICountryFeatures {
  mosques?: boolean;
  iqamahTimes?: boolean;
  prayerTimes?: boolean;
  events?: boolean;
  education?: boolean;
}

export interface ICountryConfig {
  code?: number | null;
  prayer_settings: IPrayerSettings;
  mosque: IMosqueSettings;
  features: ICountryFeatures;
}

export interface ICountryConfigValues {
  code?: number | null;
  prayer_settings?: IPrayerSettings;
  mosque?: IMosqueSettings;
  alias?: string;
  features?: ICountryFeatures;
}
