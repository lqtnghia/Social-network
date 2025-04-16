import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from './configs/muiConfig.js';
import { Provider } from 'react-redux';
import { persistor, store } from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Dialog from '@components/Dialog';
import PostPage from '@pages/PostPage';

const RootLayout = lazy(() => import('@layouts/RootLayout.jsx'));
const AuthLayout = lazy(() => import('@layouts/AuthLayout'));
const HomePage = lazy(() => import('@pages/HomePage.jsx'));
const RegisterPage = lazy(() => import('@pages/Auth/RegisterPage'));
const LoginPage = lazy(() => import('@pages/Auth/LoginPage'));
const OTPVerifyPage = lazy(() => import('@pages/Auth/OTPVerifyPage'));
const ProtectedLayout = lazy(() => import('@layouts/ProtectedLayout'));
const MessagePage = lazy(() => import('@pages/MessagePage'));
const Loading = lazy(() => import('@components/Loading/Loading'));
const SearchUsersPage = lazy(() => import('@pages/SearchUsersPage'));
const ForgotPage = lazy(() => import('@pages/Auth/ForgotPage'));
const ResetPassword = lazy(() => import('@pages/Auth/ResetPassword'));
const ChangePasswordPage = lazy(() => import('@pages/Auth/ChangePasswordPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
          {
            path: '/change-password',
            element: <ChangePasswordPage />,
          },
          {
            path: '/messages',
            element: <MessagePage />,
          },
          {
            path: '/search/users',
            element: <SearchUsersPage />,
          },
          {
            path: '/users/:id',
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: '/posts/:id',
        element: <PostPage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/register',
            element: <RegisterPage />,
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/forgot-password',
            element: <ForgotPage />,
          },
          {
            path: '/reset-password',
            element: <ResetPassword />,
          },
          {
            path: '/verify-otp',
            element: <OTPVerifyPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
        <Dialog />
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
