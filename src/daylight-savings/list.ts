interface DaylightSavingsRange {
  [key: number]: [
    string, //start time of dst
    string //end time of dst
  ];
}

interface DaylightSavingsRanges {
  [key: string]: DaylightSavingsRange;
}

/**
 * when ending, we're selecting one day early. like if it ends in Nov 3, 2 AM, we're selecting Nov 2.
 * Basically ignoring time
 */
const dstTransitionDates: DaylightSavingsRanges = {
  'United States': {
    2021: ['2021-03-14', '2021-11-06'],
    2022: ['2022-03-13', '2022-11-05'],
    2023: ['2023-03-12', '2023-11-04'],
    2024: ['2024-03-10', '2024-11-02'],
  },
  Canada: {
    2021: ['2021-03-14', '2021-11-07'],
    2022: ['2022-03-13', '2022-11-05'],
    2023: ['2023-03-12', '2023-11-04'],
    2024: ['2024-03-10', '2024-11-02'],
  },
  'United Kingdom': {
    2021: ['2021-03-28', '2021-10-30'],
    2022: ['2022-03-27', '2022-10-29'],
    2023: ['2023-03-26', '2023-10-28'],
    2024: ['2024-03-31', '2024-10-26'],
  },
  Australia: {
    2021: ['2021-10-03', '2022-04-02'],
    2022: ['2022-10-02', '2023-04-01'],
    2023: ['2023-10-01', '2024-04-06'],
    2024: ['2024-10-07', '2025-04-05'],
  },
};

export default dstTransitionDates;
