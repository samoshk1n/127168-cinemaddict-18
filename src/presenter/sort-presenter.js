import SortView from '../view/sort-view.js';
import {filter} from '../utils/filter.js';
import {
  render,
  RenderPosition
} from '../framework/render.js';
import {SortType} from '../const.js';
import dayjs from 'dayjs';

export default class SortPresenter {
  #filmsComponent = null;
  #filmsPresenter = null;
  #filmsModel = null;
  #navigationModel = null;
  #sortComponent = null;

  #currentSortType = SortType.DEFAULT;

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
      case SortType.DATE:
        return filteredFilms.sort((a, b) => dayjs(b.filmInfo.release.date) - dayjs(a.filmInfo.release.date));
      case SortType.RATING:
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
