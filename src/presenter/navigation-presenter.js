import NavigationView from '../view/navigation-view.js';
import {filter} from '../utils/filter.js';
import {
  NavigationType,
  UpdateType
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

    this.#navigationModel.setNavigation(UpdateType.MAJOR, navigationType);
  };

  get filters() {
    const films = this.#filmsModel.films;

    return [
      {
        name: NavigationType.ALL,
        href: 'all',
        count: '',
      },
      {
        name: NavigationType.WATCHLIST,
        href: 'watchlist',
        count: filter[NavigationType.WATCHLIST](films).length,
      },
      {
        name: NavigationType.HISTORY,
        href: 'history',
        count: filter[NavigationType.HISTORY](films).length,
      },
      {
        name: NavigationType.FAVORITES,
        href: 'favorites',
        count: filter[NavigationType.FAVORITES](films).length,
      }
    ];
  }
}
