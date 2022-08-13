import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class SortPresenter {
  init = (profileContainer) => {
    this.profileContainer = profileContainer;
    render(new SortView(), this.profileContainer);
  };
}
