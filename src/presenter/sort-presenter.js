import SortView from '../view/sort-view.js';
import {
  render,
  RenderPosition
} from '../framework/render.js';
import {SORT_TYPE} from '../const.js';

export default class SortPresenter {
  #films = null;
  #filmsComponent = null;

  #sortComponent = new SortView();
  #currentSortType = SORT_TYPE.DEFAULT;
  #sourcedFilms = [];

  constructor (filmsComponent, films) {
    this.#filmsComponent = filmsComponent;
    this.#films = films;
  }

  init = () => {
    this.#sourcedFilms = [...this.#films];
    if (this.#films.length) {
      this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
      render(this.#sortComponent, this.#filmsComponent, RenderPosition.AFTERBEGIN);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    // - Очищаем список
    // - Рендерим список заново
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.DATE:
        this.#films.sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
        break;
      case SORT_TYPE.RATING:
        this.#films.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }

    this.#currentSortType = sortType;
  };

  get sourcedFilms() {
    return this.#sourcedFilms;
  }

  set sourcedFilms(updatedFilms) {
    this.#sourcedFilms = updatedFilms;
  }
}
