import { getDSTEnd, getDSTStart } from '.';
import { DateTime } from 'luxon';

const formatString = 'yyyy-MM-dd';

function parseDateInZone(date: string, timezone: string | null): DateTime {
  if (timezone == null) {
    throw new Error('Invalid Time Zone');
  }

  return DateTime.fromISO(date, { zone: timezone }).set({ hour: 3 });
}

function getDSTRanges(dstStart: DateTime, dstEnd: DateTime, country: string) {
  const ranges = [];
  if (dstStart.year === dstEnd.year) {
    ranges.push([
      `DST Period ${dstStart.year}`,
      `${dstStart.toFormat(formatString)}`,
      `${dstEnd.toFormat(formatString)}`,
    ]);
  } else {
    const prevYearDstEnd = parseDateInZone(
      getDSTEnd(country, dstStart.year - 1) as string,
      dstEnd.zoneName
    ); //@todo fix when getDSTEnd returns null

    const prevYearDstStart = parseDateInZone(
      getDSTStart(country, dstStart.year - 1) as string,
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
  const ranges = [];
  if (dstStart.year === dstEnd.year) {
    const prevYearDSTEndDate = parseDateInZone(
      getDSTEnd(country, dstStart.year - 1) as string,
      dstEnd.zoneName
    );
    const nextYearDSTStartDate = parseDateInZone(
      getDSTStart(country, dstStart.year + 1) as string,
      dstEnd.zoneName
    );

    ranges.push([
      `Non-DST Period ${prevYearDSTEndDate.monthShort}, 
      ${prevYearDSTEndDate.year} - ${dstStart.monthShort}, ${dstStart.year}`,
      prevYearDSTEndDate.plus({ day: 1 }).toFormat(formatString),
      dstStart.minus({ day: 1 }).toFormat(formatString),
    ]);

    ranges.push([
      `Non-DST Period ${dstEnd.monthShort}, ${dstStart.year} - ${nextYearDSTStartDate.monthShort}, ${nextYearDSTStartDate.year}`,
      dstEnd.plus({ day: 1 }).toFormat(formatString),
      nextYearDSTStartDate.minus({ day: 1 }).toFormat(formatString),
    ]);
  } else {
    const prevYearDSTEndDate = getDSTEnd(country, dstStart.year - 1) as string;
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
  const isoDate = DateTime.local().toISODate() as string;

  const today = parseDateInZone(isoDate, timezone).set({
    year,
  });
  const dstStart = parseDateInZone(
    getDSTStart(country, today.year) as string,
    timezone
  );

  const dstEnd = parseDateInZone(
    getDSTEnd(country, today.year) as string,
    timezone
  );

  const ranges = [
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
