import mapEmojiToStatus, { Statuses } from '@/helpers/mapEmojiToStatus';

// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';

describe('mapEmojiToStatus', () => {
  it('should return the correct status for the given emoji', () => {
    expect(mapEmojiToStatus('💪')).toBe(Statuses.WORKING);
    expect(mapEmojiToStatus('😷')).toBe(Statuses.SICK);
    expect(mapEmojiToStatus('✈️')).toBe(Statuses.HOLIDAY);
    expect(mapEmojiToStatus('🇨🇭')).toBe(Statuses.PUBLIC_HOLIDAY);
    expect(mapEmojiToStatus('💤')).toBe(Statuses.DAY_OFF);
    expect(mapEmojiToStatus('🎓')).toBe(Statuses.FORMATION);
  });

  it('should return undefined for an unknown emoji', () => {
    expect(mapEmojiToStatus('🐙')).toBeUndefined();
  });
});
