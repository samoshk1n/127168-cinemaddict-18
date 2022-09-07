import FilmCardView from '../view/film-card-view.js';

import {
  remove,
  render
} from '../framework/render.js';

export default class FilmCardPresenter {
  #filmComponent = null;
  #filmsListComponent = null;
  #popupPresenter = null;

  constructor(filmsListComponent, popupPresenter) {
    this.#filmsListComponent = filmsListComponent;
    this.#popupPresenter = popupPresenter;
  }

  init = (filmInformation) => this.#renderFilm(filmInformation);

  #renderFilm = (filmInformation) => {
    this.#filmComponent = new FilmCardView(filmInformation);
    this.#prepareCard(this.#filmComponent , filmInformation);
    render(this.#filmComponent , this.#filmsListComponent.filmsListContainer);
  };

  #prepareCard = (filmComponent, filmInformation) => {
    filmComponent.updateItemButtons(filmInformation);

    filmComponent.setClickHandler(() => {
      if (!this.#popupPresenter.popupComponent) {
        this.#popupPresenter.init(filmInformation);
      } else {
        this.#popupPresenter.closePopup();
        this.#popupPresenter.init(filmInformation);
      }
    });
  };

  updateCard = (filmInformation) => this.#filmComponent.updateItemButtons(filmInformation);

  destroy = () => remove(this.#filmComponent);
}
