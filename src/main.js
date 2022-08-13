import ProfilePresenter from './presenter/profile-presenter.js';
import NavigationPresenter from './presenter/navigation-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import FilmsPresenter from './presenter/films-presenter.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const statisticElement = document.querySelector('.footer__statistics');

const profilePresenter = new ProfilePresenter();
const navigationPresenter = new NavigationPresenter();
const sortPresenter = new SortPresenter();
const filmsPresenter = new FilmsPresenter();
const statisticsPresenter = new StatisticsPresenter();

profilePresenter.init(siteHeaderElement);
navigationPresenter.init(siteMainElement);
sortPresenter.init(siteMainElement);
filmsPresenter.init(siteMainElement);
statisticsPresenter.init(statisticElement);
