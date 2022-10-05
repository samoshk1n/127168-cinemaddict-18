import ApiService from './framework/api-service.js';
import {HTTP_METHOD} from './const.js';

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateFilm = async (film) => {
    const response = await this._load({
      url: `movies/${film.id}`,
      method: HTTP_METHOD.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (film) => {
    const adaptedFilm = {...film,
      'film_info': {
        ...film['filmInfo'],
        'alternative_title': film['filmInfo']['alternativeTitle'],
        'total_rating': film['filmInfo']['totalRating'],
        'age_rating': film['filmInfo']['ageRating'],
        'genre': film['filmInfo']['genres'],
        release: {
          ...film['filmInfo']['release'],
          'release_country': film['filmInfo']['release']['releaseСountry']
        }
      },

      'user_details': {
        ...film['userDetails'],
        'already_watched': film['userDetails']['alreadyWatched'],
        'watching_date': film['userDetails']['watchingDate']
      }
    };

    delete adaptedFilm['filmInfo'];
    delete adaptedFilm.filmInfo['alternativeTitle'];
    delete adaptedFilm.filmInfo['totalRating'];
    delete adaptedFilm.filmInfo['ageRating'];
    delete adaptedFilm.filmInfo['genres'];
    delete adaptedFilm.filmInfo.release['releaseСountry'];

    delete adaptedFilm['userDetails'];
    delete adaptedFilm.userDetails['alreadyWatched'];
    delete adaptedFilm.userDetails['watchingDate'];

    return adaptedFilm;
  };
}
