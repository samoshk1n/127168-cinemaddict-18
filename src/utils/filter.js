import {NavigationType} from '../const.js';

const filter = {
  [NavigationType.ALL]: (films) => films,
  [NavigationType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [NavigationType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [NavigationType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
};

export {filter};
