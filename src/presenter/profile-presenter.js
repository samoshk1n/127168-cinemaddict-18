import ProfileView from '../view/profile-view.js';
import {remove, render} from '../framework/render.js';

export default class ProfilePresenter {
  #filmsModel = null;
  #profileComponent = null;
  #profileContainer = null;

  constructor (profileContainer, filmsModel) {
    this.#profileContainer = profileContainer;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    if (this.#profileComponent) {
      remove(this.#profileComponent);
    }

    this.#profileComponent = new ProfileView(this.#filmsModel);
    render(this.#profileComponent, this.#profileContainer);
  };

  #handleModelEvent = (updateType) => {
    if (updateType) {
      this.init();
    }
  };
}
