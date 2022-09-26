// for country code, visit https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes and get the corresponding numeric code for the country
// value for calculation_method must match values defined in calculation-method.yml

import { ICountryConfigValues, IPrayerSettings } from './types';

interface allConfigs {
  [key: string]: string | ICountryConfigValues;
}

export const defaultConfig = {
  code: '',
  prayer_settings: {
    asr_method: 'Standard',
    calculation_method: 'MWL',
  } as IPrayerSettings,
  mosque: {
    denomination: 'sunni',
    language_services: 'english',
  },
};

const prayersConfigs: allConfigs = {
  united_states: {
    code: null,
    prayer_settings: {
      calculation_method: 'ISNA',
    },
    mosque: {
      language_services: 'english',
      denomination: 'sunni',
    },
  },
  canada: {
    code: 124,
    prayer_settings: {
      calculation_method: 'ISNA',
    },
  },
  bangladesh: {
    code: 50,
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
    //make sure values turkey and turkiye are the same
    code: 792,
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
    code: 840,
    prayer_settings: {
      calculation_method: 'MWL',
    },
    mosque: {
      language_services: 'english',
      denomination: 'sunni',
    },
  },
  australia: {
    code: 36,
    prayer_settings: {
      asr_method: 'Hanafi',
    },
  },
  new_zealand: {
    code: 554,
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
    prayer_settings: {
      calculation_method: 'union-des-organisations-islamiques-de-france',
    },
  },
};

export default prayersConfigs;
