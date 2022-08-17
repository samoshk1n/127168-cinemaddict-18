import {
  getRandomIntFromInterval,
  getRandomFloatFromInterval,
  getRandomArrayElement,
  getSomeRandomArrayElements
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

const MIN_WRITERS = 1;
const MAX_WRITERS = 3;
const MIN_ACTORS = 3;
const MAX_ACTORS = 7;
const MIN_GENRES = 1;
const MAX_GENRES = 3;

export const generateFilm = (id) => {
  const commonTitle = getRandomArrayElement(TITLES);
  const randomPoster = getRandomArrayElement(POSTERS);
  const numberOfWriters = getRandomIntFromInterval(MIN_WRITERS, MAX_WRITERS);
  const numberOfActors = getRandomIntFromInterval(MIN_ACTORS, MAX_ACTORS);
  const numberOfGenres = getRandomIntFromInterval(MIN_GENRES, MAX_GENRES);

  return {
    id,
    comments: [], // TODO Сгенерировать айдишники комментариев 0-5 шт. Главная и попап
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
        date: '2019-05-11T00:00:00.000Z', // TODO Генерация случайных дат. Главная и попап. На главной только год, на попапе "день месяц год"
        releaseСountry: getRandomArrayElement(СOUNTRIES)
      },
      runtime: 77, // TODO Генерация случайного числа. Главная и попап. Формат "часы минуты"
      genres: getSomeRandomArrayElements(GENRES, numberOfGenres),
      description: getRandomArrayElement(DESCRIPTIONS)
    },
    userDetails: {
      watchlist: Boolean(getRandomIntFromInterval()),
      alreadyWatched: Boolean(getRandomIntFromInterval()),
      watchingDate: '2019-04-12T16:12:32.554Z', // TODO Генерация случайной даты
      favorite: Boolean(getRandomIntFromInterval())
    }
  };
};
