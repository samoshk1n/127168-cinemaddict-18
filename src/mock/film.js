import {
  getRandomIntFromInterval,
  getRandomFloatFromInterval,
  getRandomArrayElement,
  getSomeRandomArrayElements,
  generateRandomDatePast
} from '../utils.js';

import {
  TITLES,
  POSTERS,
  AGE_RATINGS,
  DIRECTORS,
  WRITERS,
  ACTORS,
  СOUNTRIES,
  GENRES,
  DESCRIPTIONS
} from './mock-data.js';

import {NUMBER_OF_COMMENTS} from '../const.js';

const MIN_WRITERS = 1;
const MAX_WRITERS = 3;
const MIN_ACTORS = 3;
const MAX_ACTORS = 7;
const FILM_YEARS_AGO = 50;
const MIN_MINUTES = 50;
const MAX_MINUTES = 120;
const MIN_GENRES = 1;
const MAX_GENRES = 3;
const WATCHED_YEARS_AGO = 2;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 5;

export const generateFilm = (id) => {
  const commonTitle = getRandomArrayElement(TITLES);
  const randomPoster = getRandomArrayElement(POSTERS);
  const numberOfWriters = getRandomIntFromInterval(MIN_WRITERS, MAX_WRITERS);
  const numberOfActors = getRandomIntFromInterval(MIN_ACTORS, MAX_ACTORS);
  const numberOfGenres = getRandomIntFromInterval(MIN_GENRES, MAX_GENRES);
  const numberOfComments = getRandomIntFromInterval(MIN_COMMENTS, MAX_COMMENTS);
  const commentIdentificators = Array.from({length: NUMBER_OF_COMMENTS}, (_value, index) => index);

  return {
    id,
    comments: getSomeRandomArrayElements(commentIdentificators, numberOfComments), // TODO Сгенерировать айдишники комментариев 0-5 шт. Главная и попап
    filmInfo: {
      title: commonTitle,
      alternativeTitle: commonTitle, // альтернативное название такое же, как и главное название (сделано для упрощения)
      totalRating: getRandomFloatFromInterval(),
      poster: `images/posters/${randomPoster}`,
      ageRating: getRandomArrayElement(AGE_RATINGS),
      director: getRandomArrayElement(DIRECTORS),
      writers: getSomeRandomArrayElements(WRITERS, numberOfWriters),
      actors: getSomeRandomArrayElements(ACTORS, numberOfActors),
      release: {
        date: generateRandomDatePast(FILM_YEARS_AGO),
        releaseСountry: getRandomArrayElement(СOUNTRIES)
      },
      runtime: getRandomIntFromInterval(MIN_MINUTES, MAX_MINUTES),
      genres: getSomeRandomArrayElements(GENRES, numberOfGenres),
      description: getRandomArrayElement(DESCRIPTIONS)
    },
    userDetails: {
      watchlist: Boolean(getRandomIntFromInterval()),
      alreadyWatched: Boolean(getRandomIntFromInterval()),
      watchingDate: generateRandomDatePast(WATCHED_YEARS_AGO),
      favorite: Boolean(getRandomIntFromInterval())
    }
  };
};
