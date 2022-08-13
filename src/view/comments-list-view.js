import {createElement} from '../render.js';

const createFilmsListTemplate = () => '<ul class="film-details__comments-list"></ul>';

export default class CommentsListView {
  getTemplate() {
    return createFilmsListTemplate();
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
