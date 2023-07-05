import { DateTime, Settings } from 'luxon';
import { calculateAdhan } from './calculate';
import { formatAdhanTimes } from './formatter';

describe('calculateAdhan', () => {
  beforeEach(() => {
    Settings.defaultZone = 'America/New_York';
  });
  it('returns correct prayer times for ISNA method', () => {
    const date = DateTime.local(2022, 1, 1);
    const coords = { latitude: 40.7128, longitude: -74.006 };
    const method = 'ISNA';
    const asrMethod = 'Standard';
    const format = '12h';
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
    const coords = { latitude: 40.7128, longitude: -74.006 };
    const method = 'ISNA';
    const asrMethod = 'Standard';
    const format = '12h';
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
    const date = DateTime.local(2022, 1, 1);
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
    const date = DateTime.local(2022, 1, 1);
    const coords = { latitude: 40.7128, longitude: -74.006 };
    const method = 'MWL';
    const asrMethod = 'Hanafi';
    const format = '12h';
    const prayerTimes = formatAdhanTimes(
      calculateAdhan(date, coords, method, asrMethod),
      format
    );
    expect(prayerTimes.asr).toEqual('2:59 PM');
    expect(prayerTimes.fajr).toEqual('5:42 AM');
    expect(prayerTimes.isha).toEqual('6:12 PM');
  });

  it('returns correct prayer times in 24h format', () => {
    const date = DateTime.local(2022, 1, 1);
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
    const coords = { latitude: 40.7128, longitude: -74.006 };
    const method = 'custom-1';
    const asrMethod = 'Standard';
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
});
