import {
  MidnightMethod,
  HighLatitudeRule,
  Shafaq,
  CalculationParameters,
  Coordinates,
  Rounding,
} from 'adhan-extended';
import { DateTime } from 'luxon';
import { PrayerAndSunnahTimes } from './prayer-and-sunnah-times';
import { TimeZoneType } from '../utils/timezonetype';

export { MidnightMethod } from 'adhan-extended';

export interface ICoords {
  latitude: number;
  longitude: number;
}

export interface IAdhanCalculationExtras {
  calculation_method_meta?: {
    fajr?: number;
    isha?: number;
  };
  highLatRule?: string;
}

export interface IAdhanCalculated {
  fajr: DateTime;
  sunrise: DateTime;
  dhuhr: DateTime;
  asr: DateTime;
  sunset: DateTime;
  maghrib: DateTime;
  isha: DateTime;
}

export type CalculationMethodKey =
  | 'Custom'
  | 'Algeria'
  | 'Brunei'
  | 'Dubai'
  | 'Egyptian'
  | 'France'
  | 'France15'
  | 'France18'
  | 'Gulf'
  | 'IslamicSocietyOfNorthAmerica'
  | 'Jafari'
  | 'Karachi'
  | 'Indonesia'
  | 'Kuwait'
  | 'MoonsightingCommittee'
  | 'MuslimWorldLeague'
  | 'Qatar'
  | 'Russia'
  | 'Singapore'
  | 'Tehran'
  | 'Tunisia'
  | 'Turkey'
  | 'UmmAlQura';

export type CalculationMethodEntry = {
  calculationKey: CalculationMethodKey;
  label: string;
  otherLabel?: string;
  info: string;
  url?: string;
  region?: string;
  availableMethods?: string[];
  get: (settings?: CalculationSettings) => CalculationParameters;
  preAdjustments?: (
    date: DateTime,
    options: PrayerTimesOptions,
    settings: CalculationSettings
  ) => void;
  postAdjustments?: (
    date: DateTime,
    options: PrayerTimesOptions,
    prayerTimes: PrayerAndSunnahTimes
  ) => void;
};

export interface IAdhanCalculatedType {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  sunset: string;
  maghrib: string;
  isha: string;
  midnight: string;
  tahajjud: string;
}

export type PrayerTimesOptions = {
  calculationParameters: CalculationParameters;
  coordinates: Coordinates;
  calculationMethod?: CalculationMethodEntry;
  midnightMethod?: keyof typeof MidnightMethod;
  /** Ajustments in minutes */
  midnightAdjustment: number;
  timezone?: TimeZoneType;
};

export enum Prayer {
  Fajr = 'fajr',
  Sunrise = 'sunrise',
  Dhuhr = 'dhuhr',
  Asr = 'asr',
  Sunset = 'sunset',
  Maghrib = 'maghrib',
  Isha = 'isha',
  /** middle of the night */
  Midnight = 'midnight',
  /** last third of the night */
  Tahajjud = 'tahajjud',
}

export enum JamaatPrayer {
  Fajr = 'fajr',
  Dhuhr = 'dhuhr',
  Asr = 'asr',
  Maghrib = 'maghrib',
  Isha = 'isha',
  Eid = 'eid',
  Jumma = 'jumma',
}

export const NonPrayer = [
  Prayer.Sunrise,
  Prayer.Sunset,
  Prayer.Midnight,
  Prayer.Tahajjud,
];

export const PrayersInOrder = [
  Prayer.Fajr,
  Prayer.Sunrise,
  Prayer.Dhuhr,
  Prayer.Asr,
  Prayer.Sunset,
  Prayer.Maghrib,
  Prayer.Isha,
  /** middle of the night */
  Prayer.Midnight,
  /** last third of the night */
  Prayer.Tahajjud,
];

export type FormatOptions = {
  use24HourFormat: boolean;
  timezone?: TimeZoneType;
};

export type AsrCalculationType = 'Standard' | 'Hanafi';

export type HighLatitudeRule =
  | 'middleofthenight'
  | 'seventhofthenight'
  | 'twilightangle';

/**
 * Represents settings for prayer time calculations.
 */
export type CalculationSettings = {
  /** The geographical coordinates where the calculation is applied. */
  location: ICoords | undefined;

  /** The method used for prayer time calculation. e.g., 'MuslimWorldLeague', 'IslamicSocietyOfNorthAmerica'. */
  calculationMethod: CalculationMethodKey;

  /** Determines the method used to calculate Asr prayer time. e.g., 'Standard', 'Hanafi'. */
  asrCalculation: AsrCalculationType;

  /** The timezone for which the prayer times will be calculated. */
  timezone?: TimeZoneType;

  /** Specifies the method to calculate midnight. e.g., 'SunsetToSunrise', 'SunsetToFajr'. */
  midnightMethod?: keyof typeof MidnightMethod;

  /** The rule to be applied for high latitude areas. e.g., 'AngleBased', 'OneSeventh'. */
  highLatitudeRule?: HighLatitudeRule;

  /** The twilight angle used for Fajr and Isha in high latitudes. e.g., 'general', 'ahmer', 'abyad'. */
  shafaq?: typeof Shafaq[keyof typeof Shafaq];

  /** Specifies how times are determined at polar regions. e.g., 'AqrabBalad', 'AqrabYaum'. */
  polarResolution?: string;

  /** Override the default Fajr angle. */
  fajrAngleOverride?: number;

  /** Override the default Isha angle. */
  ishaAngleOverride?: number;

  /** Override the default Maghrib angle. */
  maghribAngleOverride?: number;

  /** Override the default interval between Maghrib and Isha. */
  ishaIntervalOverride?: number;

  /** Time adjustment (in minutes) for Fajr prayer. */
  fajrAdjustment?: number;

  /** Time adjustment (in minutes) for Sunrise. */
  sunriseAdjustment?: number;

  /** Time adjustment (in minutes) for Dhuhr prayer. */
  dhuhrAdjustment?: number;

  /** Time adjustment (in minutes) for Asr prayer. */
  asrAdjustment?: number;

  /** Time adjustment (in minutes) for Sunset. */
  sunsetAdjustment?: number;

  /** Time adjustment (in minutes) for Maghrib prayer. */
  maghribAdjustment?: number;

  /** Time adjustment (in minutes) for Isha prayer. */
  ishaAdjustment?: number;

  /** Time adjustment (in minutes) for Midnight. */
  midnightAdjustment?: number;

  /** The method used for rounding seconds. e.g., 'nearest', 'up', 'none'. */
  roundingMethod?: typeof Rounding[keyof typeof Rounding];

  /** Adjust the Hijri date by a certain number of days. */
  hijriDateAdjustment?: number;
};
