import AbstractView from '../framework/view/abstract-view.js';

const createCommentsContainerTemplate = (numComments) => (
  `<div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${numComments}</span></h3>
      <ul class="film-details__comments-list">
      </ul>
    </section>
  </div>`
);

export default class CommentsContainerView extends AbstractView {
  #numComments = null;

  constructor (numComments) {
    super();
    this.#numComments = numComments;
  }

  get template() {
    return createCommentsContainerTemplate(this.#numComments);
  }

  get commentsList() {
    return this.element.querySelector('.film-details__comments-list');
  }

  get commentsWrap() {
    return this.element.querySelector('.film-details__comments-wrap');
  }
}
