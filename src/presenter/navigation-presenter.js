import NavigationView from '../view/navigation-view.js';
import {render} from '../render.js';

export default class NavigationPresenter {
  #navigationContainer = null;

  constructor (navigationContainer) {
    this.#navigationContainer = navigationContainer;
  }

  init = () => render(new NavigationView(), this.#navigationContainer);
}
