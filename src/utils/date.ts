import { DateTime } from 'luxon';

export function isRamadan(date: DateTime): boolean {
  return getHijriMonth(date) === 'Ramadan';
}

function getHijriMonth(date: DateTime): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const format = new Intl.DateTimeFormat('en-u-ca-islamic-nu-latn', options);
  const parts = format.formatToParts(date.toJSDate());

  // Extract the month from the formatted parts
  const monthPart = parts.find((part) => part.type === 'month');

  return monthPart ? monthPart.value : '';
}
