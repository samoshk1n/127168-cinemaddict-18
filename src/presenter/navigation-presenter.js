import NavigationView from '../view/navigation-view.js';
import {render} from '../framework/render.js';
import {filter} from '../utils/filter.js';
import {NAVIGATION_TYPE} from '../const.js';

export default class NavigationPresenter {
  #filmsModel = null;
  #navigationContainer = null;
  #navigationModel = null;

  constructor (navigationContainer, filmsModel, navigationModel) {
    this.#filmsModel = filmsModel;
    this.#navigationContainer = navigationContainer;
    this.#navigationModel = navigationModel;
  }

  init = () => {
    render(new NavigationView(this.filters, NAVIGATION_TYPE.ALL), this.#navigationContainer);
  };

  get filters() {
    const films = this.#filmsModel.films;

    return [
      {
        name: NAVIGATION_TYPE.ALL,
        href: 'all',
        count: '',
      },
      {
        name: NAVIGATION_TYPE.WATCHLIST,
        href: 'watchlist',
        count: filter[NAVIGATION_TYPE.WATCHLIST](films).length,
      },
      {
        name: NAVIGATION_TYPE.HISTORY,
        href: 'history',
        count: filter[NAVIGATION_TYPE.HISTORY](films).length,
      },
      {
        name: NAVIGATION_TYPE.FAVORITES,
        href: 'favorites',
        count: filter[NAVIGATION_TYPE.FAVORITES](films).length,
      }
    ];
  }
}
