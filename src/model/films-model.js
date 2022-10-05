import {generateFilm} from '../mock/film.js';
import Observable from '../framework/observable.js';
import {NUMBER_OF_FILMS} from '../const.js';

export default class FilmsModel extends Observable {
  #filmsApiService = null;
  #films = Array.from({length: NUMBER_OF_FILMS}, generateFilm);

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;

    this.#filmsApiService.films.then((films) => {
      console.log(films.map(this.#adaptToClient)[0]);
    });
  }

  #adaptToClient = (film) => {
    const adaptedFilm = {...film,
      filmInfo: {
        ...film['film_info'],
        alternativeTitle: film['film_info']['alternative_title'],
        totalRating: film['film_info']['total_rating'],
        ageRating: film['film_info']['age_rating'],
        genres: film['film_info']['genre'],
        release: {
          ...film['film_info']['release'],
          releaseСountry: film['film_info']['release']['release_country']
        }
      },

      userDetails: {
        ...film['user_details'],
        alreadyWatched: film['user_details']['already_watched'],
        watchingDate: film['user_details']['watching_date']
      }
    };

    delete adaptedFilm['film_info'];
    delete adaptedFilm.filmInfo['alternative_title'];
    delete adaptedFilm.filmInfo['total_rating'];
    delete adaptedFilm.filmInfo['age_rating'];
    delete adaptedFilm.filmInfo['genre'];
    delete adaptedFilm.filmInfo.release['release_country'];

    delete adaptedFilm['user_details'];
    delete adaptedFilm.userDetails['already_watched'];
    delete adaptedFilm.userDetails['watching_date'];

    return adaptedFilm;
  };

  get films () {
    return this.#films;
  }

  updateFilm = (updateType, update) => {
    const index = this.films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#films = [
      ...this.films.slice(0, index),
      update,
      ...this.films.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
