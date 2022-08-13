import ProfilePresenter from './presenter/profile-presenter.js';
import FilmsPresenter from './presenter/films-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const profilePresenter = new ProfilePresenter();
const filmsPresenter = new FilmsPresenter();

profilePresenter.init(siteHeaderElement);
filmsPresenter.init(siteMainElement);
