import {combineReducers, configureStore} from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import {showsReducer} from './showsSlice';
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

const favoritesPersistConfig = {
  key: 'favorites',
  storage,
};

const showsPersistConfig = {
  key: 'shows',
  storage,
};

const combinedReducers = combineReducers({
  favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
  shows: persistReducer(showsPersistConfig, showsReducer),
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
