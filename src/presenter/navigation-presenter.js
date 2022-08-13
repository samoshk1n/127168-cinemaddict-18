import NavigationView from '../view/navigation-view.js';
import {render} from '../render.js';

export default class NavigationPresenter {
  init = (navigationContainer) => {
    this.navigationContainer = navigationContainer;
    render(new NavigationView(), this.navigationContainer);
  };
}
