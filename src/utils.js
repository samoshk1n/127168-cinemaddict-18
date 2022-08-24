import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_YEAR = 365; // принебрегаем високосными годами

const getRandomIntFromInterval = (a = 0, b = 1) => {
  // Функция взята из интернета и доработана
  // Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomFloatFromInterval = (a = 1, b = 10, counter = 1) => {
  // Функция взята из интернета и доработана
  // Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(counter);
};

const getRandomArrayElement = (elements) => elements[getRandomIntFromInterval(0, elements.length - 1)];

const getSomeRandomArrayElements = (elements, numElements) => {
  const usedElements = [];

  for (let i = 0; i < numElements; i++) {
    const newElement = getRandomArrayElement(elements);

    if (usedElements.includes(newElement)) {
      i--;
      continue;
    }

    usedElements.push(newElement);
  }

  return usedElements;
};

const correctEndOfWord = (word, array) => (array.length === 1)
  ? word
  : `${word}s`;

const cutEndOfDescription = (description,
  maxLength = 140,
  finalSymbol = '…') => (description.length > maxLength)
  ? `${description.slice(0, maxLength - 1)}${finalSymbol}`
  : description;

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
    case 'full':
      return dayjs(date).format('YYYY/MM/DD HH:mm');
    default:
      return 'Something goes wrong';
  }
};

const toggleHideOverflow = () => {
  const bodyElement = document.querySelector('body');
  bodyElement.classList.toggle('hide-overflow');
};

const collectComments = (filmCommentsInformation, commentsContent) => {
  const sortedComments = [];

  for (const filmCommentId of filmCommentsInformation) {
    const currentComment = commentsContent[filmCommentId];
    sortedComments.push(currentComment);
  }

  return sortedComments;
};

const prepareComments = (commentsInformation, commentsModel) => {
  const commentsContent = commentsModel.comments;
  const collectedComments = collectComments(commentsInformation, commentsContent);
  return collectedComments.sort((a, b) => a.date - b.date);
};

export {
  collectComments,
  convertMinutesToHoursMinutes,
  correctEndOfWord,
  cutEndOfDescription,
  generateRandomDatePast,
  getRandomArrayElement,
  getRandomFloatFromInterval,
  getRandomIntFromInterval,
  getSomeRandomArrayElements,
  humanizeDate,
  prepareComments,
  toggleHideOverflow
};
