import { DateTime } from 'luxon';
import { calculatePrayerTimes } from './calculation-methods';
import { CalculationSettings } from './types';

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
      asrCalculation: 'hanafi',
      highLatitudeRule: 'middleofthenight',
      shafaq: 'general',
      midnightMethod: 'Standard',
    },
    makkah: {
      location: {
        latitude: 21.427009,
        longitude: 39.828685,
      },
      timezone: 'Asia/Riyadh',
      calculationMethod: 'UmmAlQura',
      asrCalculation: 'shafi',
      midnightMethod: 'Standard',
      highLatitudeRule: 'middleofthenight',
    },
    dubai: {
      location: {
        latitude: 25.263056,
        longitude: 55.297222,
      },
      timezone: 'Asia/Dubai',
      calculationMethod: 'Dubai',
      asrCalculation: 'shafi',
      highLatitudeRule: 'middleofthenight',
      midnightMethod: 'Standard',
    },
    turkey: {
      location: {
        latitude: 39.916507,
        longitude: 32.860676,
      },
      timezone: 'Europe/Istanbul',
      calculationMethod: 'Turkey',
      asrCalculation: 'shafi',
      highLatitudeRule: 'middleofthenight',
      midnightMethod: 'Standard',
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
      timezone: city.timezone,
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
});
