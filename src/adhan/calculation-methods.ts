import {
  CalculationMethod,
  CalculationParameters,
  Coordinates,
  HighLatitudeRule,
  Madhab,
  PolarCircleResolution,
  Rounding,
  Shafaq,
} from 'adhan-extended';
import { isRamadan } from '../utils/date';
import {
  CalculationSettings,
  CalculationMethodEntry,
  PrayerTimesOptions,
} from './types';
import { DateTime } from 'luxon';
import { PrayerAndSunnahTimes } from './prayer-and-sunnah-times';

export const CalculationMethods: Record<string, CalculationMethodEntry> = {
  Custom: {
    label: 'Custom',
    info: 'Sets a Fajr angle of 0 and an Isha angle of 0.' as const,
    get: CalculationMethod.Other,
  },

  Algeria: {
    label: 'Ministry of Religious Affairs and Wakfs, Algeria',
    info: 'Uses Fajr angle of 18, Isha angle of 17, + 3min maghrib',
    get: () => {
      const params = new CalculationParameters('Other', 18.0, 17.0);
      params.methodAdjustments = {
        ...params.methodAdjustments,
        sunset: 3,
        maghrib: 3,
      };
      return params;
    },
  },

  Brunei: {
    label: 'Kementrian Hal Ehwal Ugama (Brunei Darussalam)',
    info: 'Uses Fajr angle of 20 and Isha angle of 18',
    get: () => new CalculationParameters('Other', 20.0, 18.0),
  },

  Dubai: {
    label: 'The Gulf Region (Dubai)',
    info: 'Uses Fajr and Isha angles of 18.2 degrees.',
    url: 'https://www.awqaf.gov.ae/en/Pages/PrayerTimes.aspx',
    get: CalculationMethod.Dubai,
  },

  Egyptian: {
    label: 'Egyptian General Survey Authority',
    info: 'Uses Fajr angle of 19.5 and an Isha angle of 17.5' as const,
    get: CalculationMethod.Egyptian,
    region: 'Africa, Syria, Iraq, Lebanon, Malaysia, Parts of the USA' as const,
  },

  France: {
    label: 'Union Organization Islamic de France',
    info: 'Uses a Fajr angle of 12 and an Isha angle of 12 by default but by setting alternativeCalculation to 15 or 18 it will updated accordingly.',
    region: 'France region' as const,
    availableMethods: ['12', '15', '18'],
    get: (settings?: CalculationSettings) => {
      const calculation = new CalculationParameters('Other', 12.0, 12.0);

      if (settings?.alternativeCalculation === '15') {
        calculation.fajrAngle = 15.0;
        calculation.ishaAngle = 15.0;
      }

      if (settings?.alternativeCalculation === '18') {
        calculation.fajrAngle = 18.0;
        calculation.ishaAngle = 18.0;
      }

      return calculation;
    },
  },

  Gulf: {
    label: 'Gulf region',
    info: 'Modified version of Umm al-Qura that uses a Fajr angle of 19.5.',
    get: () => new CalculationParameters('Other', 19.5, undefined, 90),
  },

  Jafari: {
    label: 'Shia Ithna Ashari, Leva Institute, Qum',
    info: 'Uses Fajr angle of 16, Maghrib angle of 4 and Isha angle of 14',
    get: () => new CalculationParameters('Other', 16.0, 14.0, 0, 4.0),
  },

  Karachi: {
    label: 'University of Islamic Sciences, Karachi',
    info: 'Uses Fajr angle of 18 and an Isha angle of 18' as const,
    get: CalculationMethod.Karachi,
    region:
      'Pakistan, Bangladesh, India, Afghanistan, Parts of Europe' as const,
  },

  Kemenag: {
    label: 'Kementrian Agama Republik Indonesia (KEMENAG)',
    info: 'Uses Fajr angle of 20.0 and Isha angle of 18',
    get: () => new CalculationParameters('Other', 20.0, 18.0),
  },

  Kuwait: {
    label: 'Kuwait',
    info: 'Uses a Fajr angle of 18 and an Isha angle of 17.5',
    get: CalculationMethod.Kuwait,
  },

  MoonsightingCommittee: {
    label: 'Moonsighting Committee',
    info: 'Uses a Fajr angle of 18 and an Isha angle of 18. Also uses seasonal adjustment values.' as const,
    get: CalculationMethod.MoonsightingCommittee,
  },

  MuslimWorldLeague: {
    label: 'Muslim World League',
    info: 'Uses Fajr angle of 18 and an Isha angle of 17' as const,
    get: CalculationMethod.MuslimWorldLeague,
    region: 'Europe, The Far East, Parts of the USA',
  },

  NorthAmerica: {
    label: 'Islamic Society of North America - ISNA',
    info: 'Uses a Fajr angle of 15 and an Isha angle of 15.' as const,
    region: 'Parts of the USA, Canada, Parts of the UK' as const,
    get: CalculationMethod.NorthAmerica,
  },

  Qatar: {
    label: 'Qatar',
    info: 'Modified version of Umm al-Qura that uses a Fajr angle of 18.',
    url: 'https://www.qatarch.com/home',
    get: CalculationMethod.Qatar,
  },

  Russia: {
    label: 'Spiritual Administration of Muslims of Russia',
    info: 'Uses a Fajr angle of 16 and an Isha angle of 15.',
    get: () => new CalculationParameters('Other', 16.0, 15.0),
  },

  Singapore: {
    label: 'Singapore',
    info: 'Uses a Fajr angle of 20 and an Isha angle of 18' as const,
    get: CalculationMethod.Singapore,
    url: 'https://www.muis.gov.sg/',
    region: 'Singapore region' as const,
  },

  Tehran: {
    label: 'Shia, Institute of Geophysics, University of Tehran',
    info: 'Uses Fajr angle of 17.7, Maghrib angle of 4.5 and Isha angle of 14',
    get: CalculationMethod.Tehran,
  },

  Turkey: {
    label: 'Presidency of Religious Affairs, Turkey',
    info: 'Uses a Fajr angle of 18 and an Isha angle of 17.',
    url: 'https://kurul.diyanet.gov.tr/Karar-Mutalaa-Cevap/4093/45-enlemin-otesinde-namaz-vakitleri',
    get: CalculationMethod.Turkey,
    preAdjustments: (date: DateTime, options: PrayerTimesOptions) => {
      if (options.coordinates.latitude >= 62) {
        options.coordinates.latitude = 62;
      }
    },
    postAdjustments: (
      date: DateTime,
      options: PrayerTimesOptions,
      prayerTimes: PrayerAndSunnahTimes
    ) => {
      if (options.coordinates.latitude > 45) {
        const oneThirdOfNightDurationMs =
          prayerTimes.sunnahTimes.nightDuration / 3;

        if (oneThirdOfNightDurationMs <= 80 * 60 * 1000) {
          prayerTimes.isha = prayerTimes.maghrib?.plus({
            milliseconds: oneThirdOfNightDurationMs,
          });
        } else {
          prayerTimes.isha = prayerTimes.maghrib?.plus({ minutes: 80 });
        }

        const monthsBetween = [
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
        ];

        if (
          prayerTimes.dateTime &&
          prayerTimes.isha &&
          prayerTimes.maghrib &&
          prayerTimes.sunrise &&
          monthsBetween.includes(prayerTimes.dateTime.monthLong)
        ) {
          let intervalTime =
            prayerTimes.isha.diff(prayerTimes.maghrib).as('milliseconds') +
            10 * 60 * 1000;

          prayerTimes.fajr = prayerTimes.sunrise.minus({
            milliseconds: intervalTime,
          });
        }
      }
    },
  },

  UmmAlQura: {
    label: 'Umm al-Qura University, Makkah',
    info: 'Uses a Fajr angle of 18.5 and an Isha interval of 90 minutes.\nNote: You should add a +30 minute custom adjustment of Isha during Ramadan.' as const,
    url: 'https://www.ummulqura.org.sa/Index.aspx' as const,
    region: 'The Arabian Peninsula' as const,
    get: CalculationMethod.UmmAlQura,
    preAdjustments: (date: DateTime, options: PrayerTimesOptions) => {
      if (isRamadan(date)) {
        options.calculationParameters.ishaInterval = 120;
      }
    },
  },
};

