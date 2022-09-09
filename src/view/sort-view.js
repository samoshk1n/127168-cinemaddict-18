import AbstractView from '../framework/view/abstract-view.js';
import {SORT_TYPE} from '../const.js';

const createSortTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SORT_TYPE.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPE.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SORT_TYPE.RATING}">Sort by rating</a></li>
  </ul>`
);

export default class SortView extends AbstractView {
  #currentSortType = SORT_TYPE.DEFAULT;

  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.#changeActiveClass(evt.target);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

  #changeActiveClass = (currentElement) => {
    const buttons = this.element.querySelectorAll('.sort__button');
    buttons.forEach((button) => button.classList.remove('sort__button--active'));
    currentElement.classList.add('sort__button--active');
  };
}
