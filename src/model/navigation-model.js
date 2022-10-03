import Observable from '../framework/observable.js';
import {NAVIGATION_TYPE} from '../const.js';

export default class NavigationModel extends Observable {
  #navigation = NAVIGATION_TYPE.ALL;

  get filter() {
    return this.#navigation;
  }

  setNavigation = (updateType, navigation) => {
    this.#navigation = navigation;
    this._notify(updateType, navigation);
  };
}
