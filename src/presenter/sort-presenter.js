import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class SortPresenter {
  init = (sortContainer) => {
    this.sortContainer = sortContainer;
    render(new SortView(), this.sortContainer);
  };
}
