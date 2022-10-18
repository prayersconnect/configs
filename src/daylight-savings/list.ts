interface DaylightSavingsRange {
  [key: number]: [
    Date, //start time of dst
    Date //end time of dst
  ];
}

interface DaylightSavingsRanges {
  [key: string]: DaylightSavingsRange;
}

const dstTransitionDates: DaylightSavingsRanges = {
  'United States': {
    2022: [new Date('2022-03-13'), new Date('2022-11-07')],
    2023: [new Date('2023-03-12'), new Date('2023-11-06')],
  },
  Canada: {
    2022: [new Date('2022-03-13'), new Date('2022-11-07')],
    2023: [new Date('2023-03-12'), new Date('2023-11-06')],
  },
  'United Kingdom': {
    2022: [new Date('2022-03-27'), new Date('2022-10-30')],
    2023: [new Date('2023-03-26'), new Date('2023-10-29')],
  },
  Australia: {
    2022: [new Date('2022-10-02'), new Date('2022-04-03')],
    2023: [new Date('2023-10-01'), new Date('2023-04-02')],
  },
};

export default dstTransitionDates;
