import AbstractView from '../framework/view/abstract-view.js';
import {separateNumber} from '../utils/text.js';

const createStatisticsTemplate = (totalMovies) => `<p>${separateNumber(totalMovies)} movies inside</p>`;

export default class StatisticsView extends AbstractView {
  #totalMovies = null;

  constructor (totalMovies) {
    super();
    this.#totalMovies = totalMovies;
  }

  get template() {
    return createStatisticsTemplate(this.#totalMovies);
  }
}
