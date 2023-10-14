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
  CalculationMethodKey,
  AsrCalculationType,
} from './types';
import { DateTime } from 'luxon';
import { PrayerAndSunnahTimes } from './prayer-and-sunnah-times';

export const CalculationMethods: Record<
  CalculationMethodKey,
  CalculationMethodEntry
> = {
  Custom: {
    calculationKey: 'Custom',
    label: 'Custom',
    info: 'Fajr: 0°, Isha: 0°' as const,
    get: CalculationMethod.Other,
  },

  Algeria: {
    calculationKey: 'Algeria',
    label: 'Ministry of Religious Affairs and Wakfs, Algeria',
    otherLabel: 'Ministry of Religious Affairs and Wakfs',
    info: 'Fajr: 18°, Magrib: +3 min, Isha: 17°',
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
    calculationKey: 'Brunei',
    label: 'Kementrian Hal Ehwal Ugama (Brunei Darussalam)',
    otherLabel: 'Brunei Darussalam',
    info: 'Fajr: 20°, Isha: 18°',
    get: () => new CalculationParameters('Other', 20.0, 18.0),
  },

  Dubai: {
    calculationKey: 'Dubai',
    label: 'The Gulf Region (Dubai)',
    info: 'Fajr: 18.2°, Isha: 18.2°',
    url: 'https://www.awqaf.gov.ae/en/Pages/PrayerTimes.aspx',
    get: CalculationMethod.Dubai,
  },

  Egyptian: {
    calculationKey: 'Egyptian',
    label: 'Egyptian General Survey Authority',
    info: 'Fajr: 19.5°, Isha: 17.5°' as const,
    get: CalculationMethod.Egyptian,
    region: 'Africa, Syria, Iraq, Lebanon, Malaysia, Parts of the USA' as const,
  },

  France: {
    calculationKey: 'France',
    label: 'Union Organization Islamic de France - 12',
    info: 'Fajr: 12.0°, Isha: 12.0°',
    region: 'France region' as const,
    get: (settings?: CalculationSettings) => {
      const calculation = new CalculationParameters('Other', 12.0, 12.0);

      return calculation;
    },
  },

  France15: {
    calculationKey: 'France15',
    label: 'Union Organization Islamic de France - 15',
    info: 'Fajr: 15.0°, Isha: 15.0°',
    region: 'France region' as const,
    get: (settings?: CalculationSettings) => {
      const calculation = new CalculationParameters('Other', 15.0, 15.0);

      return calculation;
    },
  },

  France18: {
    calculationKey: 'France18',
    label: 'Union Organization Islamic de France - 18',
    info: 'Fajr: 18.0°, Isha: 18.0°',
    region: 'France region' as const,
    get: (settings?: CalculationSettings) => {
      const calculation = new CalculationParameters('Other', 18.0, 18.0);

      return calculation;
    },
  },

  Gulf: {
    calculationKey: 'Gulf',
    label: 'Gulf region',
    info: 'Fajr: 19.5°, Isha: +90 min',
    get: () => new CalculationParameters('Other', 19.5, undefined, 90),
  },

  Jafari: {
    calculationKey: 'Jafari',
    label: 'Shia Ithna Ashari, Leva Institute, Qum',
    otherLabel: 'Leva Institute, Qum',
    info: 'Fajr: 16.0°, Magrib: 4.0°, Isha: 14.0°',
    get: () => new CalculationParameters('Other', 16.0, 14.0, 0, 4.0),
  },

  Karachi: {
    calculationKey: 'Karachi',
    label: 'University of Islamic Sciences, Karachi',
    otherLabel: 'University of Islamic Sciences',
    info: 'Fajr: 18.0°, Isha: 18.0°',
    get: CalculationMethod.Karachi,
    region:
      'Pakistan, Bangladesh, India, Afghanistan, Parts of Europe' as const,
  },

  Indonesia: {
    calculationKey: 'Indonesia',
    label: 'Kementrian Agama Republik Indonesia (KEMENAG)',
    otherLabel: 'Kementrian Agama Republik Indonesia',
    info: 'Fajr: 20.0°, Isha: 18.0°',
    get: () => new CalculationParameters('Other', 20.0, 18.0),
  },

  Kuwait: {
    calculationKey: 'Kuwait',
    label: 'Kuwait',
    info: 'Fajr: 18.0°, Isha: 17.5°' as const,
    get: CalculationMethod.Kuwait,
  },

  MoonsightingCommittee: {
    calculationKey: 'MoonsightingCommittee',
    label: 'Moonsighting Committee',
    info: 'Fajr: 18.0°, Isha: 18.0°, Note: seasonal adjustment values.' as const,
    get: CalculationMethod.MoonsightingCommittee,
    region: 'UK',
  },

  MuslimWorldLeague: {
    calculationKey: 'MuslimWorldLeague',
    label: 'Muslim World League',
    info: 'Fajr: 18.0°, Isha: 17.0°' as const,
    get: CalculationMethod.MuslimWorldLeague,
    region: 'Europe, The Far East, Parts of the USA',
  },

  IslamicSocietyOfNorthAmerica: {
    calculationKey: 'IslamicSocietyOfNorthAmerica',
    label: 'Islamic Society of North America - ISNA',
    info: 'Fajr: 15.0°, Isha: 15.0°' as const,
    region: 'Parts of the USA, Canada, Parts of the UK' as const,
    get: CalculationMethod.NorthAmerica,
  },

  Qatar: {
    calculationKey: 'Qatar',
    label: 'Qatar',
    info: 'Fajr: 18.5°, Isha: +90 min',
    url: 'https://www.qatarch.com/home',
    get: CalculationMethod.Qatar,
  },

  Russia: {
    calculationKey: 'Russia',
    label: 'Spiritual Administration of Muslims of Russia',
    info: 'Fajr: 16.0°, Isha: 15.0°',
    get: () => new CalculationParameters('Other', 16.0, 15.0),
  },

  Singapore: {
    calculationKey: 'Singapore',
    label: 'Singapore',
    info: 'Fajr: 20.0°, Isha: 18.0°' as const,
    get: CalculationMethod.Singapore,
    url: 'https://www.muis.gov.sg/',
    region: 'Singapore region' as const,
  },

  Tehran: {
    calculationKey: 'Tehran',
    label: 'Shia, Institute of Geophysics, University of Tehran',
    info: 'Fajr: 17.7°, Magrib: 4.5°, Isha: 14.0°',
    get: CalculationMethod.Tehran,
  },

  Tunisia: {
    calculationKey: 'Tunisia',
    label: 'Ministry of Religious Affairs of Tunisia',
    info: 'Fajr: 18.0°, Isha: 18.0°',
    get: () => new CalculationParameters('Other', 18.0, 18.0),
  },

  Turkey: {
    calculationKey: 'Turkey',
    label: 'Presidency of Religious Affairs, Turkey',
    info: 'Fajr: 18.0°, Isha: 17.0°',
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
          prayerTimes.dateTime.monthLong &&
          monthsBetween.includes(prayerTimes.dateTime.monthLong)
        ) {
          const intervalTime =
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
    calculationKey: 'UmmAlQura',
    label: 'Umm al-Qura University, Makkah',
    info: 'Fajr: 18.5°, Isha: +90 min, Ramadan - Isha: +120 min' as const,
    url: 'https://www.ummulqura.org.sa/Index.aspx' as const,
    region: 'The Arabian Peninsula' as const,
    get: CalculationMethod.UmmAlQura,
    preAdjustments: (date: DateTime, options: PrayerTimesOptions) => {
      if (isRamadan(date)) {
        options.calculationParameters.ishaInterval = 120;
      }
    },
  },
} as const;

