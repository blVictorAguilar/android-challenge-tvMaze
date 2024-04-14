import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';
import {Slices} from './common/enums';
import {RootState} from './store';
import {Show} from './common/types';

interface FavoritesState {
  favorites: number[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: Slices.FAVORITES,
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<number>) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.favorites = state.favorites.filter(favoriteId => favoriteId !== id);
    },
  },
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.favorites;

export const selectFavoriteById = (state: RootState, id: number) =>
  state.favorites.favorites.some(_id => _id === id);

export const selectFavoriteShows = createSelector(
  [selectFavorites, state => state.shows.shows],
  (favoriteIds, shows) =>
    favoriteIds.map((id: number) => shows.find((show: Show) => show.id === id)),
);

export default favoritesSlice.reducer;
