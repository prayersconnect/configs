import { DateTime, Settings } from 'luxon';
import { calculateAdhan } from './calculate';
import { formatAdhanTimes } from './formatter';
import { ICoords } from './types';

describe('calculateAdhan', () => {
  let method: string,
    asrMethod: string,
    coords: ICoords,
    date: DateTime,
    format: string;
  beforeEach(() => {
    Settings.defaultZone = 'America/New_York';
    method = 'ISNA';
    asrMethod = 'Standard';
    coords = { latitude: 40.7128, longitude: -74.006 };
    date = DateTime.local(2022, 1, 1);

    format = '12h';
  });

  it('returns calculated prayer times in correct format', () => {
    const prayerTimes = calculateAdhan(date, coords, method, asrMethod);
    expect(prayerTimes.fajr).toBeInstanceOf(DateTime);
    expect(prayerTimes.dhuhr).toBeInstanceOf(DateTime);
    expect(prayerTimes.asr).toBeInstanceOf(DateTime);
    expect(prayerTimes.maghrib).toBeInstanceOf(DateTime);
    expect(prayerTimes.isha).toBeInstanceOf(DateTime);
    expect(prayerTimes.sunrise).toBeInstanceOf(DateTime);
    expect(prayerTimes.sunset).toBeInstanceOf(DateTime);
  });

  it('output timezone matches input timezone', () => {
    const prayerTimes = calculateAdhan(date, coords, method, asrMethod);
    expect(prayerTimes.fajr.zoneName).toEqual(date.zoneName);
    expect(prayerTimes.dhuhr.zoneName).toEqual(date.zoneName);
    expect(prayerTimes.asr.zoneName).toEqual(date.zoneName);
    expect(prayerTimes.maghrib.zoneName).toEqual(date.zoneName);
    expect(prayerTimes.isha.zoneName).toEqual(date.zoneName);
    expect(prayerTimes.sunrise.zoneName).toEqual(date.zoneName);
    expect(prayerTimes.sunset.zoneName).toEqual(date.zoneName);
  });

  it('output timezone matches input timezone (BDT)', () => {
    const date = DateTime.fromISO('2023-07-07T06:33:45.244+06:00').setZone(
      'Asia/Dhaka'
    );
    const prayerTimes = calculateAdhan(date, coords, method, asrMethod);
    expect(prayerTimes.fajr.zoneName).toEqual(date.zoneName);
    expect(prayerTimes.dhuhr.zoneName).toEqual(date.zoneName);
    expect(prayerTimes.asr.zoneName).toEqual(date.zoneName);
    expect(prayerTimes.maghrib.zoneName).toEqual(date.zoneName);
    expect(prayerTimes.isha.zoneName).toEqual(date.zoneName);
    expect(prayerTimes.sunrise.zoneName).toEqual(date.zoneName);
    expect(prayerTimes.sunset.zoneName).toEqual(date.zoneName);
  });

  it('output offset matches input offset', () => {
    const prayerTimes = calculateAdhan(date, coords, method, asrMethod);
    expect(prayerTimes.fajr.offset).toEqual(date.offset);
    expect(prayerTimes.dhuhr.offset).toEqual(date.offset);
    expect(prayerTimes.asr.offset).toEqual(date.offset);
    expect(prayerTimes.maghrib.offset).toEqual(date.offset);
    expect(prayerTimes.isha.offset).toEqual(date.offset);
    expect(prayerTimes.sunrise.offset).toEqual(date.offset);
    expect(prayerTimes.sunset.offset).toEqual(date.offset);
  });

  it('returns correct prayer times for ISNA method', () => {
    const prayerTimes = calculateAdhan(date, coords, method, asrMethod);
    expect(formatAdhanTimes(prayerTimes, format)).toEqual({
      asr: '2:22 PM',
      dhuhr: '12:01 PM',
      fajr: '5:58 AM',
      isha: '6:01 PM',
      maghrib: '4:40 PM',
      sunrise: '7:20 AM',
      sunset: '4:39 PM',
    });
  });
  it('returns correct prayer times for ISNA method during EST Daylight Savings Time', () => {
    const date = DateTime.local(2022, 6, 1);
    const prayerTimes = calculateAdhan(date, coords, method, asrMethod);
    expect(formatAdhanTimes(prayerTimes, format)).toEqual({
      asr: '4:53 PM',
      dhuhr: '12:55 PM',
      fajr: '3:51 AM',
      isha: '9:58 PM',
      maghrib: '8:22 PM',
      sunrise: '5:27 AM',
      sunset: '8:21 PM',
    });
  });

  it('returns correct prayer times for MWL method', () => {
    const coords = { latitude: 40.7128, longitude: -74.006 };
    const method = 'MWL';
    const asrMethod = 'Standard';
    const format = '12h';
    const prayerTimes = calculateAdhan(date, coords, method, asrMethod);
    expect(formatAdhanTimes(prayerTimes, format)).toEqual({
      asr: '2:22 PM',
      dhuhr: '12:01 PM',
      fajr: '5:42 AM',
      isha: '6:12 PM',
      maghrib: '4:40 PM',
      sunrise: '7:20 AM',
      sunset: '4:39 PM',
    });
  });

  it('returns correct prayer times for ISNA and Hanafi method', () => {
    const method = 'MWL';
    const asrMethod = 'Hanafi';
    const prayerTimes = formatAdhanTimes(
      calculateAdhan(date, coords, method, asrMethod),
      format
    );
    expect(prayerTimes.asr).toEqual('2:59 PM');
    expect(prayerTimes.fajr).toEqual('5:42 AM');
    expect(prayerTimes.isha).toEqual('6:12 PM');
  });

  it('returns correct prayer times in 24h format', () => {
    const coords = { latitude: 40.7128, longitude: -74.006 };
    const method = 'ISNA';
    const asrMethod = 'Standard';
    const format = '24h';
    const prayerTimes = calculateAdhan(date, coords, method, asrMethod);
    expect(formatAdhanTimes(prayerTimes, format)).toEqual({
      asr: '14:22',
      dhuhr: '12:01',
      fajr: '05:58',
      isha: '18:01',
      maghrib: '16:40',
      sunrise: '07:20',
      sunset: '16:39',
    });
  });

  it('returns correct time for custom method', () => {
    const date = DateTime.local(2022, 1, 14);
    const method = 'custom-1';
    const prayerTimes = calculateAdhan(date, coords, method, asrMethod, {
      calculation_method_meta: {
        fajr: 17.5,
        isha: 14,
      },
    });

    expect(formatAdhanTimes(prayerTimes, 'iso')).toMatchInlineSnapshot(`
      {
        "asr": "2022-01-14T14:34:00.000-05:00",
        "dhuhr": "2022-01-14T12:05:00.000-05:00",
        "fajr": "2022-01-14T05:44:00.000-05:00",
        "isha": "2022-01-14T18:07:00.000-05:00",
        "maghrib": "2022-01-14T16:53:00.000-05:00",
        "sunrise": "2022-01-14T07:18:00.000-05:00",
        "sunset": "2022-01-14T16:52:00.000-05:00",
      }
    `);
  });

  it('returns correct time for muis (singapore) method', () => {
    const date = DateTime.local(2023, 8, 11).setZone('Asia/Singapore');
    const prayerTimes = calculateAdhan(
      date,
      { latitude: 1.3553794, longitude: 103.8677444 },
      'muis',
      asrMethod
    );
    expect(formatAdhanTimes(prayerTimes, '24h')).toMatchInlineSnapshot(`
      {
        "asr": "16:31",
        "dhuhr": "13:11",
        "fajr": "05:46",
        "isha": "20:27",
        "maghrib": "19:16",
        "sunrise": "07:05",
        "sunset": "19:15",
      }
    `);
  });
});
