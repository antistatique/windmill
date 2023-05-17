const convertHoursToTime = (hours: number) => {
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

export default convertHoursToTime;
