import {createElement} from '../render.js';

const createFilmDetailsContainerTemplate = () => (
  `<section class="film-details">
    <div class="film-details__inner"></div>
  </section>`
);

export default class FilmDetailsContainerView {
  #element = null;

  get template() {
    return createFilmDetailsContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
