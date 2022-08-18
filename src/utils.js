import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;

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
  const daysAgo = yearsAgo * 365; // принебрегаем високосными годами
  const daysGap = -getRandomIntFromInterval(0, daysAgo);

  return dayjs().add(daysGap, 'day').toDate();
};

const humanizeDate = (date, popupView = false) => {
  if (!popupView) {
    return dayjs(date).format('YYYY');
  }

  return dayjs(date).format('D MMMM YYYY');
};

export {
  getRandomIntFromInterval,
  getRandomFloatFromInterval,
  getRandomArrayElement,
  getSomeRandomArrayElements,
  correctEndOfWord,
  cutEndOfDescription,
  convertMinutesToHoursMinutes,
  generateRandomDatePast,
  humanizeDate
};
