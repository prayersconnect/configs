import { DateTime } from 'luxon';

export enum MonthFormat {
  NAME,
  NUMBER,
}
export function isFriday(date: DateTime): boolean {
  return date.weekday === 5;
}

export function isRamadan(date: DateTime): boolean {
  return getHijriMonth(date, MonthFormat.NUMBER) === 9;
}

export function getHijriMonth(
  date: DateTime,
  format: MonthFormat
): string | number {
  // Determine the month format for Intl.DateTimeFormat
  const monthFormat = format === MonthFormat.NAME ? 'long' : 'numeric';

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: monthFormat,
    day: 'numeric',
  };

  const intlFormat = new Intl.DateTimeFormat(
    'en-u-ca-islamic-nu-latn',
    options
  );
  const parts = intlFormat.formatToParts(date.toJSDate());

  // Extract the month from the formatted parts
  const monthPart = parts.find((part) => part.type === 'month');

  if (monthPart) {
    return format === MonthFormat.NAME
      ? monthPart.value
      : parseInt(monthPart.value);
  }

  return '';
}
