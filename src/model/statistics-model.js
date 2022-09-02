import {getRandomIntFromInterval} from '../utils/random.js';

const MIN_FILMS = 10000;
const MAX_FILMS = 5000000;

export default class StatisticsModel {
  #totalMovies = getRandomIntFromInterval(MIN_FILMS, MAX_FILMS);

  get totalMovies () {
    return this.#totalMovies;
  }
}
