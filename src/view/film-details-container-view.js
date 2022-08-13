import {createElement} from '../render.js';

const createFilmDetailsContainerTemplate = () => (
  `<section class="film-details">
    <div class="film-details__inner"></div>
  </section>`
);

export default class FilmDetailsContainerView {
  getTemplate() {
    return createFilmDetailsContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
