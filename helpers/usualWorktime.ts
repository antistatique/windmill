const getUsualWorktime = () =>
  localStorage.getItem('usual_worktime')?.split(',') ?? ['', '', '', ''];

export default getUsualWorktime;
