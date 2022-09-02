import StatisticsView from '../view/statistics-view.js';
import {render} from '../framework/render.js';

export default class StatisticsPresenter {
  #statisticsContainer = null;
  #statisticsModel = null;

  constructor (statisticsContainer, statisticsModel) {
    this.#statisticsContainer = statisticsContainer;
    this.#statisticsModel = statisticsModel;
  }

  init = () => render(new StatisticsView(this.#statisticsModel.totalMovies), this.#statisticsContainer);
}
