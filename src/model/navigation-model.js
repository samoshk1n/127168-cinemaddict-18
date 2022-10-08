import Observable from '../framework/observable.js';
import {NavigationType} from '../const.js';

export default class NavigationModel extends Observable {
  #navigation = NavigationType.ALL;

  get filter() {
    return this.#navigation;
  }

  setNavigation = (updateType, navigation) => {
    this.#navigation = navigation;
    this._notify(updateType, navigation);
  };

  get currentNavigation() {
    return this.#navigation;
  }
}
