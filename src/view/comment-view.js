import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate} from '../utils/date.js';
import he from 'he';

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
      <p class="film-details__comment-text">${he.encode(comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${humanizeDate(date, 'human')}</span>
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

  setDeleteCommentClickHandler = (callback) => {
    this._callback.deleteCommentClick = callback;
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#deleteCommentClickHandler);
  };

  #deleteCommentClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteCommentClick(this.currentCommentID);
  };

  get currentCommentID() {
    return this.#currentComment.id;
  }
}
