// rootReducer.ts
import {combineReducers} from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import {showsReducer} from './showsSlice';
import {recentSearchReducer} from './searchedSlice';
import {persistReducer} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import {Slices} from './common/enums';

const favoritesPersistConfig = {
  key: Slices.FAVORITES,
  storage,
};

const showsPersistConfig = {
  key: Slices.SHOWS,
  storage,
};

const recentSearchedPersistConfig = {
  key: Slices.RECENT_SEARCHES,
  storage,
};

const rootReducer = combineReducers({
  favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
  shows: persistReducer(showsPersistConfig, showsReducer),
  recents: persistReducer(recentSearchedPersistConfig, recentSearchReducer),
});

export default rootReducer;
