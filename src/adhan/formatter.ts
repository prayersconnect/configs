import { IAdhanCalculated } from './types';

export function formatAdhanTimes(
  adhanTimes: IAdhanCalculated,
  format: string = '12h'
) {
  const isISO = (format || '').match(/iso/i);
  const formatString = format === '12h' ? 'h:mm a' : 'HH:mm';

  const sunset = adhanTimes.maghrib.minus({ minute: 1 });
  return {
    fajr: isISO
      ? adhanTimes.fajr.toISO()
      : adhanTimes.fajr.toFormat(formatString),
    sunrise: isISO
      ? adhanTimes.sunrise.toISO()
      : adhanTimes.sunrise.toFormat(formatString),
    dhuhr: isISO
      ? adhanTimes.dhuhr.toISO()
      : adhanTimes.dhuhr.toFormat(formatString),
    asr: isISO ? adhanTimes.asr.toISO() : adhanTimes.asr.toFormat(formatString),
    sunset: isISO ? sunset.toISO() : sunset.toFormat(formatString),
    maghrib: isISO
      ? adhanTimes.maghrib.toISO()
      : adhanTimes.maghrib.toFormat(formatString),
    isha: isISO
      ? adhanTimes.isha.toISO()
      : adhanTimes.isha.toFormat(formatString),
  };
}
