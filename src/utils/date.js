import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {getRandomIntFromInterval} from '../utils/random.js';

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_YEAR = 365; // принебрегаем високосными годами

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

const generateRandomDatePast = (yearsAgo) => {
  const daysAgo = yearsAgo * DAYS_IN_YEAR;
  const hoursAgo = daysAgo * HOURS_IN_DAY;
  const minutesAgo = hoursAgo * MINUTES_IN_HOUR;
  const minutesGap = -getRandomIntFromInterval(0, minutesAgo);

  return dayjs().add(minutesGap, 'minute').toDate();
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
  generateRandomDatePast,
  humanizeDate
};
