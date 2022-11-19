import { formatDistance } from './intl';
import { getConfigByISOName } from './index';

jest.mock('./index', () => ({
  __esModule: true,
  getConfigByISOName: jest.fn(),
}));

describe('intl helpers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('formatDistance', () => {
    it('returns mi for USA', () => {
      (getConfigByISOName as jest.Mock).mockReturnValue({
        intl: { distanceUnit: 'mi' },
      });
      expect(formatDistance(1, 'United States')).toBe('1 mile');
      expect(formatDistance(1.5, 'United States')).toBe('1.5 miles');
    });

    it('returns km for Canada', () => {
      (getConfigByISOName as jest.Mock).mockReturnValue({
        intl: { distanceUnit: 'km' },
      });

      expect(formatDistance(1, 'Canada')).toBe('1.61 kilometers');
      expect(formatDistance(1.5, 'Canada')).toBe('2.41 kilometers');
    });
  });
});
