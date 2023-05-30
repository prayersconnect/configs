/**
 * the collection copied this from api project and just converted from yaml to json using https://jsonformatter.org/yaml-to-json
 */

export interface CalculationMethod {
  name: string;
  label: string;
  values: {
    fajr?: number;
    isha?: number;
    maghrib?: number;
    midnight?: string;
  };
}

export default [
  {
    name: 'ISNA',
    label: 'Islamic Society of North America (ISNA)',
    values: {
      fajr: 15,
      isha: 15,
    },
  },
  {
    name: 'MWL',
    label: 'Muslim World League',
    values: {
      fajr: 18,
      isha: 17,
    },
  },
  {
    name: 'turkey-presidency-of-religious-affairs',
    label: 'Presidency of Religious Affairs, Türkiye',
    values: {
      fajr: 18,
      isha: 17,
    },
  },
  {
    name: 'Karachi',
    label: 'University of Islamic Sciences, Karachi',
    values: {
      fajr: 18,
      isha: 18,
    },
  },
  {
    name: 'Makkah',
    label: 'Umm Al-Qura University, Makkah',
    values: {
      fajr: 18.5,
      isha: '90min',
    },
  },
  {
    name: 'Egypt',
    label: 'Egyptian General Authority of Survey',
    values: {
      fajr: 19.5,
      isha: 17.5,
    },
  },
  {
    name: 'Tehran',
    label: 'Institute of Geophysics, University of Tehran',
    values: {
      fajr: 17.7,
      isha: 14,
      maghrib: 4.5,
      midnight: 'Jafari',
    },
  },
  {
    name: 'Jafari',
    label: 'Shia Ithna-Ashari, Leva Institute, Qum',
    values: {
      fajr: 16,
      isha: 14,
      maghrib: 4,
      midnight: 'Jafari',
    },
  },
  {
    name: 'union-des-organisations-islamiques-de-france',
    label: 'Union des Organisations Islamiques de France',
    values: {
      fajr: 12,
      isha: 12,
    },
  },
  {
    name: 'france-15-degree',
    label: 'France 15 degree',
    values: {
      fajr: 15,
      isha: 15,
    },
  },
  {
    name: 'france-18-degree',
    label: 'France 18 degree',
    values: {
      fajr: 18,
      isha: 18,
    },
  },
  {
    name: 'russia',
    label: 'The Central Spiritual Administration of Muslims of Russia',
    values: {
      fajr: 16,
      isha: 15,
    },
  },
  {
    name: 'gaiae',
    label: 'General Authority of Islamic Affairs and Endowments (GAIAE) of UAE',
    values: {
      fajr: 18,
      isha: 17.5,
    },
  },
  {
    name: 'london-unified',
    label: 'London Unified Prayer Times',
    values: {
      fajr: 13.5,
      isha: 9.5,
    },
  },
] as CalculationMethod[];
