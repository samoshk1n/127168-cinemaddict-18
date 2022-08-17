import {generateFilm} from '../mock/film.js';

export default class FilmsModel {
  films = Array.from({length: 5}, (_value, index) => generateFilm(index + 1));

  getFilms = () => this.films;
}
