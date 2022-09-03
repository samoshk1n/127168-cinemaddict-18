import CommentsModel from '../model/comments-model.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from '../presenter/popup-presenter.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import {render} from '../framework/render.js';
import {FILMS_PER_STEP} from '../const.js';

const siteBodyElement = document.querySelector('body');

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #popupPresenter = null;

  #commentsModel = new CommentsModel();
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
    this.#popupPresenter = new PopupPresenter(siteBodyElement, this.#filmsModel, this.#commentsModel);
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

  #renderFilm = (filmInformation) => {
    const filmComponent = new FilmCardView(filmInformation);

    filmComponent.setClickHandler(() => {
      if (!this.#popupPresenter.popupComponent) {
        this.#popupPresenter.init(filmInformation.id);
      } else {
        this.#popupPresenter.closePopup();
        this.#popupPresenter.init(filmInformation.id);
      }
    });

    render (filmComponent, this.#filmsListComponent.filmsListContainer);
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
