import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {EMOTIONS} from '../const.js';

const START_STATEFUL = {
  comment: '',
  emotion: null
};

const checkEmotion = (emotion, state) => emotion === state ? 'checked' : '';

const createEmotionInputs = (state) => EMOTIONS.reduce((acc, emotion) => (
  `${acc}
  <input class="film-details__emoji-item visually-hidden"
    name="comment-emoji"
    type="radio"
    id="emoji-${emotion}"
    value="${emotion}"
    ${checkEmotion(emotion, state.emotion)}>
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>`
), '');

const createEmotionLabel = (state) => (
  state.emotion ? `<img src="./images/emoji/${state.emotion}.png" width="55" height="55" alt="${state.emotion}">` : ''
);

const createNewCommentTemplate = (state) => (
  `<form class="film-details__new-comment" action="" method="get">
    <div class="film-details__add-emoji-label">
      ${createEmotionLabel(state)}
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${state.comment}</textarea>
    </label>

    <div class="film-details__emoji-list">
      ${createEmotionInputs(state)}
    </div>
  </form>`
);

export default class NewCommentView extends AbstractStatefulView {
  constructor(state = START_STATEFUL) {
    super();

    this._state = state;

    this.#setInnerHandlers();
  }

  get template() {
    return createNewCommentTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  #emojiInputHandler = (evt) => {
    evt.preventDefault();

    const target = evt.target;

    if (target.nodeName === 'IMG') {
      this.updateElement({
        emotion: target.parentNode.htmlFor.replace('emoji-', ''),
      });
    }

    if ((target.nodeName === 'LABEL')) {
      this.updateElement({
        emotion: target.htmlFor.replace('emoji-', ''),
      });
    }
  };

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      comment: evt.target.value
    });
  };

  setAddCommentShortcutHandler = (callback) => {
    this._callback.addCommentShortcut = callback;
    document.addEventListener('keydown', this.addCommentShortcutHandler);
  };

  addCommentShortcutHandler = (evt) => {

    if ((this._state.comment && this._state.emotion) &&
       ((evt.metaKey && evt.key === 'Enter') ||
       (evt.ctrlKey && evt.key === 'Enter'))) {
      this._callback.addCommentShortcut(this._state);
    }
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#emojiInputHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputHandler);
  };
}
