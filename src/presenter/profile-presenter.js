import ProfileView from '../view/profile-view.js';
import {render} from '../render.js';

export default class ProfilePresenter {
  init = (profileContainer) => {
    this.profileContainer = profileContainer;
    render(new ProfileView(), this.profileContainer);
  };
}
