import {combineReducers, configureStore} from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import {showsReducer} from './showsSlice';
import {recentSearchReducer} from './searchedSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
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
const combinedReducers = combineReducers({
  favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
  shows: persistReducer(showsPersistConfig, showsReducer),
  recents: persistReducer(recentSearchedPersistConfig, recentSearchReducer),
});

const store = configureStore({
  reducer: combinedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;
