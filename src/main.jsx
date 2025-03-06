import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from './configs/muiConfig.js';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

const RootLayout = lazy(() => import('@pages/RootLayout.jsx'));
const AuthLayout = lazy(() => import('@pages/auth/AuthLayout'));
const HomePage = lazy(() => import('@pages/HomePage.jsx'));
const RegisterPage = lazy(() => import('@pages/auth/RegisterPage'));
const LoginPage = lazy(() => import('@pages/auth/LoginPage'));
const OTPVerifyPage = lazy(() => import('@pages/auth/OTPVerifyPage'));
const ModalProvider = lazy(() => import('@context/ModalProvider'));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
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
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <RouterProvider router={router}></RouterProvider>
      </ModalProvider>
    </ThemeProvider>
  </Provider>,
);
