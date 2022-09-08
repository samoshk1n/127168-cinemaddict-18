import FilmsPresenter from './presenter/films-presenter.js';
import NavigationPresenter from './presenter/navigation-presenter.js';
import ProfilePresenter from './presenter/profile-presenter.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';

import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/films-model.js';
import StatisticsModel from './model/statistics-model.js';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');
const statisticElement = siteBodyElement.querySelector('.footer__statistics');

const commentsModel = new CommentsModel();
const filmsModel = new FilmsModel();
const statisticsModel = new StatisticsModel();
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel);
const navigationPresenter = new NavigationPresenter(siteMainElement, filmsModel);
const profilePresenter = new ProfilePresenter(siteHeaderElement);
const statisticsPresenter = new StatisticsPresenter(statisticElement, statisticsModel);

profilePresenter.init();
navigationPresenter.init();
filmsPresenter.init();
statisticsPresenter.init();
