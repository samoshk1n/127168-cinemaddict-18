import CommentsModel from '../model/comments-model.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from '../presenter/popup-presenter.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import {render} from '../render.js';
import {FILMS_PER_STEP} from '../const.js';

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #popupPresenter = null;

  #commentsModel = new CommentsModel();
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #filmInformations = [];

  constructor (filmsContainer, filmsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    const siteBodyElement = document.querySelector('body');

    this.#filmInformations = [...this.#filmsModel.films];
    this.#popupPresenter = new PopupPresenter(siteBodyElement, this.#filmsModel, this.#commentsModel);

    render(this.#filmsComponent, this.#filmsContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);

    for (let i = 0; i < Math.min(this.#filmInformations.length, FILMS_PER_STEP); i++) {
      this.#renderFilm(this.#filmInformations[i]);
    }

    if (this.#filmInformations.length > FILMS_PER_STEP) {
      this.#showMoreButtonComponent.element.addEventListener('click', this.#onShowMoreButtonClick);

      render(this.#showMoreButtonComponent, this.filmsListElementContainer);
    }
  };

  #onShowMoreButtonClick = () => {
    console.log('Hi!');
  };

  #renderFilm = (filmInformation) => {
    const filmComponent = new FilmCardView(filmInformation);
    filmComponent.element.addEventListener('click', () => {
      if (!this.#popupPresenter.popupComponent) {
        this.#popupPresenter.init(filmInformation.id);
      } else {
        this.#popupPresenter.closePopup();
        this.#popupPresenter.init(filmInformation.id);
      }
    });

    render (filmComponent, this.filmsListElementContainer);
  };

  get filmsListElementContainer () {
    const filmsListElement = this.#filmsListComponent.element;

    return filmsListElement.querySelector('.films-list__container');
  }
}
