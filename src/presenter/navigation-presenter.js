import NavigationView from '../view/navigation-view.js';
import {render} from '../framework/render.js';
import {KEYS_IN_ORDER} from '../const.js';

export default class NavigationPresenter {
  #filmInformations = null;
  #filmsModel = null;
  #navigationContainer = null;
  #properties = null;
  #propertiesCounts = null;

  constructor (navigationContainer, filmsModel) {
    this.#filmsModel = filmsModel;
    this.#navigationContainer = navigationContainer;
  }

  init = () => {
    this.#filmInformations = [...this.#filmsModel.films];
    this.#propertiesCounts = this.#createPropertiesCounts(KEYS_IN_ORDER, this.#filmInformations);

    render(new NavigationView(this.#propertiesCounts), this.#navigationContainer);
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
