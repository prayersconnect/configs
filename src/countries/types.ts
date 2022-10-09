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
  code: number | null;
  alpha2Code: string; //alpha-2 code from https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
  prayer_settings: IPrayerSettings;
  mosque: IMosqueSettings;
  features: ICountryFeatures;
}

export interface ICountryConfigValues extends Partial<ICountryConfig> {
  alias?: string;
}
