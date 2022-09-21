import AbstractView from '../framework/view/abstract-view.js';

const createPopupTemplate = () => (
  `<section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
      </div>
    </div>
  </section>`
);

export default class PopupView extends AbstractView {
  get template() {
    return createPopupTemplate();
  }

  get topContainer() {
    return this.element.querySelector('.film-details__top-container');
  }

  get closeButtonElement() {
    return this.element.querySelector('.film-details__close-btn');
  }

  get filmDetailsInnerElement() {
    return this.element.querySelector('.film-details__inner');
  }

  setCloseButtonHandler = (callback) => {
    this._callback.click = callback;
    this.closeButtonElement.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
