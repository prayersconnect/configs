import {
  CalculationMethod,
  Coordinates,
  HighLatitudeRule,
  Madhab,
  PrayerTimes,
} from 'adhan';
import { DateTime } from 'luxon';
import { IAdhanCalculated, IAdhanCalculationExtras, ICoords } from './types';

const getMethodFromShortName = (shortName: string) => {
  switch (shortName) {
    case 'ISNA':
      return CalculationMethod.NorthAmerica();
    case 'MWL':
      return CalculationMethod.MuslimWorldLeague();
    case 'Karachi':
      return CalculationMethod.Karachi();
    case 'Makkah':
      return CalculationMethod.UmmAlQura();
    case 'Egypt':
      return CalculationMethod.Egyptian();
    case 'Tehran':
      return CalculationMethod.Tehran();
    case 'Jafari':
      const jafari = CalculationMethod.Other();
      jafari.fajrAngle = 16;
      jafari.ishaAngle = 14;
      jafari.maghribAngle = 4;
      return jafari;
    case 'turkey-presidency-of-religious-affairs':
      // return CalculationMethod.Turkey();
      const turkey = CalculationMethod.Other();
      turkey.fajrAngle = 18;
      turkey.ishaAngle = 17;
      return turkey;

    case 'union-des-organisations-islamiques-de-france':
      const uoif = CalculationMethod.Other();
      uoif.fajrAngle = 12;
      uoif.ishaAngle = 12;
      return uoif;
    case 'france-15-degree':
      const france15 = CalculationMethod.Other();
      france15.fajrAngle = 15;
      france15.ishaAngle = 15;
      return france15;
    case 'france-18-degree':
      const france18 = CalculationMethod.Other();
      france18.fajrAngle = 18;
      france18.ishaAngle = 18;
      return france18;
    case 'russia':
      const russia = CalculationMethod.Other();
      russia.fajrAngle = 16;
      russia.ishaAngle = 15;
      return russia;
    case 'gaiae':
      const gaiae = CalculationMethod.Other();
      gaiae.fajrAngle = 18;
      gaiae.ishaAngle = 17.5;
      return gaiae;
    default:
      return CalculationMethod.MuslimWorldLeague();
  }
};
const getCalculationParams = (
  shortName: string,
  juristicMethod: string,
  extras: IAdhanCalculationExtras = {}
) => {
  //handle custom methods first
  const isCustomMethod = shortName.startsWith('custom');
  let params;
  if (isCustomMethod) {
    const custom = CalculationMethod.Other();
    const calcMeta = extras.calculation_method_meta;
    if (calcMeta?.fajr) {
      custom.fajrAngle = calcMeta.fajr;
    }
    if (calcMeta?.isha) {
      custom.ishaAngle = calcMeta.isha;
    }
    params = custom;
  } else {
    params = getMethodFromShortName(shortName);

    if (extras.highLatRule) {
      params.highLatitudeRule =
        HighLatitudeRule[extras.highLatRule as keyof typeof HighLatitudeRule];
    }
  }

  if (juristicMethod === 'Hanafi') {
    params.madhab = Madhab.Hanafi;
  } else {
    params.madhab = Madhab.Shafi;
  }
  //always add 1 min to maghrib
  params.adjustments.maghrib = 1;

  return params;
};

export function calculateAdhan(
  date: DateTime,
  coords: ICoords,
  method: string,
  asrMethod: string,
  extras = {} as IAdhanCalculationExtras
): IAdhanCalculated {
  const coordinates = new Coordinates(coords.latitude, coords.longitude);
  const params = getCalculationParams(method, asrMethod, extras);

  const calculated = new PrayerTimes(coordinates, date.toJSDate(), params);
  return {
    fajr: DateTime.fromJSDate(calculated.fajr),
    sunrise: DateTime.fromJSDate(calculated.sunrise),
    dhuhr: DateTime.fromJSDate(calculated.dhuhr),
    asr: DateTime.fromJSDate(calculated.asr),
    sunset: DateTime.fromJSDate(calculated.sunset),
    maghrib: DateTime.fromJSDate(calculated.maghrib),
    isha: DateTime.fromJSDate(calculated.isha),
  };
}
