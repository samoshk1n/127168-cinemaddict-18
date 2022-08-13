import NavigationView from '../view/navigation-view.js';
import {render} from '../render.js';

export default class NavigationPresenter {
  init = (profileContainer) => {
    this.profileContainer = profileContainer;
    render(new NavigationView(), this.profileContainer);
  };
}
