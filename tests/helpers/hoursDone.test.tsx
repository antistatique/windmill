import { hoursDoneOfDay, hoursDoneOfWeek } from '@/helpers/hoursDone';
import Day from '@/interfaces/day';
import Week from '@/interfaces/week';

import '@testing-library/jest-dom';

describe('hours done', () => {
  describe('day', () => {
    it('should return 0 if no hours', () => {
      const day = { hoursTodo: 8 } as Day;
      const hours = hoursDoneOfDay(day);

      expect(hours).toBe(0);
    });

    it('should return 0 if no hours done', () => {
      const day = { amStart: '08:00', amStop: '08:00' } as Day;
      const hours = hoursDoneOfDay(day);

      expect(hours).toBe(0);
    });

    it('should return the sum of hours done', () => {
      const day = {
        amStart: '08:00',
        amStop: '12:00',
        pmStart: '13:00',
        pmStop: '17:00',
      } as Day;
      const hours = hoursDoneOfDay(day);

      expect(hours).toBe(8);
    });

    it('should return the sum of hours done if no pm', () => {
      const day = { amStart: '08:00', amStop: '12:00' } as Day;
      const hours = hoursDoneOfDay(day);

      expect(hours).toBe(4);
    });

    it('should return the sum of hours done if no am', () => {
      const day = { pmStart: '13:00', pmStop: '17:00' } as Day;
      const hours = hoursDoneOfDay(day);

      expect(hours).toBe(4);
    });

    it('should return 0 if am range is incomplete', () => {
      const day = { amStart: '08:00' } as Day;
      const hours = hoursDoneOfDay(day);

      expect(hours).toBe(0);
    });

    it('should return 0 if pm range is incomplete', () => {
      const day = { pmStart: '13:00' } as Day;
      const hours = hoursDoneOfDay(day);

      expect(hours).toBe(0);
    });

    it('should return 0 if both range is incomplete', () => {
      const day = { amStart: '08:00', pmStart: '13:00' } as Day;
      const hours = hoursDoneOfDay(day);

      expect(hours).toBe(0);
    });

    it('should return decimal hours', () => {
      const day1 = { amStart: '08:00', amStop: '12:01' } as Day;
      const hours1 = hoursDoneOfDay(day1);

      expect(hours1).toBe(4.02);

      const day2 = { amStart: '08:00', amStop: '12:15' } as Day;
      const hours2 = hoursDoneOfDay(day2);

      expect(hours2).toBe(4.25);

      const day3 = { amStart: '08:00', amStop: '12:30' } as Day;
      const hours3 = hoursDoneOfDay(day3);

      expect(hours3).toBe(4.5);
    });
  });

  describe('week', () => {
    it('should return 0 if no days', () => {
      const week = {} as Week;
      const hours = hoursDoneOfWeek(week);

      expect(hours).toBe(0);
    });

    it('should return 0 if no days have hours', () => {
      const week = {
        days: [{ hoursTodo: 8 }, { hoursTodo: 8 }],
      } as Week;
      const hours = hoursDoneOfWeek(week);

      expect(hours).toBe(0);
    });

    it('should return the sum of hours done', () => {
      const week = {
        days: [
          { amStart: '08:00', amStop: '12:00' },
          { amStart: '08:00', amStop: '12:00' },
        ],
      } as Week;
      const hours = hoursDoneOfWeek(week);

      expect(hours).toBe(8);
    });
  });
});
