import ProfileView from '../view/profil-view.js';
import {render} from '../render.js';

export default class ProfilePresenter {
  init = (profileContainer) => {
    this.profileContainer = profileContainer;
    render(new ProfileView(), this.profileContainer);
  };
}
