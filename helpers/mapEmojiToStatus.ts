// eslint-disable-next-line no-shadow
export enum Statues {
  WORKING = 'flexed_biceps',
  HOLIDAY = 'beach_with_umbrella',
  PUBLIC_HOLIDAY = 'switzerland_flag',
  DAY_OFF = 'zzz',
  SICK = 'face_with_medical_mask',
  FORMATION = 'graduation_cap',
}

const mapEmojiToStatus = (emoji: string): Statues => {
  switch (emoji) {
    case '💪':
      return Statues.WORKING;
    case '😷':
      return Statues.SICK;
    case '✈️':
      return Statues.HOLIDAY;
    case '🇨🇭':
      return Statues.PUBLIC_HOLIDAY;
    case '💤':
      return Statues.DAY_OFF;
    case '🎓':
      return Statues.FORMATION;
    default:
      throw new Error('Emoji not found');
  }
};

export default mapEmojiToStatus;
