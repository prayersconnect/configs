import { PrayerTimes } from 'adhan';
import { DateTime } from 'luxon';

export function formatAdhanTimes(
  adhanTimes: PrayerTimes,
  format: string = '12h'
) {
  const isISO = (format || '').match(/iso/i);
  const formatString = format === '12h' ? 'h:mm a' : 'HH:mm';

  const sunset = DateTime.fromJSDate(adhanTimes.maghrib).minus({ minute: 1 });
  return {
    fajr: isISO
      ? DateTime.fromJSDate(adhanTimes.fajr).toISO()
      : DateTime.fromJSDate(adhanTimes.fajr).toFormat(formatString),
    sunrise: isISO
      ? DateTime.fromJSDate(adhanTimes.sunrise).toISO()
      : DateTime.fromJSDate(adhanTimes.sunrise).toFormat(formatString),
    dhuhr: isISO
      ? DateTime.fromJSDate(adhanTimes.dhuhr).toISO()
      : DateTime.fromJSDate(adhanTimes.dhuhr).toFormat(formatString),
    asr: isISO
      ? DateTime.fromJSDate(adhanTimes.asr).toISO()
      : DateTime.fromJSDate(adhanTimes.asr).toFormat(formatString),
    sunset: isISO ? sunset.toISO() : sunset.toFormat(formatString),
    maghrib: isISO
      ? DateTime.fromJSDate(adhanTimes.maghrib).toISO()
      : DateTime.fromJSDate(adhanTimes.maghrib).toFormat(formatString),
    isha: isISO
      ? DateTime.fromJSDate(adhanTimes.isha).toISO()
      : DateTime.fromJSDate(adhanTimes.isha).toFormat(formatString),
  };
}