export function calculatePrayerTimes(
  date: DateTime,
  setting: CalculationSettings
) {
  const options = getPrayerTimesOptionsFromSettings(setting);
  if (!options) return;

  if (options.calculationMethod?.preAdjustments) {
    options.calculationMethod.preAdjustments(date, options, setting);
  }

  const prayerTimes = new PrayerAndSunnahTimes(date, options);

  if (options.calculationMethod?.postAdjustments) {
    options.calculationMethod.postAdjustments(date, options, prayerTimes);
  }

  return prayerTimes;
}

function getPrayerTimesOptionsFromSettings(
  settings: CalculationSettings
): PrayerTimesOptions {
  const {
    location,
    calculationMethod,
    midnightMethod,
    midnightAdjustment,
    asrCalculation,
    shafaq,
    polarResolution,
    highLatitudeRule,
    roundingMethod,
  } = settings;

  if (
    !location ||
    !location.latitude ||
    !location.longitude ||
    !calculationMethod
  ) {
    throw new Error('Required properties are missing from the settings.');
  }

  const prayerTimeOptions: PrayerTimesOptions = {
    calculationParameters: CalculationMethods[calculationMethod].get(settings),
    coordinates: new Coordinates(location.latitude, location.longitude),
    calculationMethod: CalculationMethods[calculationMethod],
    midnightMethod: midnightMethod,
    midnightAdjustment: midnightAdjustment ?? 0,
  };

  setRounding(prayerTimeOptions, roundingMethod);
  setAdjustments(prayerTimeOptions, settings);
  setOverrides(prayerTimeOptions, settings);
  setHighLatitudeRule(prayerTimeOptions, highLatitudeRule);
  setMadhab(prayerTimeOptions, asrCalculation);
  setShafaq(prayerTimeOptions, shafaq);
  setPolarCircleResolution(prayerTimeOptions, polarResolution);

  return prayerTimeOptions;
}

