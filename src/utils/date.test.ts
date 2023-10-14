import { DateTime } from 'luxon';
import {
  MonthFormat,
  isFriday,
  isRamadan,
  isEidInDay,
  getHijriMonth,
} from './date';

describe('Date Functions', () => {
  describe('isFriday', () => {
    it('should return true if the date is a Friday', () => {
      const friday = DateTime.local(2023, 10, 27); // assuming this date is a Friday
      expect(isFriday(friday)).toBe(true);
    });

    it('should return false if the date is not a Friday', () => {
      const saturday = DateTime.local(2023, 10, 28); // assuming this date is a Saturday
      expect(isFriday(saturday)).toBe(false);
    });
  });

  describe('isRamadan', () => {
    it('should return true if the date is within the month of Ramadan', () => {
      // Provide a date that you're certain falls within Ramadan
      const ramadanDate = DateTime.local(2023, 3, 23);
      expect(isRamadan(ramadanDate)).toBe(true);
    });

    it('should return false if the date is outside the month of Ramadan', () => {
      const nonRamadanDate = DateTime.local(2023, 5, 23);
      expect(isRamadan(nonRamadanDate)).toBe(false);
    });
  });

  describe('isEidInDay', () => {
    // Note: These tests may not be precise due to the variability of the Islamic calendar.
    it('should return true if the date is Eid al-Fitr or within the specified proximity', () => {
      const eidAlFitr = DateTime.local(2023, 4, 21);
      expect(isEidInDay(eidAlFitr, 0)).toBe(true);
    });

    it('should return true if the date is Eid al-Adha or within the specified proximity', () => {
      // Provide a date that you're certain falls on Eid al-Adha or within the proximity
      const eidAlAdha = DateTime.local(2023, 6, 28);
      expect(isEidInDay(eidAlAdha, 10)).toBe(true);
    });

    it('should return false if the date is not close to any Eid', () => {
      const eidAlFitr = DateTime.local(2023, 3, 21);
      expect(isEidInDay(eidAlFitr, 10)).toBe(false);
    });
  });

  describe('getHijriMonth', () => {
    it('should return the correct Hijri month number', () => {
      const date = DateTime.local(2023, 3, 23);
      expect(getHijriMonth(date, MonthFormat.NUMBER)).toBe(9); // Assuming Ramadan
    });

    it('should return the correct Hijri month name', () => {
      const date = DateTime.local(2023, 3, 23);
      expect(getHijriMonth(date, MonthFormat.NAME)).toBe('Ramadan'); // Assuming Ramadan
    });
  });
});
