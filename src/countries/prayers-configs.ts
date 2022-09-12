// for country code, visit https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes and get the corresponding numeric code for the country
// value for calculation_method must match values defined in calculation-method.yml

interface prayerSettings {
  calculation_method?: string;
  asr_method?: 'Hanafi' | 'Standard';
}

interface mosqueSettings {
  denomination: string;
  language_services: string;
}

export interface countryConfig {
  code: number | null;
  prayer_settings: prayerSettings;
  mosque?: mosqueSettings;
}

interface allConfigs {
  [key: string]: countryConfig;
}

export const defaultConfig = {
  'code': '',
  'prayer_settings': {
    'asr_method': 'Standard',
    'calculation_method': 'MWL',
  } as prayerSettings,
  'mosque': {
    'denomination': 'sunni',
    'language_services': 'english',
  },
};

const prayersConfigs: allConfigs = {
  'united_states': {
    'code': null,
    'prayer_settings': {
      'calculation_method': 'ISNA',
    },
    'mosque': {
      'language_services': 'english',
      'denomination': 'sunni',
    },
  },
  'canada': {
    'code': 124,
    'prayer_settings': {
      'calculation_method': 'ISNA',
    },
  },
  'bangladesh': {
    'code': 50,
    'prayer_settings': {
      'asr_method': 'Hanafi',
      'calculation_method': 'Karachi',
    },
    'mosque': {
      'language_services': 'bangla',
      'denomination': 'sunni',
    },
  },
  'turkey': {
    'code': 792,
    'prayer_settings': {
      'calculation_method': 'turkey-presidency-of-religious-affairs',
    },
    'mosque': {
      'language_services': 'Türkçe',
      'denomination': 'sunni',
    },
  },
  'united_kingdom': {
    'code': 840,
    'prayer_settings': {
      'calculation_method': 'MWL',
    },
    'mosque': {
      'language_services': 'english',
      'denomination': 'sunni',
    },
  },
  'australia': {
    'code': 36,
    'prayer_settings': {
      'asr_method': 'Hanafi',
    },
  },
};

export default prayersConfigs;