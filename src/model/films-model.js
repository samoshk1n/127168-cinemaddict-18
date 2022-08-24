import {generateFilm} from '../mock/film.js';
import {NUMBER_OF_FILMS} from '../const.js';

export default class FilmsModel {
  #films = Array.from({length: NUMBER_OF_FILMS}, (_value, index) => generateFilm(index + 1));

  get films () {
    return this.#films;
  }
}
