import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Slices} from './common/enums';

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

export default favoritesSlice.reducer;
