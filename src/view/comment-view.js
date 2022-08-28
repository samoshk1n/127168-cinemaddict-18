import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate} from '../utils.js';

const createCommentTemplate = (currentComment) => {
  const {
    author,
    comment,
    date,
    emotion
  } = currentComment;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${humanizeDate(date, 'full')}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

export default class CommentView extends AbstractView {
  #currentComment = null;

  constructor(currentComment) {
    super();
    this.#currentComment = currentComment;
  }

  get template() {
    return createCommentTemplate(this.#currentComment);
  }
}
