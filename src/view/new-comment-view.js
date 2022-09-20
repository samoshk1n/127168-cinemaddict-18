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
  }

  get template() {
    return createNewCommentTemplate(this._state);
  }

  static parseCommentToState = (comment) => ({...comment,
  // прописать изменяющиеся свойства
  });

  static parseStateToComment = (state) => {
    const comment = {...state};
    // добавить нужную инфу, удалить ненужные свойства
    return comment;
  };
}
