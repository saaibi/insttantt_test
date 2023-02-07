import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export const history = createBrowserHistory()

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
