import FilmsPresenter from './presenter/films-presenter.js';

const siteMainElement = document.querySelector('.main');
const filmsPresenter = new FilmsPresenter();

filmsPresenter.init(siteMainElement);
