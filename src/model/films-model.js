import {generateFilm} from '../mock/film.js';

const NUMBER_OF_FILMS = 5;

export default class FilmsModel {
  films = Array.from({length: NUMBER_OF_FILMS}, (_value, index) => generateFilm(index + 1));

  getFilms = () => this.films;
}
