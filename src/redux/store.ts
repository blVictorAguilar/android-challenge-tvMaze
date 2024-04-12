import {configureStore} from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import {showsReducer} from './showsSlice';
const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    shows: showsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
