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

export function isEidInDay(date: DateTime, proximityDays: number = 0): boolean {
  const targetDate = date.plus({ days: proximityDays });
  const islamicDate = getHijriDate(targetDate);

  // Check for Eid al-Fitr (1st day of Shawwal) and the range around it
  if (
    islamicDate.month === 10 &&
    islamicDate.day >= 1 - proximityDays &&
    islamicDate.day <= 1 + proximityDays
  ) {
    return true;
  }

  // Check for Eid al-Adha (10th day of Dhu al-Hijjah) and the range around it
  if (
    islamicDate.month === 12 &&
    islamicDate.day >= 10 - proximityDays &&
    islamicDate.day <= 10 + proximityDays
  ) {
    return true;
  }

  return false;
}

export function getHijriMonth(
  date: DateTime,
  format: MonthFormat
): string | number {
  const islamicDate = getHijriDate(date);
  return format === MonthFormat.NAME
    ? islamicDate.monthName
    : islamicDate.month;
}

interface IslamicDate {
  year: number;
  month: number;
  monthName: string;
  day: number;
}

function getHijriDate(date: DateTime): IslamicDate {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const intlFormat = new Intl.DateTimeFormat(
    'en-u-ca-islamic-nu-latn',
    options
  );
  const parts = intlFormat.formatToParts(date.toJSDate());

  // Extract the year, month, and day from the formatted parts
  const year = parseInt(
    parts.find((part) => part.type === 'year')?.value || '0'
  );
  const monthName = parts.find((part) => part.type === 'month')?.value || '';
  const month = mapMonthNameToNumber(monthName);
  const day = parseInt(parts.find((part) => part.type === 'day')?.value || '0');

  return { year, month, monthName, day };
}

function mapMonthNameToNumber(monthName: string): number {
  const monthMapping: { [key: string]: number } = {
    Muharram: 1,
    Safar: 2,
    'Rabiʻ I': 3,
    'Rabiʻ II': 4,
    'Jumada I': 5,
    'Jumada II': 6,
    Rajab: 7,
    Shaʻban: 8,
    Ramadan: 9,
    Shawwal: 10,
    'Dhuʻl-Qiʻdah': 11,
    'Dhuʻl-Hijjah': 12,
  };

  return monthMapping[monthName] || 0;
}
