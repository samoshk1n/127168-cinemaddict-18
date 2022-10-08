import AbstractView from '../framework/view/abstract-view.js';
import {separateNumber} from '../utils/text.js';

const createStatisticsTemplate = (totalMovies) => `<p>${separateNumber(totalMovies.films.length)} movies inside</p>`;

export default class StatisticsView extends AbstractView {
  #filmsModel = null;

  constructor (filmsModel) {
    super();
    this.#filmsModel = filmsModel;
  }

  get template() {
    return createStatisticsTemplate(this.#filmsModel);
  }
}
