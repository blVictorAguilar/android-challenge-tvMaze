import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {Show} from './common/types';
import {LoadingStatus, Slices} from './common/enums';
import {fetchShowsAPI} from '../services/api';

interface ShowsState {
  shows: Show[];
  loading: LoadingStatus;
  error: string | null;
  page: number;
  isSynced: boolean;
}

const initialState: ShowsState = {
  shows: [],
  loading: LoadingStatus.IDLE,
  error: null,
  page: 1,
  isSynced: false,
};

export const fetchShows = createAsyncThunk(
  'shows/fetchShows',
  async (_, thunkAPI): Promise<Show[]> => {
    const {page} = (thunkAPI.getState() as RootState).shows;
    const response = await fetchShowsAPI(page + 1);
    return response;
  },
);

export const onLoadSync = createAsyncThunk(
  'shows/syncShows',
  async (_, thunkAPI): Promise<Show[]> => {
    const {page, isSynced, shows} = (thunkAPI.getState() as RootState).shows;
    if (isSynced) {
      return shows;
    }
    const response = await fetchShowsAPI(page);
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
        state.shows = [...state.shows, ...action.payload];
        state.loading = LoadingStatus.SUCCEEDED;
        state.error = null;
        state.page++;
      })
      .addCase(fetchShows.rejected, (state, action: PayloadAction<string>) => {
        state.loading = LoadingStatus.FAILED;
        state.error = action.payload;
      })
      .addCase(onLoadSync.pending, state => {
        state.loading = LoadingStatus.PENDING;
      })
      .addCase(onLoadSync.fulfilled, (state, action: PayloadAction<Show[]>) => {
        state.shows = action.payload;
        state.loading = LoadingStatus.SUCCEEDED;
        state.error = null;
        state.isSynced = true;
      })
      .addCase(onLoadSync.rejected, (state, action: PayloadAction<string>) => {
        state.loading = LoadingStatus.FAILED;
        state.error = action.payload;
      });
  },
});
export const showsActions = showsSlice.actions;
export const showsReducer = showsSlice.reducer;
export const selectShows = (state: RootState) => state.shows.shows;
