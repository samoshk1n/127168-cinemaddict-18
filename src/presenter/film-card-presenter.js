import FilmCardView from '../view/film-card-view.js';

import {render} from '../framework/render.js';

export default class FilmCardPresenter {
  #filmsListComponent = null;
  #popupPresenter = null;

  constructor(filmsListComponent, popupPresenter) {
    this.#filmsListComponent = filmsListComponent;
    this.#popupPresenter = popupPresenter;
  }

  init = (filmInformation) => this.#renderFilm(filmInformation);

  #renderFilm = (filmInformation) => {
    const filmComponent = new FilmCardView(filmInformation);
    this.#prepareCard(filmComponent, filmInformation);
    render(filmComponent, this.#filmsListComponent.filmsListContainer);
  };

  #prepareCard = (filmComponent, filmInformation) => {
    filmComponent.updateItemButtons();

    filmComponent.setClickHandler(() => {
      if (!this.#popupPresenter.popupComponent) {
        this.#popupPresenter.init(filmInformation);
      } else {
        this.#popupPresenter.closePopup();
        this.#popupPresenter.init(filmInformation);
      }
    });
  };
}
