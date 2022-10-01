import SortView from '../view/sort-view.js';
import {
  render,
  RenderPosition
} from '../framework/render.js';
import {SORT_TYPE} from '../const.js';

export default class SortPresenter {
  #filmsComponent = null;
  #filmsPresenter = null;

  #sortComponent = new SortView();
  #currentSortType = SORT_TYPE.DEFAULT;

  constructor (filmsComponent, filmPresenter) {
    this.#filmsComponent = filmsComponent;
    this.#filmsPresenter = filmPresenter;
  }

  init = () => {
    if (this.#filmsPresenter.films.length) {
      this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
      render(this.#sortComponent, this.#filmsComponent, RenderPosition.AFTERBEGIN);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    const films = this.#sortFilms(sortType);
    this.#filmsPresenter.clearFilmList();
    this.#filmsPresenter.checkAndRenderFilms(films);
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.DATE:
        this.#currentSortType = sortType;
        return [...this.#filmsPresenter.films].sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
      case SORT_TYPE.RATING:
        this.#currentSortType = sortType;
        return [...this.#filmsPresenter.films].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    }

    this.#currentSortType = sortType;
    return this.#filmsPresenter.films;
  };
}
