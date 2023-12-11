// for country code, visit https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes and get the corresponding numeric code for the country
// value for calculation_method must match values defined in calculation-method.yml

import { CalculationSettings } from '../adhan/types';
import {
  ICountryConfigValues,
  ICountryFeatures,
  IIntlParams,
  IPrayerSettings,
} from './types';

type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

interface allConfigs {
  [key: string]: string | DeepPartial<ICountryConfigValues>;
}

export const defaultConfig = {
  code: null,
  alpha2_code: '',
  prayerSettings: {
    asr_method: 'Standard',
    calculation_method: 'MWL',
  } as IPrayerSettings,
  calculationSettings: {
    calculationMethod: 'MuslimWorldLeague',
    asrCalculation: 'Standard',
  } as CalculationSettings,
  mosque: {
    denomination: 'sunni',
    language_services: 'english',
  },
  features: {
    mosques: false,
    iqamahTimes: false,
    prayerTimes: true,
    events: false,
    education: false,
  } as ICountryFeatures,
  intl: {
    distanceUnit: 'km',
    postalCodeName: 'Postal Code',
    labelForProvince: 'Province',
  } as IIntlParams,
};

const prayersConfigs: allConfigs = {
  'United States': {
    code: 840,
    alpha2Code: 'US',
    prayerSettings: {
      calculation_method: 'ISNA',
    },
    calculationSettings: {
      calculationMethod: 'IslamicSocietyOfNorthAmerica',
    },
    mosque: {
      language_services: 'english',
      denomination: 'sunni',
    },
    features: {
      mosques: true,
      iqamahTimes: true,
      events: true,
      education: true,
    },
    intl: {
      distanceUnit: 'mi',
      postalCodeName: 'ZIP Code',
      labelForProvince: 'State',
    },
  },
  Canada: {
    code: 124,
    alpha2Code: 'CA',
    prayerSettings: {
      calculation_method: 'ISNA',
    },
    calculationSettings: {
      calculationMethod: 'IslamicSocietyOfNorthAmerica',
    },
    features: {
      mosques: true,
      iqamahTimes: true,
      events: true,
    },
  },
  Bangladesh: {
    code: 50,
    alpha2Code: 'BD',
    prayerSettings: {
      asr_method: 'Hanafi',
      calculation_method: 'Karachi',
    },
    calculationSettings: {
      calculationMethod: 'Karachi',
      asrCalculation: 'Hanafi',
    },
    mosque: {
      language_services: 'bangla',
      denomination: 'sunni',
    },
    features: {
      mosques: true,
    },
    intl: {
      labelForProvince: 'Division',
    },
  },
  Turkiye: {
    code: 792,
    alpha2Code: 'TR',
    prayerSettings: {
      calculation_method: 'turkey-presidency-of-religious-affairs',
    },
    calculationSettings: {
      calculationMethod: 'Turkey',
    },
    mosque: {
      language_services: 'Türkçe',
      denomination: 'sunni',
    },
    features: {
      mosques: true,
    },
  },
  Turkey: 'Turkiye',
  'United Kingdom': {
    code: 826,
    alpha2Code: 'GB',
    prayerSettings: {
      calculation_method: 'MWL',
    },
    calculationSettings: {
      calculationMethod: 'MoonsightingCommittee',
    },
    mosque: {
      language_services: 'english',
      denomination: 'sunni',
    },
    features: {
      mosques: true,
      iqamahTimes: true,
    },
    intl: {
      distanceUnit: 'mi',
      postalCodeName: 'Post Code',
    },
  },
  Australia: {
    code: 36,
    alpha2Code: 'AU',
    prayerSettings: {
      asr_method: 'Hanafi',
    },
    calculationSettings: {
      asrCalculation: 'Hanafi',
    },
    features: {
      mosques: true,
      iqamahTimes: true,
    },
    intl: {
      labelForProvince: 'State',
    },
  },
  'New Zealand': {
    code: 554,
    alpha2Code: 'NZ',
    prayerSettings: {
      asr_method: 'Hanafi',
    },
    calculationSettings: {
      asrCalculation: 'Hanafi',
    },
    mosque: {
      language_services: 'english',
      denomination: 'sunni',
    },
    features: {
      mosques: true,
      iqamahTimes: true,
    },
  },
  India: {
    code: 356,
    alpha2Code: 'IN',
    prayerSettings: {
      calculation_method: 'Karachi',
      asr_method: 'Hanafi',
    },
    calculationSettings: {
      calculationMethod: 'Karachi',
      asrCalculation: 'Hanafi',
    },
    mosque: {
      language_services: 'hindi',
      denomination: 'sunni',
    },
    intl: {
      labelForProvince: 'State',
    },
  },
  Pakistan: {
    code: 586,
    alpha2Code: 'PK',
    prayerSettings: {
      calculation_method: 'Karachi',
      asr_method: 'Hanafi',
    },
    calculationSettings: {
      calculationMethod: 'Karachi',
      asrCalculation: 'Hanafi',
    },
    mosque: {
      language_services: 'urdu',
      denomination: 'sunni',
    },
  },
  France: {
    code: 250,
    alpha2Code: 'FR',
    prayerSettings: {
      calculation_method: 'union-des-organisations-islamiques-de-france',
    },
    calculationSettings: {
      calculationMethod: 'France',
    },
    features: {
      mosques: true,
    },
  },
  Egypt: {
    code: 818,
    alpha2Code: 'EG',
    prayerSettings: {
      calculation_method: 'Egypt',
    },
    calculationSettings: {
      calculationMethod: 'Egyptian',
    },
    intl: {
      labelForProvince: 'Governorate',
    },
  },
  'Saudi Arabia': {
    code: 682,
    alpha2Code: 'SA',
    prayerSettings: {
      calculation_method: 'Makkah',
    },
    calculationSettings: {
      calculationMethod: 'UmmAlQura',
    },
  },
  'United Arab Emirates': {
    code: 784,
    prayerSettings: {
      calculation_method: 'gaiae',
    },
    calculationSettings: {
      calculationMethod: 'Gulf',
    },
  },
  Russia: {
    code: 643,
    alpha2Code: 'RU',
    prayerSettings: {
      calculation_method: 'russia',
    },
    calculationSettings: {
      calculationMethod: 'Russia',
    },
    mosque: {
      language_services: 'russian',
      denomination: 'sunni',
    },
    features: {
      mosques: true,
    },
  },
  Germany: {
    code: 276,
    alpha2Code: 'DE',
    mosque: {
      language_services: 'german',
      denomination: 'sunni',
    },
    features: {
      mosques: true,
    },
  },
  Ireland: {
    code: 372,
    alpha2Code: 'IE',
    features: {
      mosques: true,
    },
  },
  Italy: {
    code: 380,
    alpha2Code: 'IT',
    features: {
      mosques: true,
    },
  },
  Netherlands: {
    code: 528,
    alpha2Code: 'NL',
    features: {
      mosques: true,
    },
  },
  Switzerland: {
    code: 756,
    alpha2Code: 'CH',
    features: {
      mosques: true,
    },
  },
  Spain: {
    code: 724,
    alpha2Code: 'ES',
    features: {
      mosques: true,
    },
  },
  DK: {
    code: 208,
    alpha2Code: 'DK',
    features: {
      mosques: true,
    },
  },
  DZ: {
    code: 12,
    alpha2Code: 'DZ',
    features: {
      mosques: true,
    },
  },
  Mexico: {
    code: 484,
    alpha2Code: 'MX',
    intl: {
      labelForProvince: 'State',
    },
  },
  Brazil: {
    code: 76,
    alpha2Code: 'BR',
    intl: {
      labelForProvince: 'State',
    },
  },
  Malaysia: {
    code: 458,
    alpha2Code: 'MY',
    intl: {
      labelForProvince: 'State',
    },
  },
  Venezuela: {
    code: 862,
    alpha2Code: 'VE',
    intl: {
      labelForProvince: 'State',
    },
  },
  Nigeria: {
    code: 566,
    alpha2Code: 'NG',
    intl: {
      labelForProvince: 'State',
    },
  },
  Sudan: {
    code: 729,
    alpha2Code: 'SD',
    intl: {
      labelForProvince: 'State',
    },
  },
  Singapore: {
    code: 702,
    alpha2Code: 'SG',
    intl: {
      labelForProvince: 'CDC',
    },
    features: {
      mosques: true,
    },
    prayerSettings: {
      calculation_method: 'muis',
    },
    calculationSettings: {
      calculationMethod: 'Singapore',
    },
  },
  BA: {
    code: 70,
    alpha2Code: 'BA',
    features: {
      mosques: true,
    },
  },
  EG: {
    code: 818,
    alpha2Code: 'EG',
    features: {
      mosques: true,
    },
  },
  AL: {
    code: 8,
    alpha2Code: 'AL',
    features: {
      mosques: true,
    },
  },
  NO: {
    code: 578,
    alpha2Code: 'NO',
    features: {
      mosques: true,
    },
  },
  JP: {
    code: 392,
    alpha2Code: 'JP',
    features: {
      mosques: true,
    },
  },
  MY: {
    code: 458,
    alpha2Code: 'MY',
    features: {
      mosques: true,
    },
  },
};

export default prayersConfigs;
