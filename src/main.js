import FilmsPresenter from './presenter/films-presenter.js';
import NavigationPresenter from './presenter/navigation-presenter.js';
import ProfilePresenter from './presenter/profile-presenter.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';

import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/films-model.js';
import NavigationModel from './model/navigation-model.js';

import CommentsApiService from './comments-api-service.js';
import FilmsApiService from './films-api-service.js';
import {
  AUTHORIZATION,
  END_POINT
} from './const.js';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');
const statisticElement = siteBodyElement.querySelector('.footer__statistics');

const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const navigationModel = new NavigationModel();
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel, navigationModel);
const navigationPresenter = new NavigationPresenter(siteMainElement, filmsModel, navigationModel);
const profilePresenter = new ProfilePresenter(siteHeaderElement);
const statisticsPresenter = new StatisticsPresenter(statisticElement, filmsModel);

profilePresenter.init();
navigationPresenter.init();
filmsPresenter.init();
statisticsPresenter.init();
filmsModel.init();
