const CATEGORY_MATCH = {
  watchlist: {
    active: 'Already in watchlist',
    inactive: 'Add to watchlist',
    id: 'watchlist',
    navigation: 'watchlist'
  },
  alreadyWatched: {
    active: 'Already watched',
    inactive: 'Not watched yet',
    id: 'watched',
    navigation: 'history'
  },
  favorite: {
    active: 'Already in favorites',
    inactive: 'Add to favorites',
    id: 'favorite',
    navigation: 'favorites'
  }
};
const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
const FILMS_PER_STEP = 5;
const KEYS_IN_ORDER = ['watchlist', 'alreadyWatched', 'favorite'];

const SORT_TYPE = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const NAVIGATION_TYPE = {
  ALL: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

const USER_ACTION = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const HTTP_METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const AUTHORIZATION = 'Basic d97h8q4hgcg029d84';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict/';

export {
  AUTHORIZATION,
  CATEGORY_MATCH,
  EMOTIONS,
  END_POINT,
  FILMS_PER_STEP,
  HTTP_METHOD,
  KEYS_IN_ORDER,
  NAVIGATION_TYPE,
  SORT_TYPE,
  USER_ACTION,
  UPDATE_TYPE
};
