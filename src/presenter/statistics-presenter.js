import StatisticsView from '../view/statistics-view.js';
import {render} from '../render.js';

export default class StatisticsPresenter {
  #statisticsContainer = null;

  constructor (statisticsContainer) {
    this.#statisticsContainer = statisticsContainer;
  }

  init = () => render(new StatisticsView(), this.#statisticsContainer);
}
