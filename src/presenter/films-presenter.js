import FilmCardPresenter from './film-card-presenter.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import {render} from '../framework/render.js';
import {FILMS_PER_STEP} from '../const.js';

export default class FilmsPresenter {
  #filmCardPresenter = null;
  #filmsContainer = null;
  #filmsModel = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #filmInformations = [];
  #renderedFilmCount = 0;

  constructor (filmsContainer, filmsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#filmInformations = [...this.#filmsModel.films];
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
    this.#filmCardPresenter = new FilmCardPresenter(this.#filmsListComponent);
    this.#filmCardPresenter.init(film);
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
      this.#showMoreButtonComponent.setClickHandler(this.#onShowMoreButtonClick);
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
}