export const HighLatitudeLabels = [
  {
    label: 'Middle of the Night',
    key: 'middleofthenight',
  },
  {
    label: 'Seventh of the Night',
    key: 'seventhofthenight',
  },
  {
    label: 'Twilight Angle Based',
    key: 'twilightangle',
  },
];

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

  const calculationMethodEntry = CalculationMethods[calculationMethod];

  if (!calculationMethodEntry) {
    throw new Error(
      `Could not find '${calculationMethodEntry}' in CalculationMethods`
    );
  }

  const prayerTimeOptions: PrayerTimesOptions = {
    calculationParameters: calculationMethodEntry.get(settings),
    coordinates: new Coordinates(location.latitude, location.longitude),
    calculationMethod: calculationMethodEntry,
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
    roundingMethod || 'nearest';
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
  asrCalcSetting: AsrCalculationType = 'Standard'
) {
  const type =
    asrCalcSetting.toLowerCase() === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;
  prayerTimeOptions.calculationParameters.madhab = type;
}

function setShafaq(
  prayerTimeOptions: PrayerTimesOptions,
  shafaqCalcSetting?: typeof Shafaq[keyof typeof Shafaq]
) {
  prayerTimeOptions.calculationParameters.shafaq =
    shafaqCalcSetting || Shafaq.General;
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
