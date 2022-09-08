import FilmCardPresenter from './film-card-presenter.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import PopupPresenter from './popup-presenter.js';
import SortPresenter from '../presenter/sort-presenter.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import {
  render,
  remove
} from '../framework/render.js';
import {updateItem} from '../utils/data.js';
import {FILMS_PER_STEP} from '../const.js';

export default class FilmsPresenter {
  #commentsModel = null;
  #filmsContainer = null;
  #filmsModel = null;
  #popupPresenter = null;
  #sortPresenter = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #filmCardPresenter = new Map();
  #filmInformations = [];
  #renderedFilmCount = 0;

  constructor (filmsContainer, filmsModel, commentsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#filmInformations = [...this.#filmsModel.films];
    this.#popupPresenter = new PopupPresenter(this.#commentsModel, this.#handleFilmCardChange);
    this.#sortPresenter = new SortPresenter(this.#filmsComponent.element, this.#filmInformations);
    this.#sortPresenter.init();
    render(this.#filmsComponent, this.#filmsContainer);
    this.#checkAndRenderFilms();
  };

  #onShowMoreButtonClick = () => {
    this.#showMoreButtonComponent.element.remove();

    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILMS_PER_STEP);
    render(this.#showMoreButtonComponent, this.#filmsListComponent.filmsListContainer);

    if (this.#renderedFilmCount >= this.#filmInformations.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilm = (film) => {
    const filmCardPresenter = new FilmCardPresenter(this.#filmsListComponent, this.#popupPresenter, this.#handlePopupChange);
    filmCardPresenter.init(film);
    this.#filmCardPresenter.set(film.id, filmCardPresenter);
  };

  #renderFilms = (from, to) => {
    this.#filmInformations
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILMS_PER_STEP;
  };

  #renderFirstLineFilms = () => {
    const minimalNumOfFilms = Math.min(this.#filmInformations.length, FILMS_PER_STEP);

    render(this.#filmsListComponent, this.#filmsComponent.element);
    this.#renderFilms(0, minimalNumOfFilms);

    if (this.#filmInformations.length > FILMS_PER_STEP) {
      this.#showMoreButtonComponent.setPopupClickHandler(this.#onShowMoreButtonClick);
      render(this.#showMoreButtonComponent, this.#filmsListComponent.filmsListContainer);
    }
  };

  #renderEmptyTitle = () => {
    this.#filmsListComponent.createEmptyTitle();
    render(this.#filmsListComponent, this.#filmsComponent.element);
  };

  #checkAndRenderFilms = () => {
    if (!this.#filmInformations.length) {
      this.#renderEmptyTitle();
      return;
    }

    this.#renderFirstLineFilms();
  };

  #clearFilmList = () => {
    this.#filmCardPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter.clear();
    this.#renderedFilmCount = 0;
    remove(this.#showMoreButtonComponent);
  };

  #handleFilmCardChange = (updatedFilm) => {
    this.#filmInformations = updateItem(this.#filmInformations, updatedFilm);
    this.#filmCardPresenter.get(updatedFilm.id).updateCard(updatedFilm);
  };

  #handlePopupChange = (updatedFilm) => {
    this.#filmInformations = updateItem(this.#filmInformations, updatedFilm);
    this.#filmCardPresenter.get(updatedFilm.id).updateCard(updatedFilm);
    if (this.#popupPresenter.popupComponent) {
      this.#popupPresenter.filmDetailsControlsComponent.updateControlsButton();
    }
  };
}
