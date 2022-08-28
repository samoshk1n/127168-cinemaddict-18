import AbstractView from '../framework/view/abstract-view.js';
import {
  correctEndOfWord,
  convertMinutesToHoursMinutes,
  humanizeDate
} from '../utils.js';

const createGenresElements = (genres) => {
  let genresElements = '';
  for (const genre of genres) {
    genresElements += `<span class="film-details__genre">${genre}</span>`;
  }
  return genresElements;
};

const createFilmDetailsTemplate = (film) => {
  const {
    filmInfo: {
      title,
      alternativeTitle,
      totalRating,
      poster,
      ageRating,
      director,
      writers,
      actors,
      release: {
        date,
        releaseСountry
      },
      runtime,
      genres,
      description
    }
  } = film;

  return (
    `<div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="./${poster}" alt="">
        <p class="film-details__age">${ageRating}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${alternativeTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${totalRating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tbody><tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${correctEndOfWord('Writer', writers)}</td>
            <td class="film-details__cell">${writers.join(', ')}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actors.join(', ')}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${humanizeDate(date, 'day-month-year')}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${convertMinutesToHoursMinutes(runtime)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${releaseСountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${correctEndOfWord('Genre', genres)}</td>
            <td class="film-details__cell">${createGenresElements(genres)}</td>
          </tr>
        </tbody></table>

        <p class="film-details__film-description">${description}</p>
      </div>
    </div>`
  );
};

export default class FilmDetailsView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmDetailsTemplate(this.#film);
  }
}
