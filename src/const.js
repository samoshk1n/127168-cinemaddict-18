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
const NUMBER_OF_COMMENTS = 50;
const NUMBER_OF_FILMS = 18;
const SORT_TYPE = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export {
  CATEGORY_MATCH,
  EMOTIONS,
  FILMS_PER_STEP,
  KEYS_IN_ORDER,
  NUMBER_OF_COMMENTS,
  NUMBER_OF_FILMS,
  SORT_TYPE
};
