import ProfilePresenter from './presenter/profile-presenter.js';
import NavigationPresenter from './presenter/navigation-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import FilmsPresenter from './presenter/films-presenter.js';
import StatisticsPresenter from './presenter/statistics-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';
import FilmsModel from './model/films-model.js';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');
const statisticElement = siteBodyElement.querySelector('.footer__statistics');

const profilePresenter = new ProfilePresenter();
const navigationPresenter = new NavigationPresenter();
const sortPresenter = new SortPresenter();
const filmsPresenter = new FilmsPresenter();
const statisticsPresenter = new StatisticsPresenter();
const popupPresenter = new PopupPresenter();
const filmsModel = new FilmsModel();

profilePresenter.init(siteHeaderElement);
navigationPresenter.init(siteMainElement);
sortPresenter.init(siteMainElement);
filmsPresenter.init(siteMainElement, filmsModel);
statisticsPresenter.init(statisticElement);
popupPresenter.init(siteBodyElement, filmsModel);
