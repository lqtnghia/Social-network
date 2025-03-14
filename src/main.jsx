import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from './configs/muiConfig.js';
import { Provider } from 'react-redux';
import { persistor, store } from '@redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const RootLayout = lazy(() => import('@pages/RootLayout.jsx'));
const AuthLayout = lazy(() => import('@pages/auth/AuthLayout'));
const HomePage = lazy(() => import('@pages/HomePage.jsx'));
const RegisterPage = lazy(() => import('@pages/auth/RegisterPage'));
const LoginPage = lazy(() => import('@pages/auth/LoginPage'));
const OTPVerifyPage = lazy(() => import('@pages/auth/OTPVerifyPage'));
const ModalProvider = lazy(() => import('@context/ModalProvider'));
const ProtectedLayout = lazy(() => import('@pages/ProtectedLayout'));
const MessagePage = lazy(() => import('@pages/MessagePage'));

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
            path: '/message',
            element: <MessagePage />,
          },
        ],
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
    <PersistGate loading={<p>loading...</p>} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <RouterProvider router={router}></RouterProvider>
        </ModalProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
