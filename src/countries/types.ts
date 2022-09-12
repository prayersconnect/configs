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