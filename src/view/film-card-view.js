import AbstractView from '../framework/view/abstract-view.js';
import {cutEndOfDescription} from '../utils/text.js';
import {KEYS_IN_ORDER} from '../const.js';

import {
  convertMinutesToHoursMinutes,
  humanizeDate} from '../utils/date.js';

const createFilmCardTemplate = (film) => {
  const {
    comments,
    filmInfo: {
      title,
      totalRating,
      poster,
      runtime,
      release: {
        date
      },
      genres,
      description
    }
  } = film;

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${humanizeDate(date, 'year')}</span>
        <span class="film-card__duration">${convertMinutesToHoursMinutes(runtime)}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${cutEndOfDescription(description)}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #addActiveButtonClass = (button) => button.classList.add('film-card__controls-item--active');

  #removeActiveButtonClass = (button) => button.classList.remove('film-card__controls-item--active');

  updateItemButtons = (filmInformation) => {
    const buttons = this.element.querySelectorAll('.film-card__controls-item');

    KEYS_IN_ORDER.forEach((key, index) => {
      const userDetails = filmInformation.userDetails;

      if (userDetails[key]) {
        this.#addActiveButtonClass(buttons[index]);
      } else {
        this.#removeActiveButtonClass(buttons[index]);
      }
    });
  };
}
