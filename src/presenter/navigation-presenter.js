import NavigationView from '../view/navigation-view.js';
import {filter} from '../utils/filter.js';
import {
  NAVIGATION_TYPE,
  UPDATE_TYPE
} from '../const.js';
import {
  remove,
  render,
  replace
} from '../framework/render.js';

export default class NavigationPresenter {
  #filmsModel = null;
  #navigationContainer = null;
  #navigationModel = null;

  #navigationComponent = null;

  constructor (navigationContainer, filmsModel, navigationModel) {
    this.#filmsModel = filmsModel;
    this.#navigationContainer = navigationContainer;
    this.#navigationModel = navigationModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#navigationModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const filters = this.filters;
    const prevNavigationComponent = this.#navigationComponent;

    this.#navigationComponent = new NavigationView(filters, this.#navigationModel.filter);
    this.#navigationComponent.setNavigationTypeChangeHandler(this.#handleNavigationTypeChange);

    if (prevNavigationComponent === null) {
      render(this.#navigationComponent, this.#navigationContainer);
      return;
    }

    replace(this.#navigationComponent, prevNavigationComponent);
    remove(prevNavigationComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleNavigationTypeChange = (navigationType) => {
    if (this.#navigationModel.filter === navigationType) {
      return;
    }

    this.#navigationModel.setFilter(UPDATE_TYPE.MAJOR, navigationType);
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
