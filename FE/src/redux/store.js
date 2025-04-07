// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import authReducer from '@redux/slices/authSlice';
// import snackbarReducer from '@redux/slices/snackbarSlice';
// import settingsReducer from '@redux/slices/settingsSlice';
// import dialogReducer from '@redux/slices/dialogSlice';

// // import RootLayout from '@pages/RootLayout';
// import { rootApi } from '@services/rootApi';
// import persistReducer from 'redux-persist/es/persistReducer';
// import storage from 'redux-persist/lib/storage';
// import {
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
//   REHYDRATE,
// } from 'redux-persist';
// import persistStore from 'redux-persist/es/persistStore';
// import { logOutMiddleware } from './middleware';

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
//   blackList: [
//     rootApi.reducerPath,
//     // dialogReducer.reducerPath,
//     // settingsReducer.reducerPath,
//   ],
// };

// const persistedReducer = persistReducer(
//   persistConfig,
//   combineReducers({
//     auth: authReducer,
//     snackbar: snackbarReducer,
//     settings: settingsReducer,
//     dialog: dialogReducer,
//     [rootApi.reducerPath]: rootApi.reducer,
//   }),
// );

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware({
//       serializableCheck: {
//         ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         // ignoredPaths: ['dialog.content', 'dialog.actions'],
//       },
//     }).concat(logOutMiddleware, rootApi.middleware);
//   },
// });

// export const persistor = persistStore(store);

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@redux/slices/authSlice';
import snackbarReducer from '@redux/slices/snackbarSlice';
import settingsReducer from '@redux/slices/settingsSlice';
import dialogReducer from '@redux/slices/dialogSlice';
import { rootApi } from '@services/rootApi';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import { logOutMiddleware } from './middleware';

// Persist config for redux-persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [
    rootApi.reducerPath, // không lưu cache của API trong redux-persist
  ],
};

// Root reducer with reset on logout
const appReducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
  settings: settingsReducer,
  dialog: dialogReducer,
  [rootApi.reducerPath]: rootApi.reducer,
});

// Custom reducer to reset state on logout
const rootReducer = (state, action) => {
  if (action.type === 'auth/logOut') {
    // Clear persisted state from local storage
    storage.removeItem('persist:root');
    // Reset entire state (this will trigger a fresh start)
    state = undefined;
  }
  return persistReducer(persistConfig, appReducer)(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logOutMiddleware, rootApi.middleware); // Add rootApi middleware to handle cache correctly
  },
});

export const persistor = persistStore(store);
