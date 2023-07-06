import { DateTime } from 'luxon';

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
