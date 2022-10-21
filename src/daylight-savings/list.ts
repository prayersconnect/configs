interface DaylightSavingsRange {
  [key: number]: [
    string, //start time of dst
    string //end time of dst
  ];
}

interface DaylightSavingsRanges {
  [key: string]: DaylightSavingsRange;
}

const dstTransitionDates: DaylightSavingsRanges = {
  'United States': {
    2022: ['2022-03-13', '2022-11-05'],
    2023: ['2023-03-12', '2023-11-04'],
  },
  Canada: {
    2022: ['2022-03-13', '2022-11-05'],
    2023: ['2023-03-12', '2023-11-04'],
  },
  'United Kingdom': {
    2022: ['2022-03-27', '2022-10-29'],
    2023: ['2023-03-26', '2023-10-28'],
  },
  Australia: {
    2021: ['2021-10-03', '2022-04-02'],
    2022: ['2022-10-02', '2023-04-01'],
    2023: ['2023-10-01', '2024-04-06'],
  },
};

export default dstTransitionDates;
