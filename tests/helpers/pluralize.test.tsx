import pluralize from '@/helpers/pluralize';

// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

describe('pluralize', () => {
  describe('default plural', () => {
    const singular = 'arm';

    it('should return the count and singular for a count of 1', () => {
      expect(pluralize(1, singular)).toBe('1 arm');
    });

    it('should return the count and plural for a count of 0', () => {
      expect(pluralize(0, singular)).toBe('0 arms');
    });

    it('should return the count and plural for a count > 1', () => {
      expect(pluralize(8, singular)).toBe('8 arms');
    });
  });

  describe('specific plural', () => {
    const singular = 'octopus';
    const plural = 'octopuses';

    it('should return the count and singular for a count of 1', () => {
      expect(pluralize(1, singular)).toBe('1 octopus');
    });

    it('should return the count and specified plural for a count of 0', () => {
      expect(pluralize(0, singular, { plural })).toBe('0 octopuses');
    });

    it('should return the count and specified plural for a count > 1', () => {
      expect(pluralize(8, singular, { plural })).toBe('8 octopuses');
    });
  });

  describe('negative count', () => {
    const singular = 'arm';

    it('should return the count and singular for a count of -1', () => {
      expect(pluralize(-1, singular)).toBe('-1 arm');
    });

    it('should return the count and plural for a count of 0', () => {
      expect(pluralize(-0, singular)).toBe('0 arms');
    });

    it('should return the count and plural for a count < -1', () => {
      expect(pluralize(-8, singular)).toBe('-8 arms');
    });
  });

  describe('without appending the count', () => {
    const singular = 'arm';
    const append = false;

    it('should return the singular for a count of 1', () => {
      expect(pluralize(1, singular, { append })).toBe('arm');
    });

    it('should return the plural for a count of 0', () => {
      expect(pluralize(0, singular, { append })).toBe('arms');
    });

    it('should return the plural for a count > 1', () => {
      expect(pluralize(8, singular, { append })).toBe('arms');
    });
  });
});
