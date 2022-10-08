import FilmCardPresenter from './film-card-presenter.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import LoadingView from '../view/loading-view.js';
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
  SortType,
  UpdateType,
  UserAction
} from '../const.js';

export default class FilmsPresenter {
  #commentsModel = null;
  #currentFilter = null;
  #filmsContainer = null;
  #filmsModel = null;
  #navigationModel = null;
  #noFilmComponent = null;
  #popupPresenter = null;
  #showMoreButtonComponent = null;
  #sortPresenter = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #loadingComponent = new LoadingView();

  #filmCardPresenter = new Map();
  #renderedFilmCount = FILMS_PER_STEP;
  #isLoading = true;

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

  #renderLoading = () => render(this.#loadingComponent, this.#filmsComponent.element);

  clearFilmList = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmCount = this.#sortPresenter.films.length;

    this.#filmCardPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter.clear();

    remove(this.#sortPresenter.sortComponent);
    remove(this.#noFilmComponent);
    remove(this.#loadingComponent);
    remove(this.#showMoreButtonComponent);
    remove(this.#filmsListComponent);

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILMS_PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#sortPresenter.currentSortType = SortType.DEFAULT;
    }
  };

  renderBoard = () => {
    render(this.#filmsComponent, this.#filmsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const films = this.#sortPresenter.films;
    const filmCount = films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    const startFilms = films.slice(0, newRenderedFilmCount);
    this.#currentFilter = this.#navigationModel.filter;


    this.#noFilmComponent = new NoFilmView(this.#currentFilter);
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
      this.#showMoreButtonComponent.setShowMoreButtonClickHandler(this.#onShowMoreButtonClick);
      render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        // this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmsModel.updateFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmCardPresenter.get(data.id)?.updateCard(data);
        this.#checkAndUpdatePopup(this.#popupPresenter.popupComponent);
        break;
      case UpdateType.MINOR:
        this.clearFilmList();
        this.renderBoard();
        this.#checkAndUpdatePopup(this.#popupPresenter.popupComponent);
        break;
      case UpdateType.MAJOR:
        this.clearFilmList({resetRenderedFilmCount: true, resetSortType: true});
        this.renderBoard();
        this.#checkAndUpdatePopup(this.#popupPresenter.popupComponent);
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.renderBoard();
        break;
    }
  };

  #checkAndUpdatePopup = (popupComponent) => {
    if (popupComponent) {
      this.#popupPresenter.updateControlsButton();
      this.#popupPresenter.updateComments();
    }
  };
}
