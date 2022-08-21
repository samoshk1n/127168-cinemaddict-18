import StatisticsView from '../view/statistics-view.js';
import {render} from '../render.js';

export default class StatisticsPresenter {
  #statisticsContainer = null;

  init = (statisticsContainer) => {
    this.#statisticsContainer = statisticsContainer;
    render(new StatisticsView(), this.#statisticsContainer);
  };
}
