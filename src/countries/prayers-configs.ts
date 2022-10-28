// for country code, visit https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes and get the corresponding numeric code for the country
// value for calculation_method must match values defined in calculation-method.yml

import {
  ICountryConfigValues,
  ICountryFeatures,
  IPrayerSettings,
} from './types';

interface allConfigs {
  [key: string]: string | ICountryConfigValues;
}

export const defaultConfig = {
  code: null,
  alpha2_code: '',
  prayer_settings: {
    asr_method: 'Standard',
    calculation_method: 'MWL',
  } as IPrayerSettings,
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
};

const prayersConfigs: allConfigs = {
  united_states: {
    code: 840,
    alpha2Code: 'US',
    prayer_settings: {
      calculation_method: 'ISNA',
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
  },
  canada: {
    code: 124,
    alpha2Code: 'CA',
    prayer_settings: {
      calculation_method: 'ISNA',
    },
    features: {
      mosques: true,
      iqamahTimes: true,
      events: true,
    },
  },
  bangladesh: {
    code: 50,
    alpha2Code: 'BD',
    prayer_settings: {
      asr_method: 'Hanafi',
      calculation_method: 'Karachi',
    },
    mosque: {
      language_services: 'bangla',
      denomination: 'sunni',
    },
  },
  turkiye: {
    code: 792,
    alpha2Code: 'TR',
    prayer_settings: {
      calculation_method: 'turkey-presidency-of-religious-affairs',
    },
    mosque: {
      language_services: 'Türkçe',
      denomination: 'sunni',
    },
  },
  turkey: 'turkiye',
  united_kingdom: {
    code: 826,
    alpha2Code: 'GB',
    prayer_settings: {
      calculation_method: 'MWL',
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
  australia: {
    code: 36,
    alpha2Code: 'AU',
    prayer_settings: {
      asr_method: 'Hanafi',
    },
    features: {
      mosques: true,
    },
  },
  new_zealand: {
    code: 554,
    alpha2Code: 'NZ',
    prayer_settings: {
      asr_method: 'Hanafi',
    },
    mosque: {
      language_services: 'english',
      denomination: 'sunni',
    },
  },
  india: {
    code: 356,
    alpha2Code: 'IN',
    prayer_settings: {
      calculation_method: 'Karachi',
      asr_method: 'Hanafi',
    },
    mosque: {
      language_services: 'hindi',
      denomination: 'sunni',
    },
  },
  pakistan: {
    code: 586,
    alpha2Code: 'PK',
    prayer_settings: {
      calculation_method: 'Karachi',
      asr_method: 'Hanafi',
    },
    mosque: {
      language_services: 'urdu',
      denomination: 'sunni',
    },
  },
  france: {
    code: 250,
    alpha2Code: 'FR',
    prayer_settings: {
      calculation_method: 'union-des-organisations-islamiques-de-france',
    },
  },
  egypt: {
    code: 818,
    alpha2Code: 'EG',
    prayer_settings: {
      calculation_method: 'Egypt',
    },
  },
  saudi_arabia: {
    code: 682,
    alpha2Code: 'SA',
    prayer_settings: {
      calculation_method: 'Makkah',
    },
  },
  united_arab_emirates: {
    code: 784,
    prayer_settings: {
      calculation_method: 'Karachi',
    },
  },
};

export default prayersConfigs;
