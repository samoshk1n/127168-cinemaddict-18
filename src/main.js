import ProfilePresenter from './presenter/profile-presenter.js';
import NavigationPresenter from './presenter/navigation-presenter.js';
import FilmsPresenter from './presenter/films-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const profilePresenter = new ProfilePresenter();
const navigationPresenter = new NavigationPresenter();
const filmsPresenter = new FilmsPresenter();

profilePresenter.init(siteHeaderElement);
navigationPresenter.init(siteMainElement);
filmsPresenter.init(siteMainElement);