function setRounding(
  prayerTimeOptions: PrayerTimesOptions,
  roundingMethod?: typeof Rounding[keyof typeof Rounding]
) {
  prayerTimeOptions.calculationParameters.rounding =
    roundingMethod || prayerTimeOptions.calculationParameters.rounding;
}

function setAdjustments(
  prayerTimeOptions: PrayerTimesOptions,
  state: CalculationSettings
) {
  prayerTimeOptions.calculationParameters.adjustments = {
    fajr: state.fajrAdjustment ?? 0,
    sunrise: state.sunriseAdjustment ?? 0,
    dhuhr: state.dhuhrAdjustment ?? 0,
    asr: state.asrAdjustment ?? 0,
    sunset: state.sunsetAdjustment ?? 0,
    maghrib: state.maghribAdjustment ?? 1,
    isha: state.ishaAdjustment ?? 0,
  };
}

function setOverrides(
  prayerTimeOptions: PrayerTimesOptions,
  state: CalculationSettings
) {
  const params = prayerTimeOptions.calculationParameters;
  params.fajrAngle = state.fajrAngleOverride || params.fajrAngle;
  params.ishaAngle = state.ishaAngleOverride || params.ishaAngle;
  params.ishaInterval = state.ishaIntervalOverride || params.ishaInterval;
  params.maghribAngle = state.maghribAngleOverride || params.maghribAngle;
}

function setHighLatitudeRule(
  prayerTimeOptions: PrayerTimesOptions,
  highLatRuleSetting?: typeof HighLatitudeRule[keyof typeof HighLatitudeRule]
) {
  const rule =
    highLatRuleSetting ??
    HighLatitudeRule.recommended(prayerTimeOptions.coordinates);
  switch (rule) {
    case HighLatitudeRule.MiddleOfTheNight:
    case HighLatitudeRule.SeventhOfTheNight:
    case HighLatitudeRule.TwilightAngle:
      prayerTimeOptions.calculationParameters.highLatitudeRule = rule;
      break;
    default:
      prayerTimeOptions.calculationParameters.highLatitudeRule =
        HighLatitudeRule.recommended(prayerTimeOptions.coordinates);
  }
}

function setMadhab(
  prayerTimeOptions: PrayerTimesOptions,
  asrCalcSetting: typeof Madhab[keyof typeof Madhab] = Madhab.Shafi
) {
  prayerTimeOptions.calculationParameters.madhab = asrCalcSetting;
}

function setShafaq(
  prayerTimeOptions: PrayerTimesOptions,
  shafaqCalcSetting?: typeof Shafaq[keyof typeof Shafaq]
) {
  if (
    prayerTimeOptions.calculationParameters.method === 'MoonsightingCommittee'
  ) {
    prayerTimeOptions.calculationParameters.shafaq =
      shafaqCalcSetting || Shafaq.General;
  }
}

function setPolarCircleResolution(
  prayerTimeOptions: PrayerTimesOptions,
  polarCicleResolutionSetting?: string
) {
  switch (polarCicleResolutionSetting) {
    case PolarCircleResolution.AqrabBalad:
    case PolarCircleResolution.AqrabYaum:
      prayerTimeOptions.calculationParameters.polarCircleResolution =
        polarCicleResolutionSetting;
      break;
    default:
      prayerTimeOptions.calculationParameters.polarCircleResolution =
        PolarCircleResolution.Unresolved;
  }
}
