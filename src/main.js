import FilmsPresenter from './presenter/films-presenter.js';
import NavigationPresenter from './presenter/navigation-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';
import ProfilePresenter from './presenter/profile-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';

import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/films-model.js';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');
const statisticElement = siteBodyElement.querySelector('.footer__statistics');

const filmsPresenter = new FilmsPresenter();
const navigationPresenter = new NavigationPresenter();
const popupPresenter = new PopupPresenter();
const profilePresenter = new ProfilePresenter();
const sortPresenter = new SortPresenter();
const statisticsPresenter = new StatisticsPresenter();
const commentsModel = new CommentsModel();
const filmsModel = new FilmsModel();

profilePresenter.init(siteHeaderElement);
navigationPresenter.init(siteMainElement);
sortPresenter.init(siteMainElement);
filmsPresenter.init(siteMainElement, filmsModel);
statisticsPresenter.init(statisticElement);
popupPresenter.init(siteBodyElement, filmsModel, commentsModel);
