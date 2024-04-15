import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Slices} from './common/enums';
import {RootState} from './store';
import {Show} from './common/types';

interface FavoritesState {
  favorites: Show[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: Slices.FAVORITES,
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Show>) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<number>) {
      const _id = action.payload;
      state.favorites = state.favorites.filter(({id}) => id !== _id);
    },
  },
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.favorites;

export const selectFavoriteById = (state: RootState, id: number) =>
  state.favorites.favorites.some(favorite => favorite.id === id);

export default favoritesSlice.reducer;
