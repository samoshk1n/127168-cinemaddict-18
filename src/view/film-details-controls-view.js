import AbstractView from '../framework/view/abstract-view.js';
import {
  CategoryMatch,
  KEYS_IN_ORDER
} from '../const.js';

const createFilmDetailsControlsTemplate = () => (
  `<section class="film-details__controls">
    <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button film-details__control-button--watched" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
  </section>`
);

export default class FilmDetailsControlsView extends AbstractView {
  #film = null;

  constructor (film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmDetailsControlsTemplate();
  }

  #addActiveButtonClass = (button) => button.classList.add('film-details__control-button--active');

  #removeActiveButtonClass = (button) => button.classList.remove('film-details__control-button--active');

  updateControlsButton = () => {
    KEYS_IN_ORDER.forEach((key) => {
      const currentButton = this.element.querySelector(`#${CategoryMatch[key].id}`);
      const userDetails = this.#film.userDetails;

      if (userDetails[key]) {
        currentButton.textContent = CategoryMatch[key].active;
        this.#addActiveButtonClass(currentButton);
      } else {
        currentButton.textContent = CategoryMatch[key].inactive;
        this.#removeActiveButtonClass(currentButton);
      }
    });
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('#watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('#watched').addEventListener('click', this.#watchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('#favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
