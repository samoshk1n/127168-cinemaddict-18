import FilmCardView from '../view/film-card-view.js';

import {render} from '../framework/render.js';

export default class FilmCardPresenter {
  #filmInformation = null;
  #filmsListComponent = null;
  #popupPresenter = null;

  constructor(filmsListComponent, popupPresenter) {
    this.#filmsListComponent = filmsListComponent;
    this.#popupPresenter = popupPresenter;
  }

  init = (filmInformation) => {
    this.#filmInformation = filmInformation;
    this.#renderFilm(this.#filmInformation);
  };

  #renderFilm = (filmInformation) => {
    const filmComponent = new FilmCardView(filmInformation);

    filmComponent.setClickHandler(() => {
      if (!this.#popupPresenter.popupComponent) {
        this.#popupPresenter.init(filmInformation);
      } else {
        this.#popupPresenter.closePopup();
        this.#popupPresenter.init(filmInformation);
      }
    });

    render(filmComponent, this.#filmsListComponent.filmsListContainer);
  };
}
