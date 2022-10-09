const FILMS_PER_STEP = 5;
const AUTHORIZATION = 'Basic d97h8q4hgcg029d84';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict/';

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
const KEYS_IN_ORDER = ['watchlist', 'alreadyWatched', 'favorite'];


// В CategoryMatch свойства записаны через camelCase из-за перечисления в коде по KEYS_IN_ORDER (для сохранения порядка). В свою очередь, наименования 'watchlist', 'alreadyWatched', 'favorite' - это наименования из структуры данных. Поэтому эти свойства оставлены в написании camelCase
const CategoryMatch = {
  watchlist: {
    active: 'Already in watchlist',
    inactive: 'Add to watchlist',
    id: 'watchlist'
  },
  alreadyWatched: {
    active: 'Already watched',
    inactive: 'Not watched yet',
    id: 'watched'
  },
  favorite: {
    active: 'Already in favorites',
    inactive: 'Add to favorites',
    id: 'favorite'
  }
};

const ProfileRank = {
  NO_RANK: {
    TEXT: '',
    MAX_LENGTH: 0,
  },
  NOVICE: {
    TEXT: 'Novice',
    MAX_LENGTH: 10,
  },
  FAN: {
    TEXT: 'Fan',
    MAX_LENGTH: 20,
  },
  MOVIE_BUFF: {
    TEXT: 'Movie Buff',
    MAX_LENGTH: Infinity,
  }
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const NavigationType = {
  ALL: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const HttpMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};


export {
  AUTHORIZATION,
  CategoryMatch,
  EMOTIONS,
  END_POINT,
  FILMS_PER_STEP,
  HttpMethod,
  KEYS_IN_ORDER,
  NavigationType,
  ProfileRank,
  SortType,
  UserAction,
  UpdateType
};
