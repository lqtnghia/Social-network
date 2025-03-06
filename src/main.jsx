import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from './configs/muiConfig.js';
import AuthLayout from '@pages/auth/AuthLayout';
import LoginPage from '@pages/auth/LoginPage';
import OTPVerifyPage from '@pages/auth/OTPVerifyPage';

const HomePage = lazy(() => import('@pages/HomePage.jsx'));
const RootLayout = lazy(() => import('@pages/RootLayout.jsx'));
const RegisterPage = lazy(() => import('@pages/auth/RegisterPage'));
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
  <ThemeProvider theme={theme}>
    <ModalProvider>
      <RouterProvider router={router}></RouterProvider>
    </ModalProvider>
  </ThemeProvider>,
);
