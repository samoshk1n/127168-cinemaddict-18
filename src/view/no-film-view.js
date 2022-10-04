import AbstractView from '../framework/view/abstract-view.js';
import {NAVIGATION_TYPE} from '../const.js';

const NO_FILMS_TEXT = {
  [NAVIGATION_TYPE.ALL]: 'There are no movies in our database',
  [NAVIGATION_TYPE.WATCHLIST]: 'There are no movies in watchlist',
  [NAVIGATION_TYPE.HISTORY]: 'There are no movies in history',
  [NAVIGATION_TYPE.FAVORITES]: 'There are no movies in favorites',
};

const createNoFilmTemplate = (currentFilter) => {
  const noFilmTextValue = NO_FILMS_TEXT[currentFilter];

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
