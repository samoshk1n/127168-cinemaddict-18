import CommentsPresenter from './comments-presenter.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import PopupView from '../view/popup-view.js';
import {render} from '../framework/render.js';
import {
  toggleHideOverflow,
} from '../utils/popup.js';

import {
  USER_ACTION,
  UPDATE_TYPE
} from '../const.js';

const siteBodyElement = document.querySelector('body');

export default class PopupPresenter {
  #changeData = null;
  #commentsModel = null;
  #commentsPresenter = null;
  #film = null;
  #filmDetailsComponent = null;
  #filmDetailsControlsComponent = null;
  #popupComponent = null;

  constructor (commentsModel, changeData) {
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
  }

  init = (film) => {
    toggleHideOverflow();
    this.#preparePopup(film);
    this.#initListesers();
    this.#renderPopup();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.closePopup();
    }
  };

  #preparePopup = (film) => {
    this.#film = film;
    this.#commentsPresenter = new CommentsPresenter(film, this.#commentsModel);
    this.#popupComponent = new PopupView(film.comments.length);
    this.#filmDetailsComponent = new FilmDetailsView(film);
    this.#prepareFilmDetailsControls(film);
  };

  #prepareFilmDetailsControls = (film) => {
    this.#filmDetailsControlsComponent = new FilmDetailsControlsView(film);
    this.#filmDetailsControlsComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmDetailsControlsComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmDetailsControlsComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmDetailsControlsComponent.updateControlsButton();
  };

  #renderPopup = () => {
    render(this.#popupComponent, siteBodyElement);
    render(this.#filmDetailsComponent, this.#popupComponent.topContainer);
    render(this.#filmDetailsControlsComponent, this.#popupComponent.topContainer);
    this.#commentsPresenter.init(this.#popupComponent.filmDetailsInnerElement);
  };

  #initListesers = () => {
    this.#popupComponent.setCloseButtonHandler(() => this.closePopup());
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleWatchlistClick = () => {
    const changededFilm = {...this.#film};
    changededFilm.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#changeData(
      USER_ACTION.UPDATE_FILM,
      UPDATE_TYPE.PATCH,
      changededFilm
    );
  };

  #handleWatchedClick = () => {
    const changededFilm = {...this.#film};
    changededFilm.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#changeData(
      USER_ACTION.UPDATE_FILM,
      UPDATE_TYPE.PATCH,
      changededFilm
    );
  };

  #handleFavoriteClick = () => {
    const changededFilm = {...this.#film};
    changededFilm.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#changeData(
      USER_ACTION.UPDATE_FILM,
      UPDATE_TYPE.PATCH,
      changededFilm
    );
  };

  closePopup = () => {
    this.#popupComponent.element.remove();
    this.#popupComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    toggleHideOverflow();
  };

  updateControlsButton = () => this.#filmDetailsControlsComponent.updateControlsButton();

  get popupComponent() {
    return this.#popupComponent;
  }
}
