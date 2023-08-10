import {
  Madhab,
  MidnightMethod,
  HighLatitudeRule,
  Shafaq,
  CalculationParameters,
  Coordinates,
  PrayerTimes,
  Rounding,
} from 'adhan-extended';
import { DateTime } from 'luxon';
import { PrayerAndSunnahTimes } from './prayer-and-sunnah-times';

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

export type CalculationMethodEntry = {
  label: string;
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
  midnightMethod: keyof typeof MidnightMethod;
  /** Ajustments in minutes */
  midnightAdjustment: number;
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

export type formatOptions = {
  use24HourFormat: boolean;
  timezone?: string;
};

// FIX: Typescript intelisence
// export type CalculationMethodKey = keyof typeof CalculationMethods;
export type CalculationMethodKey =
  | 'Custom'
  | 'Algeria'
  | 'Brunei'
  | 'Dubai'
  | 'Egyptian'
  | 'France'
  | 'Gulf'
  | 'Jafari'
  | 'Karachi'
  | 'Kemenag'
  | 'Kuwait'
  | 'MoonsightingCommittee'
  | 'MuslimWorldLeague'
  | 'NorthAmerica'
  | 'Qatar'
  | 'Russia'
  | 'Singapore'
  | 'Tehran'
  | 'Turkey'
  | 'UmmAlQura';

export type CalculationSettings = {
  location: Coordinates | undefined;
  calculationMethod: CalculationMethodKey;
  asrCalculation: typeof Madhab[keyof typeof Madhab];
  midnightMethod: keyof typeof MidnightMethod;

  // Used alternative calculation methods i.e france 12, 15, 18 degrees
  alternativeCalculation?: string;
  timezone?: string;

  highLatitudeRule?:
    | typeof HighLatitudeRule[keyof typeof HighLatitudeRule]
    | undefined;
  shafaq?: typeof Shafaq[keyof typeof Shafaq];
  polarResolution?: string;

  // Parameters override
  fajrAngleOverride?: number;
  ishaAngleOverride?: number;
  maghribAngleOverride?: number;
  ishaIntervalOverride?: number;

  // prayer adjustment settings
  fajrAdjustment?: number;
  sunriseAdjustment?: number;
  dhuhrAdjustment?: number;
  asrAdjustment?: number;
  sunsetAdjustment?: number;
  maghribAdjustment?: number;
  ishaAdjustment?: number;
  midnightAdjustment?: number;
  roundingMethod?: typeof Rounding[keyof typeof Rounding];

  // calendar
  hijriDateAdjustment?: number;
};
