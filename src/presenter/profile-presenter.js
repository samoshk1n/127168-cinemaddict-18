import ProfileView from '../view/profile-view.js';
import {render} from '../render.js';

export default class ProfilePresenter {
  #profileContainer = null;

  constructor (profileContainer) {
    this.#profileContainer = profileContainer;
  }

  init = () => render(new ProfileView(), this.#profileContainer);
}
