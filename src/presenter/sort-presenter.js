import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class SortPresenter {
  #sortContainer = null;

  constructor (sortContainer) {
    this.#sortContainer = sortContainer;
  }

  init = () => render(new SortView(), this.#sortContainer);
}
