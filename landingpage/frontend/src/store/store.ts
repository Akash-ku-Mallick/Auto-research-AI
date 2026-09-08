import { configureStore } from '@reduxjs/toolkit';
import landingReducer from './slices/landingSlice';

export const store = configureStore({
  reducer: {
    landing: landingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
