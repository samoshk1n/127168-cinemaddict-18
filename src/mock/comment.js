import {
  FIRST_NAMES,
  SECOND_NAMES,
  COMMENTS
} from './mock-data.js';

import {
  getRandomArrayElement,
  generateRandomDatePast
} from '../utils.js';

import {EMOTIONS} from '../const.js';

const COMMENT_YEARS_AGO = 5;

export const generateComment = (id) => {
  const author = `${getRandomArrayElement(FIRST_NAMES)} ${getRandomArrayElement(SECOND_NAMES)}`;

  return {
    id,
    author,
    comment: getRandomArrayElement(COMMENTS),
    date: generateRandomDatePast(COMMENT_YEARS_AGO),
    emotion: getRandomArrayElement(EMOTIONS)
  };
};
