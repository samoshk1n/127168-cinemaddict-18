import StatisticsView from '../view/statistics-view.js';
import {render} from '../render.js';

export default class StatisticsPresenter {
  init = (profileContainer) => {
    this.profileContainer = profileContainer;
    render(new StatisticsView(), this.profileContainer);
  };
}
