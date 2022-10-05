import FilmCardView from '../view/film-card-view.js';

import {
  remove,
  render
} from '../framework/render.js';

import {
  NAVIGATION_TYPE,
  USER_ACTION,
  UPDATE_TYPE
} from '../const.js';

export default class FilmCardPresenter {
  #changeData = null;
  #film = null;
  #filmComponent = null;
  #filmsListComponent = null;
  #navigationModel = null;
  #popupPresenter = null;

  constructor(filmsListComponent, popupPresenter, changeData, navigationModel) {
    this.#filmsListComponent = filmsListComponent;
    this.#popupPresenter = popupPresenter;
    this.#changeData = changeData;
    this.#navigationModel = navigationModel;
  }

  init = (filmInformation) => {
    this.#film = filmInformation;
    this.#renderFilm(filmInformation);
  };

  #renderFilm = (filmInformation) => {
    this.#filmComponent = new FilmCardView(filmInformation);
    this.#prepareCard(this.#filmComponent , filmInformation);
    render(this.#filmComponent , this.#filmsListComponent.filmsListContainer);
  };

  #prepareCard = (filmComponent, filmInformation) => {
    filmComponent.updateItemButtons(filmInformation);

    filmComponent.setPopupClickHandler(() => {
      if (!this.#popupPresenter.popupComponent) {
        this.#popupPresenter.init(filmInformation);
      } else {
        this.#popupPresenter.closePopup();
        this.#popupPresenter.init(filmInformation);
      }
    });

    this.#setButtonsClickHandlers(filmComponent);
  };

  #setButtonsClickHandlers = (filmComponent) => {
    filmComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    filmComponent.setWatchedClickHandler(this.#handleWatchedClick);
    filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
  };

  #handleWatchlistClick = () => {
    const changededFilm = {...this.#film};
    changededFilm.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#changeData(
      USER_ACTION.UPDATE_FILM,
      this.#chooseInterfaceUpdate(),
      changededFilm
    );
  };

  #handleWatchedClick = () => {
    const changededFilm = {...this.#film};
    changededFilm.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#changeData(
      USER_ACTION.UPDATE_FILM,
      this.#chooseInterfaceUpdate(),
      changededFilm
    );
  };

  #handleFavoriteClick = () => {
    const changededFilm = {...this.#film};
    changededFilm.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#changeData(
      USER_ACTION.UPDATE_FILM,
      this.#chooseInterfaceUpdate(),
      changededFilm
    );
  };

  #chooseInterfaceUpdate = () => this.#navigationModel.currentNavigation === NAVIGATION_TYPE.ALL ? UPDATE_TYPE.PATCH : UPDATE_TYPE.MINOR;

  updateCard = (filmInformation) => {
    this.#filmComponent.updateItemButtons(filmInformation);
    this.#filmComponent.updateCommentsCount(filmInformation);
  };

  destroy = () => remove(this.#filmComponent);
}
