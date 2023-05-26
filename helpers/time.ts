const hoursToTime = (hours: number) => {
  const formattedHours = Math.floor(hours);
  const formattedMinutes = Math.round((hours - formattedHours) * 60);

  const time = `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes
    .toString()
    .padStart(2, '0')}`;

  return {
    time,
    hours: formattedHours,
    minutes: formattedMinutes,
  };
};

const timeToHours = (time: string) => {
  if (!time) return 0;

  const [hours, minutes] = time.split(':');

  return Number(hours) + Number(minutes) / 60;
};

export { hoursToTime, timeToHours };
