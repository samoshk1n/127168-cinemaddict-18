import AbstractView from '../framework/view/abstract-view.js';
import {
  KEYS_IN_ORDER,
  CATEGORY_MATCH
} from '../const.js';
import {makeFirstLetterUp} from '../utils/text.js';

const createNavigationItems = (propertiesCounts) => {
  let navigationItems = '';

  KEYS_IN_ORDER.forEach((key) => {
    const navigationMatchValue = CATEGORY_MATCH[key].navigation;
    const propertyCount = propertiesCounts[key];

    navigationItems += (
      `<a href="#${navigationMatchValue}" class="main-navigation__item">${makeFirstLetterUp(navigationMatchValue)} <span class="main-navigation__item-count">${propertyCount}</span></a>`
    );
  });

  return navigationItems;
};

const createNavigationTemplate = (propertiesCounts) => (
  `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${createNavigationItems(propertiesCounts)}
  </nav>`
);

export default class NavigationView extends AbstractView {
  #propertiesCounts = null;

  constructor(propertiesCounts) {
    super();
    this.#propertiesCounts = propertiesCounts;
  }

  get template() {
    return createNavigationTemplate(this.#propertiesCounts);
  }
}
