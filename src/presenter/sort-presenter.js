import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class SortPresenter {
  #filmsModel = null;
  #filmInformations = null;
  #sortContainer = null;

  constructor (sortContainer, filmsModel) {
    this.#sortContainer = sortContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#filmInformations = [...this.#filmsModel.films];

    if (this.#filmInformations.length) {
      render(new SortView(), this.#sortContainer);
    }
  };
}
