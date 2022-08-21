import {createElement} from '../render.js';

const createFilmsListTemplate = () => '<ul class="film-details__comments-list"></ul>';

export default class CommentsListView {
  #element = null;

  get template() {
    return createFilmsListTemplate();
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
