import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
  </section>`
);

export default class FilmsListView extends AbstractView {
  get template() {
    return createFilmsListTemplate();
  }

  get filmsListTitle() {
    return this.element.querySelector('.films-list__title');
  }

  get filmsListContainer() {
    return this.element.querySelector('.films-list__container');
  }
}
