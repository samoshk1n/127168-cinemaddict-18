import NewHeaderProfileView from './view/header-profil-view.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');

render(new NewHeaderProfileView(), siteHeaderElement);
