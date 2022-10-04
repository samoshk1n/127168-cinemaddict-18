import FilmCardPresenter from './film-card-presenter.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import NoFilmView from '../view/no-film-view.js';
import PopupPresenter from './popup-presenter.js';
import SortPresenter from '../presenter/sort-presenter.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import {
  render,
  remove
} from '../framework/render.js';
import {
  FILMS_PER_STEP,
  SORT_TYPE,
  UPDATE_TYPE,
  USER_ACTION
} from '../const.js';

export default class FilmsPresenter {
  #commentsModel = null;
  #filmsContainer = null;
  #filmsModel = null;
  #navigationModel = null;
  #popupPresenter = null;
  #showMoreButtonComponent = null;
  #sortPresenter = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #noFilmComponent = new NoFilmView();

  #filmCardPresenter = new Map();
  #renderedFilmCount = FILMS_PER_STEP;

  constructor (filmsContainer, filmsModel, commentsModel, navigationModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#navigationModel = navigationModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#navigationModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#popupPresenter = new PopupPresenter(this.#commentsModel, this.#handleViewAction, this.#navigationModel);
    this.#sortPresenter = new SortPresenter(this.#filmsComponent.element, this, this.#filmsModel, this.#navigationModel);
    this.renderBoard();
  };

  #onShowMoreButtonClick = () => {
    this.#showMoreButtonComponent.element.remove();

    const filmCount = this.#sortPresenter.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount + FILMS_PER_STEP);
    const films = this.#sortPresenter.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderedFilmCount = newRenderedFilmCount;

    this.#renderFilms(films);

    if (this.#renderedFilmCount >= filmCount) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    } else {
      render(this.#showMoreButtonComponent, this.#filmsListComponent.filmsListContainer);
    }
  };

  #renderFilm = (film) => {
    const filmCardPresenter = new FilmCardPresenter(
      this.#filmsListComponent,
      this.#popupPresenter,
      this.#handleViewAction,
      this.#navigationModel
    );
    filmCardPresenter.init(film);
    this.#filmCardPresenter.set(film.id, filmCardPresenter);
  };

  #renderFilms = (films) => films.forEach((film) => this.#renderFilm(film));

  clearFilmList = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmCount = this.#sortPresenter.films.length;

    this.#filmCardPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter.clear();

    remove(this.#sortPresenter.sortComponent);
    remove(this.#noFilmComponent);
    remove(this.#showMoreButtonComponent);
    remove(this.#filmsListComponent);

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILMS_PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#sortPresenter.currentSortType = SORT_TYPE.DEFAULT;
    }
  };

  renderBoard = () => {
    const films = this.#sortPresenter.films;
    const filmCount = films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    const startFilms = films.slice(0, newRenderedFilmCount);

    render(this.#filmsComponent, this.#filmsContainer);

    if (!filmCount) {
      render(this.#noFilmComponent, this.#filmsComponent.element);
      return;
    }

    this.#sortPresenter.init();
    render(this.#filmsListComponent, this.#filmsComponent.element);
    this.#renderFilms(startFilms);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (filmCount > this.#renderedFilmCount) {
      this.#showMoreButtonComponent = new ShowMoreButtonView();
      this.#showMoreButtonComponent.setPopupClickHandler(this.#onShowMoreButtonClick);
      render(this.#showMoreButtonComponent, this.#filmsListComponent.filmsListContainer);
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case USER_ACTION.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case USER_ACTION.ADD_COMMENT:
        break;
      case USER_ACTION.DELETE_COMMENT:
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#filmCardPresenter.get(data.id)?.updateCard(data);
        this.#checkAndUpdatePopup(this.#popupPresenter.popupComponent);
        break;
      case UPDATE_TYPE.MINOR:
        this.clearFilmList();
        this.renderBoard();
        this.#checkAndUpdatePopup(this.#popupPresenter.popupComponent);
        break;
      case UPDATE_TYPE.MAJOR:
        this.clearFilmList({resetRenderedFilmCount: true, resetSortType: true});
        this.renderBoard();
        this.#checkAndUpdatePopup(this.#popupPresenter.popupComponent);
        break;
    }
  };

  #checkAndUpdatePopup = (popupComponent) => {
    if (popupComponent) {
      this.#popupPresenter.updateControlsButton();
    }
  };
}
