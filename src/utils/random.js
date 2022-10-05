const getRandomIntFromInterval = (a = 0, b = 1) => {
  // Функция взята из интернета и доработана
  // Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomIntFromInterval(0, elements.length - 1)];

export {
  getRandomArrayElement,
  getRandomIntFromInterval
};
