import SortView from '../view/sort-view.js';
import {
  render,
  RenderPosition
} from '../framework/render.js';

export default class SortPresenter {
  #films = null;
  #filmsComponent = null;

  constructor (filmsComponent, films) {
    this.#filmsComponent = filmsComponent;
    this.#films = films;
  }

  init = () => {
    if (this.#films.length) {
      render(new SortView(), this.#filmsComponent, RenderPosition.AFTERBEGIN);
    }
  };
}
