import {createElement} from '../render.js';

const createFilmCommentsTemplate = (numComments) => (
  `<div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${numComments}</span></h3>
    </section>
  </div>`
);

export default class FilmCommentsView {
  #element = null;
  #numComments = null;

  constructor (numComments) {
    this.#numComments = numComments;
  }

  get template() {
    return createFilmCommentsTemplate(this.#numComments);
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
