import { DateTime } from 'luxon';
import { calculatePrayerTimes } from './calculation-methods';
import { CalculationSettings, legacyToNewKeyMap } from './types';

type KnownKeys = 'manchester' | 'makkah' | 'dubai' | 'turkey';
type testPrams = {
  [key in KnownKeys]: CalculationSettings;
};

describe('calculatePrayerTimes', () => {
  const preset: testPrams = {
    manchester: {
      location: {
        latitude: 53.521139,
        longitude: -2.260936,
      },
      timezone: 'Europe/London',
      calculationMethod: 'MoonsightingCommittee',
      asrCalculation: 'Hanafi',
      highLatitudeRule: 'middleofthenight',
      shafaq: 'general',
      midnightMethod: 'SunsetToSunrise',
    },
    makkah: {
      location: {
        latitude: 21.427009,
        longitude: 39.828685,
      },
      timezone: 'Asia/Riyadh',
      calculationMethod: 'UmmAlQura',
      asrCalculation: 'Standard',
      midnightMethod: 'SunsetToSunrise',
      highLatitudeRule: 'middleofthenight',
    },
    dubai: {
      location: {
        latitude: 25.263056,
        longitude: 55.297222,
      },
      timezone: 'Asia/Dubai',
      calculationMethod: 'Dubai',
      asrCalculation: 'Standard',
      highLatitudeRule: 'middleofthenight',
      midnightMethod: 'SunsetToSunrise',
    },
    turkey: {
      location: {
        latitude: 39.916507,
        longitude: 32.860676,
      },
      timezone: 'Europe/Istanbul',
      calculationMethod: 'Turkey',
      asrCalculation: 'Standard',
      highLatitudeRule: 'middleofthenight',
      midnightMethod: 'SunsetToSunrise',
    },
  };

  it('should calculate Manchester prayer times using MoonsightingCommittee', () => {
    const city = preset.manchester;
    const date = DateTime.fromObject({ day: 10, month: 8, year: 2023 }).setZone(
      city.timezone
    );

    const settings: CalculationSettings = {
      location: city.location,
      calculationMethod: city.calculationMethod,
      asrCalculation: city.asrCalculation,
      midnightMethod: city.midnightMethod,
      highLatitudeRule: city.highLatitudeRule,
      shafaq: city.shafaq,
    };

    const result = calculatePrayerTimes(date, settings);
    const formated = result?.format({
      use24HourFormat: false,
    });

    expect(result?.dateTime.zoneName).toEqual(city.timezone);
    expect(result?.dateTime).toEqual(date);

    expect(formated).toMatchSnapshot();
  });

  it('should calculate Makkah prayer times using UmmAlQura', () => {
    const city = preset.makkah;
    const date = DateTime.fromObject({ day: 10, month: 8, year: 2023 }).setZone(
      city.timezone
    );

    const settings: CalculationSettings = {
      location: city.location,
      calculationMethod: city.calculationMethod,
      asrCalculation: city.asrCalculation,
      midnightMethod: city.midnightMethod,
      shafaq: city.shafaq,
    };

    const result = calculatePrayerTimes(date, settings);
    const formated = result?.format({
      use24HourFormat: false,
      timezone: city.timezone,
    });

    expect(result?.dateTime.zoneName).toEqual(city.timezone);
    expect(result?.dateTime).toEqual(date);

    // Time is off by +1
    expect(formated).toMatchSnapshot();
  });

  it('should calculate Dubai prayer times using Dubai', () => {
    const city = preset.dubai;
    const date = DateTime.fromObject({ day: 10, month: 8, year: 2023 }).setZone(
      city.timezone
    );

    const settings: CalculationSettings = {
      location: city.location,
      calculationMethod: city.calculationMethod,
      asrCalculation: city.asrCalculation,
      midnightMethod: city.midnightMethod,
      shafaq: city.shafaq,
    };

    const result = calculatePrayerTimes(date, settings);
    const formated = result?.format({
      use24HourFormat: false,
      timezone: city.timezone,
    });

    expect(result?.dateTime.zoneName).toEqual(city.timezone);
    expect(result?.dateTime).toEqual(date);

    // Time is off by +3
    expect(formated).toMatchSnapshot();
  });

  it('should calculate Turkey prayer times using Turkey', () => {
    const city = preset.turkey;
    const date = DateTime.fromObject({
      day: 10,
      month: 8,
      year: 2023,
    }).setZone(city.timezone);

    const settings: CalculationSettings = {
      location: city.location,
      calculationMethod: city.calculationMethod,
      asrCalculation: city.asrCalculation,
      midnightMethod: city.midnightMethod,
    };

    const result = calculatePrayerTimes(date, settings);
    const formated = result?.format({
      use24HourFormat: false,
      timezone: city.timezone,
    });

    expect(result?.dateTime.zoneName).toEqual(city.timezone);
    expect(result?.dateTime).toEqual(date);

    expect(formated).toMatchSnapshot();
  });

  it('should calculate Turkey prayer times using legacy key', () => {
    const city = preset.turkey;
    const date = DateTime.fromObject({
      day: 10,
      month: 8,
      year: 2023,
    }).setZone(city.timezone);

    const settings: CalculationSettings = {
      location: city.location,
      calculationMethod: city.calculationMethod,
      asrCalculation: city.asrCalculation,
      midnightMethod: city.midnightMethod,
    };

    const legacySettings: CalculationSettings = {
      location: city.location,
      calculationMethod: 'turkey-presidency-of-religious-affairs',
      asrCalculation: city.asrCalculation,
      midnightMethod: city.midnightMethod,
    };

    const result1 = calculatePrayerTimes(date, settings);
    const formated = result1?.format({
      use24HourFormat: false,
      timezone: city.timezone,
    });
    const result2 = calculatePrayerTimes(date, legacySettings);
    const formated2 = result2?.format({
      use24HourFormat: false,
      timezone: city.timezone,
    });

    expect(formated).toEqual(formated2);
  });
});

