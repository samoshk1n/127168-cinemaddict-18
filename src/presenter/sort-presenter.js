import SortView from '../view/sort-view.js';
import {
  render,
  RenderPosition
} from '../framework/render.js';
import {SORT_TYPE} from '../const.js';

export default class SortPresenter {
  #filmsComponent = null;
  #filmsPresenter = null;
  #filmsModel = null;

  #sortComponent = new SortView();
  #currentSortType = SORT_TYPE.DEFAULT;

  constructor (filmsComponent, filmPresenter, filmsModel) {
    this.#filmsComponent = filmsComponent;
    this.#filmsPresenter = filmPresenter;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    if (this.films.length) {
      this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
      render(this.#sortComponent, this.#filmsComponent, RenderPosition.AFTERBEGIN);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    const films = this.films;
    this.#filmsPresenter.clearFilmList();
    this.#filmsPresenter.checkAndRenderFilms(films);
  };

  get films() {
    switch (this.#currentSortType) {
      case SORT_TYPE.DATE:
        return [...this.#filmsModel.films].sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
      case SORT_TYPE.RATING:
        return [...this.#filmsModel.films].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    }

    return this.#filmsModel.films;
  }
}
