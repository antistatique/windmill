// eslint-disable-next-line no-shadow
export enum Statuses {
  WORKING = 'flexed_biceps',
  HOLIDAY = 'beach_with_umbrella',
  PUBLIC_HOLIDAY = 'switzerland_flag',
  DAY_OFF = 'zzz',
  SICK = 'face_with_medical_mask',
  FORMATION = 'graduation_cap',
}

const statusesMap: {
  [key: string]: string;
} = {
  '💪': Statuses.WORKING,
  '😷': Statuses.SICK,
  '✈️': Statuses.HOLIDAY,
  '🇨🇭': Statuses.PUBLIC_HOLIDAY,
  '💤': Statuses.DAY_OFF,
  '🎓': Statuses.FORMATION,
};

const getStatusFromEmoji = (emoji: string) => statusesMap[emoji];

export default getStatusFromEmoji;
