import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {Show} from './common/types';
import {LoadingStatus, Slices} from './common/enums';
import {fetchShowsAPI} from '../services/api';

interface ShowsState {
  shows: Show[];
  loading: LoadingStatus;
  error: string | null;
}

const initialState: ShowsState = {
  shows: [],
  loading: LoadingStatus.IDLE,
  error: null,
};

export const fetchShows = createAsyncThunk(
  'shows/fetchShows',
  async (): Promise<Show[]> => {
    const response = await fetchShowsAPI();
    return response;
  },
);

const showsSlice = createSlice({
  name: Slices.SHOWS,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchShows.pending, state => {
        state.loading = LoadingStatus.PENDING;
      })
      .addCase(fetchShows.fulfilled, (state, action: PayloadAction<Show[]>) => {
        state.shows = action.payload;
        state.loading = LoadingStatus.SUCCEEDED;
        state.error = null;
      })
      .addCase(fetchShows.rejected, (state, action: PayloadAction<string>) => {
        state.loading = LoadingStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export const showsActions = showsSlice.actions;
export const showsReducer = showsSlice.reducer;

export const selectShows = (state: RootState) => state.shows.shows;
