import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@redux/slices/authSlice';
import RootLayout from '@pages/RootLayout';
import { rootApi } from '@services/rootApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [RootLayout.reducerPath]: rootApi.reducer,
  },
});
