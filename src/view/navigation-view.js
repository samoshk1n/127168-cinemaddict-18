import AbstractView from '../framework/view/abstract-view.js';
import {
  KEYS_IN_ORDER,
  CATEGORY_MATCH,
  NAVIGATION_TYPE
} from '../const.js';
import {makeFirstLetterUp} from '../utils/text.js';

const createNavigationItems = (propertiesCounts, currentNavigationType) => {
  let navigationItem = '';

  KEYS_IN_ORDER.forEach((key) => {
    const navigationMatchValue = CATEGORY_MATCH[key].navigation;
    const propertyCount = propertiesCounts[key];

    navigationItem += (
      `<a href="#${navigationMatchValue}"
      class="main-navigation__item ${currentNavigationType === key ? 'main-navigation__item--active' : ''}">${makeFirstLetterUp(navigationMatchValue)}
      <span class="main-navigation__item-count">${propertyCount}</span>
      </a>`
    );
  });

  return navigationItem;
};

const createNavigationTemplate = (propertiesCounts, currentNavigationType) => (
  `<nav class="main-navigation">
    <a href="#all"
    class="main-navigation__item ${currentNavigationType === NAVIGATION_TYPE.ALL ? 'main-navigation__item--active' : ''}">All movies</a>
    ${createNavigationItems(propertiesCounts, currentNavigationType)}
  </nav>`
);

export default class NavigationView extends AbstractView {
  #propertiesCounts = null;
  #currentNavigationType = null;

  constructor(propertiesCounts, currentNavigationType) {
    super();
    this.#propertiesCounts = propertiesCounts;
    this.#currentNavigationType = currentNavigationType;
  }

  get template() {
    return createNavigationTemplate(this.#propertiesCounts, this.#currentNavigationType);
  }

  setNavigationTypeChangeHandler = (callback) => {
    this._callback.navigationTypeChange = callback;
    this.element.addEventListener('click', this.#navigationTypeChangeHandler);
  };

  #navigationTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    console.log(evt.target.tagName);
  };
}
