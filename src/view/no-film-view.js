import AbstractView from '../framework/view/abstract-view.js';
import {NavigationType} from '../const.js';

const NoFilmsText = {
  [NavigationType.ALL]: 'There are no movies in our database',
  [NavigationType.WATCHLIST]: 'There are no movies in watchlist',
  [NavigationType.HISTORY]: 'There are no movies in history',
  [NavigationType.FAVORITES]: 'There are no movies in favorites',
};

const createNoFilmTemplate = (currentFilter) => {
  const noFilmTextValue = NoFilmsText[currentFilter];

  return (
    `<section class="films-list">
      <h2 class="films-list__title">${noFilmTextValue}</h2>
    </section>`);
};


export default class NoFilmView extends AbstractView {
  #currentFilter = null;

  constructor(currentFilter) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createNoFilmTemplate(this.#currentFilter);
  }
}
