import NavigationView from '../view/navigation-view.js';
import {render} from '../framework/render.js';
import {
  KEYS_IN_ORDER,
  NAVIGATION_TYPE
} from '../const.js';

export default class NavigationPresenter {
  #filmsModel = null;
  #navigationContainer = null;
  #navigationModel = null;
  #propertiesCounts = null;

  constructor (navigationContainer, filmsModel, navigationModel) {
    this.#filmsModel = filmsModel;
    this.#navigationContainer = navigationContainer;
    this.#navigationModel = navigationModel;
  }

  init = () => {
    this.#propertiesCounts = this.#createPropertiesCounts(KEYS_IN_ORDER, this.#filmsModel.films);

    render(new NavigationView(this.#propertiesCounts, NAVIGATION_TYPE.ALL), this.#navigationContainer);
  };

  #calculateNumFilmsByProperty = (films, property) => {
    let numberOfFilms = 0;

    films.forEach((film) => {
      const {userDetails} = film;

      if (userDetails[property]) {
        numberOfFilms++;
      }
    });

    return numberOfFilms;
  };

  #createPropertiesCounts = (properties, films) => {
    const propertiesCounts = {};

    properties.forEach((property) => {
      propertiesCounts[property] = this.#calculateNumFilmsByProperty(films, property);
    });

    return propertiesCounts;
  };
}
