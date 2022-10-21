import { getDSTEnd, getDSTStart } from '.';
import { DateTime } from 'luxon';

const formatString = 'yyyy-MM-dd';

function parseDateInZone(date: Date, timezone: string): DateTime {
  date.setHours(3, 0, 0, 0);
  return DateTime.fromJSDate(date).setZone(timezone, { keepLocalTime: true });
}

function getDSTRanges(dstStart: DateTime, dstEnd: DateTime, country: string) {
  let ranges = [];
  if (dstStart.year === dstEnd.year) {
    ranges.push([
      `DST Period ${dstStart.year}`,
      `${dstStart.toFormat(formatString)}`,
      `${dstEnd.toFormat(formatString)}`,
    ]);
  } else {
    const prevYearDstEnd = parseDateInZone(
      getDSTEnd(country, dstStart.year - 1) as Date,
      dstEnd.zoneName
    ); //@todo fix when getDSTEnd returns null

    const prevYearDstStart = parseDateInZone(
      getDSTStart(country, dstStart.year - 1) as Date,
      dstStart.zoneName
    ); //@todo fix when getDSTEnd returns null

    ranges.push([
      `DST Period ${prevYearDstStart.monthShort}, ${prevYearDstStart.year} - ${prevYearDstEnd.monthShort}, ${prevYearDstEnd.year}`,
      prevYearDstStart.toFormat(formatString),
      prevYearDstEnd.toFormat(formatString),
    ]);

    ranges.push([
      `DST Period ${dstStart.monthShort}, ${dstStart.year} - ${dstEnd.monthShort}, ${dstEnd.year}`,
      dstStart.toFormat(formatString),
      dstEnd.toFormat(formatString),
    ]);
  }

  return ranges;
}

function getNonDSTRanges(
  dstStart: DateTime,
  dstEnd: DateTime,
  country: string
) {
  const prevYearDSTEndDate = getDSTEnd(country, dstStart.year - 1) as Date;

  const ranges = [];
  if (dstStart.year === dstEnd.year) {
    ranges.push([
      `Non-DST Period ${dstStart.startOf('year').monthShort}, ${
        dstStart.year
      } - ${dstStart.monthShort}, ${dstStart.year}`,
      dstStart.startOf('year').toFormat(formatString),
      dstStart.toFormat(formatString),
    ]);

    ranges.push([
      `Non-DST Period ${dstEnd.monthShort}, ${dstStart.year} - ${
        dstEnd.endOf('year').monthShort
      }, ${dstStart.year}`,
      dstEnd.toFormat(formatString),
      dstEnd.endOf('year').toFormat(formatString),
    ]);
  } else {
    if (prevYearDSTEndDate) {
      const prevYearDstEnd = parseDateInZone(
        prevYearDSTEndDate,
        dstStart.zoneName
      );

      ranges.push([
        `Non-DST Period ${prevYearDstEnd.monthShort}, ${prevYearDstEnd.year} - ${dstStart.monthShort}, ${dstStart.year}`,
        prevYearDstEnd.toFormat(formatString),
        dstStart.toFormat(formatString),
      ]);
    }
  }
  return ranges;
}

export function getRangesForYear(
  year: number,
  country: string,
  timezone: string
) {
  const today = parseDateInZone(DateTime.local().toJSDate(), timezone).set({
    year,
  });
  const dstStart = parseDateInZone(
    getDSTStart(country, today.year) as Date,
    timezone
  );

  console.log(
    'dstStart',
    getDSTStart(country, today.year),
    dstStart.toISODate()
  );
  const dstEnd = parseDateInZone(
    getDSTEnd(country, today.year) as Date,
    timezone
  );

  let ranges = [
    [
      `Year ${dstStart.year}`,
      `${dstStart.startOf('year').toFormat(formatString)}`,
      `${dstStart.endOf('year').toFormat(formatString)}`,
    ],
  ];

  return ranges
    .concat(getDSTRanges(dstStart, dstEnd, country))
    .concat(getNonDSTRanges(dstStart, dstEnd, country));
}

export function getQuickSelectorRanges(country: string, timezone: string) {
  const today = DateTime.local().setZone(timezone);

  let ranges = [['------------Select a Range------------', '']];
  ranges = ranges.concat(getRangesForYear(today.year, country, timezone));
  ranges = ranges.concat([['------------', '']]);
  ranges = ranges.concat(getRangesForYear(today.year + 1, country, timezone));
  return ranges;
}
