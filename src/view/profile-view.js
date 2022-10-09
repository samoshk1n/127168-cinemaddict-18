import AbstractView from '../framework/view/abstract-view.js';
import {ProfileRank} from '../const.js';


const checkProfileRank = (filmsModel) => {
  const alreadyWatchedFilms = filmsModel.films.filter((film) => film.userDetails.alreadyWatched);
  if (alreadyWatchedFilms.length === ProfileRank.NO_RANK.MAX_LENGTH) {
    return ProfileRank.NO_RANK.TEXT;
  } else if (alreadyWatchedFilms.length <= ProfileRank.NOVICE.MAX_LENGTH) {
    return ProfileRank.NOVICE.TEXT;
  } else if (alreadyWatchedFilms.length <= ProfileRank.FAN.MAX_LENGTH) {
    return ProfileRank.FAN.TEXT;
  }

  return ProfileRank.MOVIE_BUFF.TEXT;
};

const createProfileTemplate = (filmsModel) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${checkProfileRank(filmsModel)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class ProfileView extends AbstractView {
  #filmsModel = null;

  constructor(filmsModel) {
    super();
    this.#filmsModel = filmsModel;
  }

  get template() {
    return createProfileTemplate(this.#filmsModel);
  }
}
