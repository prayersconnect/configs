export interface ICountryOutput {
  gmap_name: string; // name defined in Google Maps. if this attribute is not defined, then the iso_name is used
  iso_name: string;
  emoji: string;
  pc_name: string; // name defined in pc api v2 database
}

export interface ICountry {
  aliases?: string[];
  alpha2: string;
  alpha3: string;
  fifa: string | null;
  ioc: string | null;
  iso_name: string;
  gmap_name?: string;
  pc_name?: string;
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
  mosques: boolean;
  iqamahTimes: boolean;
  prayerTimes: boolean;
  events: boolean;
  education: boolean;
}

export interface IIntlParams {
  distanceUnit?: string;
  postalCodeName?: string;
  labelForProvince?: string;
}

export interface ICountryConfig {
  code: number | null;
  alpha2Code: string; //alpha-2 code from https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
  prayerSettings: Required<IPrayerSettings>;
  mosque: IMosqueSettings;
  features: ICountryFeatures;
  intl: Required<IIntlParams>; //internationalization params
}

export interface ICountryConfigValues extends Partial<ICountryConfig> {
  alias?: string;
}
