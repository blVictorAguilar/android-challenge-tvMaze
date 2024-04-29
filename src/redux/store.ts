import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

import {persistStore, PERSIST} from 'redux-persist';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
      immutableCheck: false,
    }),
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;
