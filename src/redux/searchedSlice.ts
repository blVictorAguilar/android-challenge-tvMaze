import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Slices} from './common/enums';
import {RootState} from './store';
import {Show} from './common/types';

interface RecentSearchesState {
  searches: Show[];
}

const initialState: RecentSearchesState = {
  searches: [],
};

const recentSearchesSlice = createSlice({
  name: Slices.RECENT_SEARCHES,
  initialState,
  reducers: {
    addRecentSearch(state, action: PayloadAction<Show>) {
      const existingIndex = state.searches.findIndex(
        search => search.id === action.payload.id,
      );
      if (existingIndex !== -1) {
        state.searches.splice(existingIndex, 1);
      }
      state.searches.unshift(action.payload);
      if (state.searches.length > 10) {
        state.searches.pop();
      }
    },
  },
});

export const {addRecentSearch} = recentSearchesSlice.actions;

export const selectRecentSearches = (state: RootState) =>
  state.recentSearches.searches;

export const recentSearchReducer = recentSearchesSlice.reducer;
