import {createElement} from '../render.js';

const createPopupTemplate = (numComments) => (
  `<section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${numComments}</span></h3>
          <ul class="film-details__comments-list">
          </ul>
        </section>
      </div>
    </div>
  </section>`
);

export default class PopupView {
  #element = null;
  #numComments = null;

  constructor (numComments) {
    this.#numComments = numComments;
  }

  get template() {
    return createPopupTemplate(this.#numComments);
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

  get topContainer() {
    return this.element.querySelector('.film-details__top-container');
  }

  get commentsList() {
    return this.element.querySelector('.film-details__comments-list');
  }

  get commentsWrap() {
    return this.element.querySelector('.film-details__comments-wrap');
  }

  get closeButtonElement() {
    return this.element.querySelector('.film-details__close-btn');
  }
}
