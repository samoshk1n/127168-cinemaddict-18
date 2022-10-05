import SortView from '../view/sort-view.js';
import {filter} from '../utils/filter.js';
import {
  render,
  RenderPosition
} from '../framework/render.js';
import {SORT_TYPE} from '../const.js';

export default class SortPresenter {
  #filmsComponent = null;
  #filmsPresenter = null;
  #filmsModel = null;
  #navigationModel = null;
  #sortComponent = null;

  #currentSortType = SORT_TYPE.DEFAULT;

  constructor (filmsComponent, filmPresenter, filmsModel, navigationModel) {
    this.#filmsComponent = filmsComponent;
    this.#filmsPresenter = filmPresenter;
    this.#filmsModel = filmsModel;
    this.#navigationModel = navigationModel;
  }

  init = () => {
    if (this.films.length) {
      this.#sortComponent = new SortView(this.#currentSortType);
      this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
      render(this.#sortComponent, this.#filmsComponent, RenderPosition.AFTERBEGIN);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#filmsPresenter.clearFilmList({resetRenderedFilmCount: true});
    this.#filmsPresenter.renderBoard();
  };

  get films() {
    const navigationType = this.#navigationModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[navigationType](films);

    switch (this.#currentSortType) {
      case SORT_TYPE.DATE:
        return filteredFilms.sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
      case SORT_TYPE.RATING:
        return filteredFilms.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    }

    return filteredFilms;
  }

  get currentSortType() {
    return this.#currentSortType;
  }

  set currentSortType(sortType) {
    this.#currentSortType = sortType;
  }

  get sortComponent() {
    return this.#sortComponent;
  }
}
