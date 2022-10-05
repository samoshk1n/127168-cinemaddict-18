import AbstractView from '../framework/view/abstract-view.js';

const createNavigationItemTemplate = (filter, currentNavigationType) => {
  const {name, href, count} = filter;

  return `<a href="#${href}"
  class="main-navigation__item ${currentNavigationType === name ? 'main-navigation__item--active' : ''}"
  data-navigation-type="${name}">${name}
  ${count ? `<span class="main-navigation__item-count">${count}</span>` : ''}
  </a>`;
};

const createNavigationTemplate = (navigationItems, currentNavigationType) => {
  const navigationItemsTemplate = navigationItems
    .map((filter) => createNavigationItemTemplate(filter, currentNavigationType))
    .join('');

  return `<nav class="main-navigation">${navigationItemsTemplate}<nav>`;
};

export default class NavigationView extends AbstractView {
  #filters = null;
  #currentNavigationType = null;

  constructor(filters, currentNavigationType) {
    super();
    this.#filters = filters;
    this.#currentNavigationType = currentNavigationType;
  }

  get template() {
    return createNavigationTemplate(this.#filters, this.#currentNavigationType);
  }

  setNavigationTypeChangeHandler = (callback) => {
    this._callback.navigationTypeChange = callback;
    this.element.addEventListener('click', this.#navigationTypeChangeHandler);
  };

  #navigationTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A' && evt.target.tagName !== 'SPAN') {
      return;
    }

    evt.preventDefault();

    const target = evt.target;

    switch(target.nodeName) {
      case 'A':
        return this._callback.navigationTypeChange(target.dataset.navigationType);
      case 'SPAN':
        this._callback.navigationTypeChange(target.parentNode.dataset.navigationType);
    }
  };
}
