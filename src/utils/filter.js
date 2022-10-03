import {NAVIGATION_TYPE} from '../const.js';

const filter = {
  [NAVIGATION_TYPE.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [NAVIGATION_TYPE.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [NAVIGATION_TYPE.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
};

export {filter};
