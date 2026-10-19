import { getDSTEnd, getDSTStart } from '.';
import { DateTime } from 'luxon';

const formatString = 'yyyy-MM-dd';

function parseDateInZone(date: string, timezone: string | null): DateTime {
  if (timezone == null) {
    throw new Error('Invalid Time Zone');
  }

  return DateTime.fromISO(date, { zone: timezone }).set({ hour: 3 });
}

function periodLabel(prefix: string, from: DateTime, to: DateTime): string {
  return `${prefix} ${from.monthShort}, ${from.year} - ${to.monthShort}, ${to.year}`;
}

function getDSTRanges(dstStart: DateTime, dstEnd: DateTime, country: string) {
  const ranges = [];

  if (dstStart.year === dstEnd.year) {
    ranges.push([
      `DST Period ${dstStart.year}`,
      dstStart.toFormat(formatString),
      dstEnd.toFormat(formatString),
    ]);
  } else {
    const prevYearDstEndString = getDSTEnd(country, dstStart.year - 1);
    const prevYearDstStartString = getDSTStart(country, dstStart.year - 1);

    if (prevYearDstEndString && prevYearDstStartString) {
      const prevYearDstEnd = parseDateInZone(
        prevYearDstEndString,
        dstEnd.zoneName
      );
      const prevYearDstStart = parseDateInZone(
        prevYearDstStartString,
        dstStart.zoneName
      );

      ranges.push([
        periodLabel('DST Period', prevYearDstStart, prevYearDstEnd),
        prevYearDstStart.toFormat(formatString),
        prevYearDstEnd.toFormat(formatString),
      ]);
    }

    ranges.push([
      periodLabel('DST Period', dstStart, dstEnd),
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
    const prevYearDSTEndString = getDSTEnd(country, dstStart.year - 1);
    const nextYearDSTStartString = getDSTStart(country, dstStart.year + 1);

    if (prevYearDSTEndString) {
      const prevYearDSTEndDate = parseDateInZone(
        prevYearDSTEndString,
        dstEnd.zoneName
      );
      // The Non-DST period starts the day after DST ends. Derive the label
      // from that start date so the month stays correct when the transition
      // lands on the 1st of a month (e.g. Nov 1, 2026).
      const nonDstStart = prevYearDSTEndDate.plus({ day: 1 });

      ranges.push([
        periodLabel('Non-DST Period', nonDstStart, dstStart),
        nonDstStart.toFormat(formatString),
        dstStart.minus({ day: 1 }).toFormat(formatString),
      ]);
    }

    if (nextYearDSTStartString) {
      const nextYearDSTStartDate = parseDateInZone(
        nextYearDSTStartString,
        dstEnd.zoneName
      );
      const nonDstStart = dstEnd.plus({ day: 1 });

      ranges.push([
        periodLabel('Non-DST Period', nonDstStart, nextYearDSTStartDate),
        nonDstStart.toFormat(formatString),
        nextYearDSTStartDate.minus({ day: 1 }).toFormat(formatString),
      ]);
    }
  } else {
    const prevYearDSTEndDate = getDSTEnd(country, dstStart.year - 1) as string;
    if (prevYearDSTEndDate) {
      const prevYearDstEnd = parseDateInZone(
        prevYearDSTEndDate,
        dstStart.zoneName
      );

      ranges.push([
        periodLabel('Non-DST Period', prevYearDstEnd, dstStart),
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
  const dstStartString = getDSTStart(country, today.year);
  const dstEndString = getDSTEnd(country, today.year);

  if (!dstStartString || !dstEndString) {
    return [];
  }

  const dstStart = parseDateInZone(dstStartString, timezone);
  const dstEnd = parseDateInZone(dstEndString, timezone);

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