describe('legacyToNewKeyMap', () => {
  it('correctly maps ISNA to IslamicSocietyOfNorthAmerica', () => {
    expect(legacyToNewKeyMap['ISNA']).toBe('IslamicSocietyOfNorthAmerica');
  });

  it('correctly maps MWL to MuslimWorldLeague', () => {
    expect(legacyToNewKeyMap['MWL']).toBe('MuslimWorldLeague');
  });

  it('correctly maps Makkah to UmmAlQura', () => {
    expect(legacyToNewKeyMap['Makkah']).toBe('UmmAlQura');
  });

  it('correctly maps turkey-presidency-of-religious-affairs to Turkey', () => {
    expect(legacyToNewKeyMap['turkey-presidency-of-religious-affairs']).toBe(
      'Turkey'
    );
  });

  it('correctly maps union-des-organisations-islamiques-de-france to France', () => {
    expect(
      legacyToNewKeyMap['union-des-organisations-islamiques-de-france']
    ).toBe('France');
  });

  it('correctly maps france-15-degree to France15', () => {
    expect(legacyToNewKeyMap['france-15-degree']).toBe('France15');
  });

  it('correctly maps france-18-degree to France18', () => {
    expect(legacyToNewKeyMap['france-18-degree']).toBe('France18');
  });

  it('correctly maps russia to Russia', () => {
    expect(legacyToNewKeyMap['russia']).toBe('Russia');
  });

  it('correctly maps gaiae to Gulf', () => {
    expect(legacyToNewKeyMap['gaiae']).toBe('Gulf');
  });

  it('correctly maps muis to Singapore', () => {
    expect(legacyToNewKeyMap['muis']).toBe('Singapore');
  });

  // Add more tests for each key as necessary
});
