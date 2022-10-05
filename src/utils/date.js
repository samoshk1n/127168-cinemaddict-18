import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const MINUTES_IN_HOUR = 60;

dayjs.extend(relativeTime);

const convertMinutesToHoursMinutes = (minutes) => {
  if (minutes < MINUTES_IN_HOUR) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / MINUTES_IN_HOUR);
  const remainingMinutes = minutes % MINUTES_IN_HOUR;

  return (remainingMinutes !== 0)
    ? `${hours}h ${remainingMinutes}m`
    : `${hours}h`;
};

const humanizeDate = (date, type) => {
  switch (type) {
    case 'year':
      return dayjs(date).format('YYYY');
    case 'day-month-year':
      return dayjs(date).format('D MMMM YYYY');
    case 'human':
      return dayjs(date).fromNow();
    default:
      return 'Something goes wrong';
  }
};

export {
  convertMinutesToHoursMinutes,
  humanizeDate
};
