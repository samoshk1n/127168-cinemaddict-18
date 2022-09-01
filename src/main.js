import FilmsPresenter from './presenter/films-presenter.js';
import NavigationPresenter from './presenter/navigation-presenter.js';
import ProfilePresenter from './presenter/profile-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';

import FilmsModel from './model/films-model.js';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');
const statisticElement = siteBodyElement.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel);
const navigationPresenter = new NavigationPresenter(siteMainElement, filmsModel);
const profilePresenter = new ProfilePresenter(siteHeaderElement);
const sortPresenter = new SortPresenter(siteMainElement, filmsModel);
const statisticsPresenter = new StatisticsPresenter(statisticElement);

profilePresenter.init();
navigationPresenter.init();
sortPresenter.init();
filmsPresenter.init();
statisticsPresenter.init();
