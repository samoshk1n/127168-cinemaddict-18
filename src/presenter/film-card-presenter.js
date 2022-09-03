import CommentsModel from '../model/comments-model.js';
import FilmCardView from '../view/film-card-view.js';
// import PopupPresenter from './popup-presenter.js';

import {render} from '../framework/render.js';

// const siteBodyElement = document.querySelector('body');

export default class FilmCardPresenter {
  #filmInformation = null;
  #filmsListComponent = null;
  #popupPresenter = null;

  #commentsModel = new CommentsModel();

  constructor(filmsListComponent) {
    this.#filmsListComponent = filmsListComponent;
  }

  init = (filmInformation) => {
    this.#filmInformation = filmInformation;
    // this.#popupPresenter = new PopupPresenter(siteBodyElement, this.#filmsModel, this.#commentsModel);
    this.#renderFilm(this.#filmInformation);
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

    render(filmComponent, this.#filmsListComponent.filmsListContainer);
  };
}
