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
  #renderedFilmCount = 0;

  constructor (filmsContainer, filmsModel, commentsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#popupPresenter = new PopupPresenter(this.#commentsModel, this.#handleFilmCardChange);
    this.#sortPresenter = new SortPresenter(this.#filmsComponent.element, this, this.#filmsModel);
    this.#sortPresenter.init();
    render(this.#filmsComponent, this.#filmsContainer);
    this.checkAndRenderFilms(this.#sortPresenter.films);
  };

  #onShowMoreButtonClick = () => {
    this.#showMoreButtonComponent.element.remove();

    const filmsCount = this.#sortPresenter.films.length;
    const newRenderedFilmCount = Math.min(filmsCount, this.#renderedFilmCount + FILMS_PER_STEP);
    const films = this.#sortPresenter.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderedFilmCount = newRenderedFilmCount;

    this.#renderFilms(films);

    if (this.#renderedFilmCount >= filmsCount) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    } else {
      render(this.#showMoreButtonComponent, this.#filmsListComponent.filmsListContainer);
    }
  };

  #renderFilm = (film) => {
    const filmCardPresenter = new FilmCardPresenter(this.#filmsListComponent, this.#popupPresenter, this.#handlePopupChange);
    filmCardPresenter.init(film);
    this.#filmCardPresenter.set(film.id, filmCardPresenter);
  };

  #renderFilms = (films) => films.forEach((film) => this.#renderFilm(film));

  #renderBoardFilms = (films) => {
    const filmsCount = films.length;
    const newRenderedFilmCount = Math.min(filmsCount, FILMS_PER_STEP);
    const startFilms = films.slice(0, newRenderedFilmCount);

    render(this.#filmsListComponent, this.#filmsComponent.element);
    this.#renderFilms(startFilms);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (filmsCount > FILMS_PER_STEP) {
      this.#showMoreButtonComponent.setPopupClickHandler(this.#onShowMoreButtonClick);
      render(this.#showMoreButtonComponent, this.#filmsListComponent.filmsListContainer);
    }
  };

  #renderEmptyTitle = () => {
    this.#filmsListComponent.createEmptyTitle();
    render(this.#filmsListComponent, this.#filmsComponent.element);
  };

  checkAndRenderFilms = (films) => {
    if (!films.length) {
      this.#renderEmptyTitle();
      return;
    }

    this.#renderBoardFilms(films);
  };

  clearFilmList = () => {
    this.#filmCardPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter.clear();
    this.#renderedFilmCount = 0;
    remove(this.#showMoreButtonComponent);
  };

  #handleFilmCardChange = (updatedFilm) => {
    this.#filmCardPresenter.get(updatedFilm.id)?.updateCard(updatedFilm);
  };

  #handlePopupChange = (updatedFilm) => {
    this.#filmCardPresenter.get(updatedFilm.id).updateCard(updatedFilm);
    if (this.#popupPresenter.popupComponent) {
      this.#popupPresenter.filmDetailsControlsComponent.updateControlsButton();
    }
  };
}
