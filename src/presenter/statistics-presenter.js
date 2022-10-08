import StatisticsView from '../view/statistics-view.js';
import {UpdateType} from '../const.js';
import {
  render,
  replace
} from '../framework/render.js';

export default class StatisticsPresenter {
  #statisticsContainer = null;
  #filmsModel = null;
  #loadingStatisticsComponent = null;

  constructor (statisticsContainer, filmsModel) {
    this.#statisticsContainer = statisticsContainer;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#loadingStatisticsComponent = new StatisticsView(this.#filmsModel);
    render(this.#loadingStatisticsComponent, this.#statisticsContainer);
  };

  #handleModelEvent = (updateType) => {
    if (updateType === UpdateType.INIT) {
      replace(new StatisticsView(this.#filmsModel), this.#loadingStatisticsComponent);
    }
  };
}
