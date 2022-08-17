import {getRandomIntFromInterval,
  getRandomFloatFromInterval,
  getRandomArrayElement} from '../utils.js';

export const generateFilm = (id) => ({
  id, // TODO Сделать генерацию айдишников;
  comments: [], // TODO Сгенерировать айдишники комментариев 0-5 шт. Главная и попап
  filmInfo: {
    title: 'A Little Pony Without The Carpet', // TODO Выбор из произвольного массива. Главная и попап
    alternativeTitle: 'Laziness Who Sold Themselves', // TODO Для рыбы подставим из основного title. Попап
    totalRating: 5.3, // TODO Генерация случайного числа. Главная и попап
    poster: 'images/posters/blue-blazes.jpg', // TODO Выбор из массива адрессов. Главная и попап
    ageRating: 0, // TODO Выбор из произвольного массива. Попап
    director: 'Tom Ford', // TODO Выбор из произвольного массива. Попап
    writers: [
      'Takeshi Kitano'
    ], // TODO Выбор из произвольного массива несколько значений (1-3). Обработка writer(s). Попап
    actors: [
      'Morgan Freeman'
    ], // TODO Выбор из произвольного массива несколько значений (3-7). Попап
    release: {
      'date': '2019-05-11T00:00:00.000Z', // TODO Генерация случайных дат. Главная и попап. На главной только год, на попапе "день месяц год"
      'release_country': 'Finland' // TODO Выбор из произвольного массива. Попап
    },
    runtime: 77, // TODO Генерация случайного числа. Главная и попап. Формат "часы минуты"
    genre: [
      'Comedy'
    ], // TODO Выбор из произвольного массива несколько значений (1-3). Обработка genre(s) на попапе. Главная и попап
    description: 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.' // TODO Выбор из произвольного массива. Главная и попап. На главной не больше 140 символов
  },
  userDetails: {
    watchlist: Boolean(getRandomIntFromInterval()),
    alreadyWatched: Boolean(getRandomIntFromInterval()),
    watchingDate: '2019-04-12T16:12:32.554Z', // TODO Генерация случайной даты
    favorite: Boolean(getRandomIntFromInterval())
  }
});
